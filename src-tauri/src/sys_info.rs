#[derive(serde::Serialize)]
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
}
