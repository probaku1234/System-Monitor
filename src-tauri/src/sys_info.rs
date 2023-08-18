use std::{
    io,
    process::{Command, Output},
};
use systemstat::{saturating_sub_bytes, Platform, System};

#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemInfo {
    pub used_memory: u64,
    pub total_memory: u64,
    pub cpu_name: String,
    pub gpu_temp: i8,
    pub gpu_name: String,
    pub gpu_load: i8,
}

impl SystemInfo {
    pub fn new(
        used_memory: u64,
        total_memory: u64,
        cpu_name: String,
        gpu_temp: i8,
        gpu_name: String,
        gpu_load: i8,
    ) -> Self {
        SystemInfo {
            used_memory,
            total_memory,
            cpu_name,
            gpu_temp,
            gpu_name,
            gpu_load,
        }
    }

    fn gpu_info() -> (i8, String, i8) {
        let output = Command::new("cmd")
                            .args(["/c", "nvidia-smi --query-gpu=temperature.gpu,gpu_name,utilization.gpu --format=csv,noheader,nounits"])
                            .output()
                            .expect("msg");

        let gpu_result_text = String::from_utf8_lossy(&output.stdout);
        let gpu_result_string = gpu_result_text.to_string();
        let gpu_info_vec: Vec<&str> = gpu_result_string.split(",").collect();
        let gpu_temp: i8 = gpu_info_vec[0].trim().parse().unwrap();
        let gpu_name: String = gpu_info_vec[1].trim().to_string();
        let gpu_load: i8 = gpu_info_vec[2].trim().parse().unwrap();

        return (gpu_temp, gpu_name, gpu_load);
    }

    fn cpu_name() -> String {
        let output = Command::new("cmd")
            .args(["/c", "wmic cpu get name"])
            .output()
            .expect("msg");
        println!("{}", String::from_utf8_lossy(&output.stdout));

        let result_text = String::from_utf8_lossy(&output.stdout);
        let result_string = result_text.to_string();
        let mut lines = result_string.lines();
        lines.next();
        let cpu_name = lines.next().unwrap();

        return cpu_name.to_string();
    }

    fn memory_info() -> (u64, u64) {
        let sys = System::new();
        let mut used_memory: u64 = 0;
        let mut total_memory: u64 = 0;

        match sys.memory() {
            Ok(mem) => {
                used_memory = saturating_sub_bytes(mem.total, mem.free).as_u64();
                total_memory = mem.total.as_u64();
            }
            Err(x) => println!("\nMemory: error: {}", x),
        }

        return (used_memory, total_memory);
    }
}

#[cfg(test)]
use mockall::{automock, mock, predicate::*};
#[cfg_attr(test, automock)]
trait MyTrait {
    fn output(&self) -> io::Result<Output>;
}

#[cfg(test)]
mod tests {
    use crate::sys_info::{MockMyTrait, SystemInfo};

    #[test]
    fn get_gpu_info() {
        let result = SystemInfo::gpu_info();
        assert_eq!(result.0, 60);
    }
}
