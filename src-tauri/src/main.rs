// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::sys_info::SystemInfoFetcher;
use log::info;
use simple_logger::SimpleLogger;
mod sys_info;
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sys_info() -> sys_info::SystemInfo {
    let system_info_fetcher = SystemInfoFetcher::new();

    system_info_fetcher.create_sys_info()
}

fn main() {
    SimpleLogger::new().init().unwrap();
    log::info!("tauri app started");
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        // .setup(|app| {
        //     let id = app.listen_global("tauri://close-requested", |_event| {
        //         log::info!("tauri app ended");
        //     });
        //     app.listen_global("tauri://move", |_event| {
        //         log::info!("tauri app ended");
        //     });
        //     app.listen_global("tauri://resize", |_event| {
        //         log::info!("tauri app ended");
        //     });
        //     app.unlisten(id);

        //     Ok(())
        // })
        .invoke_handler(tauri::generate_handler![greet, get_sys_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
