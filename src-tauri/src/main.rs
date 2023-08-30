// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::sys_info::SystemInfoFetcher;
use simple_logger::SimpleLogger;
mod sys_info;
//use lru::LruCache;
use std::num::NonZeroUsize;
use tauri::State;
use systemstat::{Platform, System};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_sys_info(sys: State<System>) -> sys_info::SystemInfo {
    let system_info_fetcher = SystemInfoFetcher::new(sys.inner());

    system_info_fetcher.create_sys_info()
}

#[tauri::command]
fn get_sys_spec_info(sys: State<System>) -> sys_info::SystemSpecInfo {
    let system_info_fetcher = SystemInfoFetcher::new(sys.inner());

    system_info_fetcher.create_sys_spec_info()
}

fn main() {
    //let cache: LruCache<&str, &str> = LruCache::new(NonZeroUsize::new(10).unwrap());
    SimpleLogger::new().init().unwrap();
    log::info!("tauri app started");
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        // .setup(|app| {
        //     let mut cache = LruCache::new(NonZeroUsize::new(2).unwrap());
        //     cache.put("apple", "apple");
        //     cache.put("banana", "banana");
        //     LruCache::
        //     Ok(())
        // })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::CloseRequested {  .. } => {
                log::info!("tauri app ended");
            }
            _ => {}
        })
        .manage(System::new())
        //.manage(cache)
        .invoke_handler(tauri::generate_handler![greet, get_sys_info, get_sys_spec_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
