// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::sys_info::SystemInfoFetcher;

mod sys_info;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sys_info() -> sys_info::SystemInfo {
    let system_info_fetcher = SystemInfoFetcher::new();

    let memory_info = system_info_fetcher.memory_info();
    let used_memory = memory_info.0;
    let total_memory = memory_info.1;

    let gpu_info = system_info_fetcher.gpu_info();

    let gpu_temp: i8 = gpu_info.0;
    let gpu_name: String = gpu_info.1;
    let gpu_load: i8 = gpu_info.2;

    let cpu_name = system_info_fetcher.cpu_name();

    sys_info::SystemInfo {
        used_memory,
        total_memory,
        cpu_name: cpu_name.to_string(),
        gpu_temp,
        gpu_name,
        gpu_load,
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![greet, get_sys_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
