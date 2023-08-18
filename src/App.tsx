import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { NavSidebar } from "./components/NavSideBar";
import "./App.css";
import { SystemInfoChart } from "./components/SystemInfoChart";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentPage } from "./redux/slice/currentPageSlice";
import Main from "./pages/Main";
import SystemSpec from "./pages/SystemSpec";
import Monitoring from "./pages/Monitoring";
import { setInfoAsync } from "./redux/slice/systemInfoSlice";
import { useAppDispatch } from "./redux/hooks";

type SystemInfo = {
  cpu_name: string;
  used_memory: number;
  total_memory: number;
  gpu_name: string;
  gpu_temp: number;
  gpu_load: number;
};

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [systemInfo, setSystemInfo] = useState({} as SystemInfo);
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // fetchSystemInfo();
    dispatch(setInfoAsync());
  }, []);

  function showCurrentPage() {
    switch (currentPage) {
      case "home":
        return <Main />;
      case "monitoring":
        return <Monitoring />;
      case "system_spec":
        return <SystemSpec />;
      default:
        return <Main />;
    }
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
    await invoke("get_sys_info").then((data) => console.log(data));
  }

  async function fetchSystemInfo() {
    await invoke("get_sys_info").then((data) => {
      console.log(data);
      setSystemInfo(data as any);
    });
  }

  return (
    <>
      <NavSidebar />
      <div className="container">
        {/* <h1>Welcome to Tauri!</h1>

        <div className="row">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <p>Click on the Tauri, Vite, and React logos to learn more.</p>

        <form
          className="row"
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>

        <p>{greetMsg}</p>

        <div>
          <p>cpu name: {systemInfo?.cpu_name}</p>
          <p>used memory: {systemInfo?.used_memory}</p>
          <p>total memory: {systemInfo?.total_memory}</p>
          <p>gpu name: {systemInfo?.gpu_name}</p>
          <p>gpu load: {systemInfo?.gpu_load}</p>
          <p>gpu temp: {systemInfo?.gpu_temp}</p>
        </div> */}
        {showCurrentPage()}
      </div>
    </>
  );
}

export default App;
