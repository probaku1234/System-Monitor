use std::{
    io,
    process::{Command, Output},
};

use crate::sys_info;
use log::debug;
use std::thread;
use std::time::Duration;
use systemstat::{saturating_sub_bytes, Platform, System};
// use mockall::*;
// use mockall::predicate::*;

const COMMAND_GPU_INFO: &str =
    "nvidia-smi --query-gpu=temperature.gpu,gpu_name,utilization.gpu --format=csv,noheader,nounits";
const COMAND_CPU_INFO: &str = "wmic cpu get name";

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
}

// TODO: unit testing, cache?
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
        }
    }
}

pub struct SystemInfoFetcher {
    sys: System,
}

// #[automock]
impl SystemInfoFetcher {
    pub fn new() -> Self {
        Self { sys: System::new() }
    }

    fn run_command(&self, command: &str) -> Output {
        return Command::new("cmd")
            .args(["/c", command])
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

        sys_info::SystemInfo {
            used_memory,
            total_memory,
            cpu_name: cpu_name.to_string(),
            cpu_temp,
            cpu_load,
            gpu_temp,
            gpu_name,
            gpu_load,
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

    fn motherboard_info() {
        let mother_board_command_result = Command::new("cmd")
            .args(["/c", "gwmi", "win32_baseboard"])
            .output()
            .expect("msg");
        log::debug!(
            "{}",
            String::from_utf8_lossy(&mother_board_command_result.stdout)
        );
        println!(
            "{}",
            String::from_utf8_lossy(&mother_board_command_result.stdout)
        );
        log::debug!(
            "{}",
            String::from_utf8_lossy(&mother_board_command_result.stderr)
        );
        println!(
            "{}",
            String::from_utf8_lossy(&mother_board_command_result.stderr)
        );

        let b = std::str::from_utf8(&mother_board_command_result.stderr).is_ok();
        println!("{:}", b);
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
            },
            Err(x) => log::error!("\nCPU temp: {}", x),
        }
        (cpu_temp, cpu_load)
    }
}

#[cfg(test)]
mod tests {
    use super::COMAND_CPU_INFO;
    use crate::sys_info::{SystemInfo, SystemInfoFetcher, COMMAND_GPU_INFO};
    use mockall::predicate::*;
    use mockall::*;
    use std::{
        os::windows::process::ExitStatusExt,
        process::{Command, ExitCode, ExitStatus, Output},
    };
    use systemstat::{Platform, System};

    #[test]
    fn test_run_command() {
        let system_info_fetcher = SystemInfoFetcher { sys: System::new() };
        let cpu_command_result = system_info_fetcher.run_command(COMAND_CPU_INFO);
        let gpu_command_result = system_info_fetcher.run_command(COMMAND_GPU_INFO);

        println!("{}", String::from_utf8_lossy(&cpu_command_result.stdout));
        println!("{}", String::from_utf8_lossy(&gpu_command_result.stdout));

        assert!(cpu_command_result.status.success());
        assert!(gpu_command_result.status.success());
    }

    #[test]
    fn test_run_command_with_invalid_command() {
        let system_info_fetcher = SystemInfoFetcher { sys: System::new() };
        let result = system_info_fetcher.run_command("invalid command");

        assert_eq!(false, result.status.success());
    }

    #[test]
    fn test_motherboard() {
        // let system_info_fetcher = SystemInfoFetcher { sys: System::new() };
        SystemInfoFetcher::motherboard_info();
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
