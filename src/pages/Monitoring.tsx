import { SystemInfoChart } from "../components/SystemInfoChart";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { GaugeChart } from "../components/GaugeChart";

function Monitoring() {
  const {
    gpuLoad: gpu_load,
    gpuTemp: gpu_temp,
    usedMemory,
    totalMemory,
    fetching,
  } = useAppSelector(selectSystemInfo);

  function getUsedMemoryPercentage() {
    return Math.floor((usedMemory / totalMemory) * 100);
  }

  return (
    <>
      <h1>Monitoring</h1>

      {fetching ? (
        <ClipLoader color={"#6e36d6"} size={80} data-testid="loader" />
      ) : (
        <>
          <SystemInfoChart type="GPU" load={gpu_load} temp={gpu_temp} />
          <SystemInfoChart type="CPU" load={0} temp={0} />
          <h1>RAM</h1>
          <GaugeChart temp={getUsedMemoryPercentage()} label="Load" unit="%" />
        </>
      )}
    </>
  );
}

export default Monitoring;
