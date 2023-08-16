// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;
use std::thread;
use std::time::Duration;
use systemstat::{saturating_sub_bytes, Platform, System};

mod sys_info;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sys_info() -> sys_info::SystemInfo {
    let sys = System::new();
    let mut used_memory: u64 = 0;
    let mut total_memory: u64 = 0;

    match sys.memory() {
        Ok(mem) => {
            used_memory = saturating_sub_bytes(mem.total, mem.free).as_u64();
            total_memory = mem.total.as_u64();
            println!(
                "\nMemory: {} used / {} ({} bytes) total ({:?})",
                saturating_sub_bytes(mem.total, mem.free),
                mem.total,
                mem.total.as_u64(),
                mem.platform_memory
            )
        }
        Err(x) => println!("\nMemory: error: {}", x),
    }

    match sys.cpu_load_aggregate() {
        Ok(cpu) => {
            println!("\nMeasuring CPU load...");
            thread::sleep(Duration::from_secs(1));
            let cpu = cpu.done().unwrap();
            println!(
                "CPU load: {}% user, {}% nice, {}% system, {}% intr, {}% idle ",
                cpu.user * 100.0,
                cpu.nice * 100.0,
                cpu.system * 100.0,
                cpu.interrupt * 100.0,
                cpu.idle * 100.0
            );
        }
        Err(x) => println!("\nCPU load: error: {}", x),
    }

    match sys.cpu_temp() {
        Ok(cpu_temp) => println!("\nCPU temp: {}", cpu_temp),
        Err(x) => println!("\nCPU temp: {}", x),
    }

    let output = Command::new("cmd")
                            .args(["/c", "nvidia-smi --query-gpu=temperature.gpu,gpu_name,utilization.gpu --format=csv,noheader,nounits"])
                            .output()
                            .expect("msg");
    println!("{}", String::from_utf8_lossy(&output.stdout));

    let gpu_result_text = String::from_utf8_lossy(&output.stdout);
    let gpu_result_string = gpu_result_text.to_string();
    let gpu_info_vec: Vec<&str> = gpu_result_string.split(",").collect();
    let gpu_temp: i8 = gpu_info_vec[0].trim().parse().unwrap();
    let gpu_name: String = gpu_info_vec[1].trim().to_string();
    let gpu_load: i8 = gpu_info_vec[2].trim().parse().unwrap();

    for part in gpu_result_string.split(", ") {
        println!("{}", part);
    }

    let pika = Command::new("cmd")
        .args(["/c", "wmic cpu get name"])
        .output()
        .expect("msg");
    println!("{}", String::from_utf8_lossy(&pika.stdout));

    let result_text = String::from_utf8_lossy(&pika.stdout);
    let result_string = result_text.to_string();
    let mut lines = result_string.lines();
    lines.next();
    let cpu_name = lines.next().unwrap();

    sys_info::SystemInfo::new(
        used_memory,
        total_memory,
        cpu_name.to_string(),
        gpu_temp,
        gpu_name,
        gpu_load,
    )
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_sys_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
