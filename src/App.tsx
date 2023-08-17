import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { NavSidebar } from "./components/NavSideBar";
import "./App.css";
import { PieChart } from "./components/PieChart";
import Gauge from "react-svg-gauge"

type SystemInfo = {
  cpu_name: string;
  used_memory: number;
  total_memory: number;
  gpu_name: string;
  gpu_temp: number;
  gpu_load: number;
};

function getHexColor(value: number) {
  let string = value.toString(16);
  return (string.length === 1) ? '0' + string : string;
}

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [systemInfo, setSystemInfo] = useState({} as SystemInfo);
  let r = Math.floor(60 * 2.55);
  let g = Math.floor(255 - (60 * 2.55));
  let b = 0;
  let colorHex = '#' + getHexColor(r) + getHexColor(g) + getHexColor(b);

  useEffect(() => {
    fetchSystemInfo();
  }, []);

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
        <h1>Welcome to Tauri!</h1>

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
        </div>

        <div>
          <h1>GPU</h1>
          <PieChart 
            data={1}
          />
          <Gauge value={60} width={400} height={320} color={colorHex} label="This is a big one" valueFormatter={value => `${value}%`} />
        </div>
      </div>
    </>
  );
}

export default App;
