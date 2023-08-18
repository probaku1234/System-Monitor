import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";

function SystemSpec() {
  const systemInfo = useAppSelector(selectSystemInfo);

  return (
    <>
      <h1>System Spec</h1>

      <div>
        <p>cpu name: {systemInfo?.cpuName}</p>
        <p>used memory: {systemInfo?.usedMemory}</p>
        <p>total memory: {systemInfo?.totalMemory}</p>
        <p>gpu name: {systemInfo?.gpuName}</p>
        <p>gpu load: {systemInfo?.gpuLoad}</p>
        <p>gpu temp: {systemInfo?.gpuTemp}</p>
      </div>
    </>
  );
}

export default SystemSpec;
