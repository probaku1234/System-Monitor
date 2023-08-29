use crate::sys_info;
use regex::Regex;
use std::process::{Command, Output};
use std::thread;
use std::time::Duration;
use systemstat::{saturating_sub_bytes, Platform, System};
use tauri::regex;
// use mockall::*;
// use mockall::predicate::*;

const COMMAND_GPU_INFO: &str =
    "nvidia-smi --query-gpu=temperature.gpu,gpu_name,utilization.gpu --format=csv,noheader,nounits";
const COMAND_CPU_INFO: &str = "wmic cpu get name";
const COMMAND_MOTHERBOARD_INFO: &str =
    "Get-CimInstance Win32_BaseBoard -Property Manufacturer,Product";

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemInfo {
    pub used_memory: u64,
    pub total_memory: u64,
    pub cpu_name: String,
    pub cpu_temp: i8,
    pub cpu_load: i8,
    pub gpu_temp: i8,
    pub gpu_name: String,
    pub gpu_load: i8,
    pub motherboard_name: String,
    pub disk_info: Vec<DiskInfo>
}

// TODO: unit testing
impl Default for SystemInfo {
    fn default() -> Self {
        Self {
            used_memory: 0,
            total_memory: 0,
            cpu_name: "".to_string(),
            cpu_temp: 0,
            cpu_load: 0,
            gpu_temp: 0,
            gpu_name: "".to_string(),
            gpu_load: 0,
            motherboard_name: "".to_string(),
            disk_info: vec![]
        }
    }
}

#[derive(Eq, PartialEq, Debug, serde::Serialize)]
pub struct DiskInfo {
    disk_alpha: char,
    used_space: String,
    total_space: String,
    percent: i8,
}

pub struct SystemInfoFetcher<'a> {
    sys: &'a System,
}

// #[automock]
impl<'a> SystemInfoFetcher<'a> {
    pub fn new(sys: &'a System) -> Self {
        Self { sys }
    }

    fn run_command(&self, command: &str) -> Output {
        return Command::new("cmd")
            .args(["/c", command])
            .output()
            .expect("fail to execute command");
    }

    fn run_command_with_powershell(&self, command: &str) -> Output {
        return Command::new("powershell")
            .args(["-Command", command])
            .output()
            .expect("fail to execute command");
    }

    pub fn create_sys_info(&self) -> SystemInfo {
        let memory_info = self.memory_info();
        let used_memory = memory_info.0;
        let total_memory = memory_info.1;

        let gpu_info = self.gpu_info();

        let gpu_temp: i8 = gpu_info.0;
        let gpu_name: String = gpu_info.1;
        let gpu_load: i8 = gpu_info.2;

        let cpu_name = self.cpu_name();
        let cpu_info = self.cpu_info();
        let cpu_temp = cpu_info.0;
        let cpu_load = cpu_info.1;

        let motherboard_name = self.motherboard_info();
        let disk_info = self.disk_info();

        sys_info::SystemInfo {
            used_memory,
            total_memory,
            cpu_name: cpu_name.to_string(),
            cpu_temp,
            cpu_load,
            gpu_temp,
            gpu_name,
            gpu_load,
            motherboard_name,
            disk_info
        }
    }

    fn cpu_name(&self) -> String {
        let output = self.run_command(sys_info::COMAND_CPU_INFO);

        if !output.status.success() {
            log::error!("CPU Name error {}", String::from_utf8_lossy(&output.stderr));
            return "".to_string();
        }

        log::debug!("{}", String::from_utf8_lossy(&output.stdout));

        let result_text = String::from_utf8_lossy(&output.stdout);
        let result_string = result_text.to_string();
        let mut lines = result_string.lines();
        lines.next();
        let cpu_name = lines.next().unwrap();

        return cpu_name.to_string();
    }

    fn gpu_info(&self) -> (i8, String, i8) {
        let output = self.run_command(sys_info::COMMAND_GPU_INFO);

        if !output.status.success() {
            log::error!("GPU Info error {}", String::from_utf8_lossy(&output.stderr));
            return (0, "".to_string(), 0);
        }

        log::debug!("{}", String::from_utf8_lossy(&output.stdout));

        let gpu_result_text = String::from_utf8_lossy(&output.stdout);
        let gpu_result_string = gpu_result_text.to_string();
        let gpu_info_vec: Vec<&str> = gpu_result_string.split(",").collect();
        let gpu_temp: i8 = gpu_info_vec[0].trim().parse().unwrap();
        let gpu_name: String = gpu_info_vec[1].trim().to_string();
        let gpu_load: i8 = gpu_info_vec[2].trim().parse().unwrap();

        return (gpu_temp, gpu_name, gpu_load);
    }

