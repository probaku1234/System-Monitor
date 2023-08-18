import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";

function SystemSpec() {
  const systemInfo = useAppSelector(selectSystemInfo);

  return (
    <>
      <h1>System Spec</h1>

      <div>
        <p>cpu name: {systemInfo?.cpu_name}</p>
        <p>used memory: {systemInfo?.used_memory}</p>
        <p>total memory: {systemInfo?.total_memory}</p>
        <p>gpu name: {systemInfo?.gpu_name}</p>
        <p>gpu load: {systemInfo?.gpu_load}</p>
        <p>gpu temp: {systemInfo?.gpu_temp}</p>
      </div>
    </>
  );
}

export default SystemSpec;
