import { SystemInfoChart } from "../components/SystemInfoChart";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";

function Monitoring() {
  const { gpuLoad: gpu_load, gpuTemp: gpu_temp } =
    useAppSelector(selectSystemInfo);

  return (
    <>
      <h1>Monitoring</h1>

      <SystemInfoChart 
        type="GPU"
        load={gpu_load}
        temp={gpu_temp}
      />
      <SystemInfoChart 
        type="CPU"
        load={gpu_load}
        temp={gpu_temp}
      />
    </>
  );
}

export default Monitoring;