    fn memory_info(&self) -> (u64, u64) {
        //let sys = self.sys;
        let mut used_memory: u64 = 0;
        let mut total_memory: u64 = 0;

        match self.sys.memory() {
            Ok(mem) => {
                used_memory = saturating_sub_bytes(mem.total, mem.free).as_u64();
                total_memory = mem.total.as_u64();
                log::debug!(
                    "\nMemory: {} used / {} ({} bytes) total ({:?})",
                    saturating_sub_bytes(mem.total, mem.free),
                    mem.total,
                    mem.total.as_u64(),
                    mem.platform_memory
                )
            }
            Err(x) => log::error!("\nMemory: error: {}", x),
        }

        return (used_memory, total_memory);
    }

    fn motherboard_info(&self) -> String {
        let motherboard_command_result = self.run_command_with_powershell(COMMAND_MOTHERBOARD_INFO);
        log::debug!(
            "{}",
            String::from_utf8_lossy(&motherboard_command_result.stdout)
        );
        log::debug!(
            "{}",
            String::from_utf8_lossy(&motherboard_command_result.stderr)
        );

        let result_string = String::from_utf8_lossy(&motherboard_command_result.stdout);
        let product_name = self.parse_value("Product", &result_string);
        let manufacturer_name = self.parse_value("Manufacturer", &result_string);

        log::debug!("{}", product_name);
        log::debug!("{}", manufacturer_name);

        format!("{} {}", manufacturer_name, product_name)
    }

    fn cpu_info(&self) -> (i8, i8) {
        let mut cpu_temp = 0;
        let mut cpu_load = 0;

        match self.sys.cpu_load_aggregate() {
            Ok(cpu) => {
                log::debug!("\nMeasuring CPU load...");
                thread::sleep(Duration::from_secs(1));
                let cpu = cpu.done().unwrap();
                log::debug!(
                    "CPU load: {}% user, {}% nice, {}% system, {}% intr, {}% idle ",
                    cpu.user * 100.0,
                    cpu.nice * 100.0,
                    cpu.system * 100.0,
                    cpu.interrupt * 100.0,
                    cpu.idle * 100.0
                );
                cpu_load = 100 - (cpu.idle * 100.0) as i8;
            }
            Err(x) => log::error!("\nCPU load: error: {}", x),
        }

        match self.sys.cpu_temp() {
            Ok(temp) => {
                cpu_temp = temp as i8;
                log::debug!("\nCPU temp: {}", temp)
            }
            Err(x) => log::error!("\nCPU temp: {}", x),
        }
        (cpu_temp, cpu_load)
    }

    fn disk_info(&self) -> Vec<DiskInfo> {
        let disk_info_result = self.run_command_with_powershell("cd ./script ; ./sysinfo.ps1");
        let result_string = String::from_utf8_lossy(&disk_info_result.stdout);

        return self.parse_disk_info(&result_string);
    }

    fn parse_value(&self, value_name: &str, target_string: &str) -> String {
        let regex = Regex::new(&format!("{}.*", value_name)).unwrap();
        let matched_string = regex.find(target_string).unwrap().as_str().to_string();
        let splitted_string_vector: Vec<&str> = matched_string.split(":").collect();

        if splitted_string_vector.len() != 2 {
            log::error!("The target_string is not valid format: {}", target_string);
            return format!("");
        }

        return format!("{}", splitted_string_vector[1].trim());
    }

