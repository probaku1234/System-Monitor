// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::sys_info::SystemInfoFetcher;
use simple_logger::SimpleLogger;
mod sys_info;
use sysinfo::{System, SystemExt};
use tauri::{CustomMenuItem, SystemTray, SystemTrayMenu};
use tauri::{Manager, State, SystemTrayEvent, SystemTrayMenuItem};
use std::sync::Mutex;

struct SysStorage {
    sys: Mutex<System>
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sys_info(sys_storage: State<SysStorage>) -> sys_info::SystemInfo {
    let mut sys = sys_storage.sys.lock().unwrap();
    let mut system_info_fetcher = SystemInfoFetcher::new(&mut sys);

    system_info_fetcher.create_sys_info()
}

#[tauri::command]
fn get_sys_spec_info(sys_storage: State<SysStorage>) -> sys_info::SystemSpecInfo {
    let mut sys = sys_storage.sys.lock().unwrap();
    let mut system_info_fetcher = SystemInfoFetcher::new(&mut sys);

    system_info_fetcher.create_sys_spec_info()
}

fn main() {
    let show = CustomMenuItem::new("show".to_string(), "Show");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(quit);
    let system_tray = SystemTray::new().with_menu(tray_menu);

    SimpleLogger::new().init().unwrap();
    log::info!("tauri app started");

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    log::info!("tauri app terminated");
                    std::process::exit(0);
                }
                "show" => {
                    let window = app.get_window("main").unwrap();
                    window.show().unwrap();
                }
                _ => {}
            },
            _ => {}
        })
        .plugin(tauri_plugin_store::Builder::default().build())
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested { api, .. } => {
                event.window().hide().unwrap();
                api.prevent_close();
            }
            _ => {}
        })
        .manage(SysStorage {sys: System::new().into()})
        .invoke_handler(tauri::generate_handler![
            greet,
            get_sys_info,
            get_sys_spec_info
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