    fn parse_disk_info(&self, target_string: &str) -> Vec<DiskInfo> {
        let mut disk_info_vector = Vec::new();
        let regex_disk_alpha = Regex::new(r"\([A-Z]:\)").unwrap();
        let disk_alpha_matches: Vec<_> = regex_disk_alpha
            .find_iter(target_string)
            .map(|m| m.as_str())
            .collect();

        let regex_disk_usage = Regex::new(r"[0-9].*").unwrap();
        let disk_usage_matches: Vec<_> = regex_disk_usage
            .find_iter(target_string)
            .map(|m| m.as_str())
            .collect();

        for (index, disk_alpha_match_string_ref) in disk_alpha_matches.iter().enumerate() {
            let match_string = disk_alpha_match_string_ref.to_string();
            let disk_alpha_byte = match_string.as_bytes()[1];
            log::debug!("Disk {}", disk_alpha_byte as char);

            let disk_usage_string = disk_usage_matches[index];
            let splitted_string_vector: Vec<&str> = disk_usage_string.split(" ").collect();
            log::debug!(
                "used: {} {}, total: {} {}, percentage: {}",
                splitted_string_vector[0],
                splitted_string_vector[1],
                splitted_string_vector[3],
                splitted_string_vector[4],
                splitted_string_vector[5]
            );
            let disk_info = DiskInfo {
                disk_alpha: disk_alpha_byte as char,
                used_space: format!("{}{}", splitted_string_vector[0], splitted_string_vector[1]),
                total_space: format!("{}{}", splitted_string_vector[3], splitted_string_vector[4]),
                percent: splitted_string_vector[5].trim().parse().unwrap(),
            };

            disk_info_vector.push(disk_info);
        }

        return disk_info_vector;
    }
}

#[cfg(test)]
mod tests {
    use super::{COMAND_CPU_INFO, COMMAND_MOTHERBOARD_INFO};
    use crate::sys_info::{SystemInfoFetcher, COMMAND_GPU_INFO, DiskInfo};
    use std::process::Command;
    // use mockall::predicate::*;
    // use mockall::*;
    // use std::{
    //     os::windows::process::ExitStatusExt,
    //     process::{Command, ExitCode, ExitStatus, Output},
    // };
    use systemstat::{Platform, System};

    #[test]
    fn test_run_command() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };
        let cpu_command_result = system_info_fetcher.run_command(COMAND_CPU_INFO);
        let gpu_command_result = system_info_fetcher.run_command(COMMAND_GPU_INFO);

        println!("{}", String::from_utf8_lossy(&cpu_command_result.stdout));
        println!("{}", String::from_utf8_lossy(&gpu_command_result.stdout));

        assert!(cpu_command_result.status.success());
        assert!(gpu_command_result.status.success());
    }

    #[test]
    fn test_run_command_with_invalid_command() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };
        let result = system_info_fetcher.run_command("invalid command");

        assert_eq!(false, result.status.success());
    }

    #[test]
    fn test_run_command_with_powershell() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };
        let motherboard_command_result =
            system_info_fetcher.run_command_with_powershell(COMMAND_MOTHERBOARD_INFO);

        println!(
            "{}",
            String::from_utf8_lossy(&motherboard_command_result.stdout)
        );
        println!(
            "{}",
            String::from_utf8_lossy(&motherboard_command_result.stderr)
        );

        assert!(motherboard_command_result.status.success());
    }

    #[test]
    fn test_motherboard() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };
        let motherboard_name = system_info_fetcher.motherboard_info();
        println!("{}", motherboard_name);
    }

    #[test]
    fn test_parse_disk_info() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };

        let disk_info_vec = system_info_fetcher.parse_disk_info(
            "content                        371 GiB / 406 GiB 91
            title                          Disk (C:)
            content                        472 GiB / 931 GiB 50
            title                          Disk (D:)",
        );

        assert_eq!(disk_info_vec, vec![
            DiskInfo {
                disk_alpha: 'C',
                used_space: "371GiB".to_string(),
                total_space: "406GiB".to_string(),
                percent: 91
            },
            DiskInfo {
                disk_alpha: 'D',
                used_space: "472GiB".to_string(),
                total_space: "931GiB".to_string(),
                percent: 50
            }
        ]);
    }

    #[test]
    fn pika() {
        let system_info_fetcher = SystemInfoFetcher {
            sys: &System::new(),
        };
        // let result = Command::new("powershell")
        // .args(["-Command", "cd ./script ; ./sysinfo.ps1"])
        // .output()
        // .expect("fail to execute command");
        let result = system_info_fetcher.run_command_with_powershell("cd ./script ; ./sysinfo.ps1");
        println!(
            "{}",
            String::from_utf8_lossy(&result.stdout)
        );
        println!(
            "{}",
            String::from_utf8_lossy(&result.stderr)
        );
    }
    // #[test]
    // fn get_gpu_info() {
    //     let string = "foo";
    //     let mut mock = MockMyTrait::new();
    //     mock.expect_run_command().return_const(Output {
    //         status: ExitStatusExt::from_raw(1),
    //         stderr: vec![],
    //         stdout: string.as_bytes().to_vec(),
    //     });
    //     let result = SystemInfo::gpu_info();
    //     assert_eq!(result.0, 60);
    // }
}
