import { SystemInfoChart } from "../components/SystemInfoChart";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { GaugeChart } from "../components/GaugeChart";
import "./Monitoring.css";

function Monitoring() {
  const {
    gpuLoad: gpu_load,
    gpuTemp: gpu_temp,
    cpuTemp,
    cpuLoad,
    usedMemory,
    totalMemory,
    fetching,
  } = useAppSelector(selectSystemInfo);

  function getUsedMemoryPercentage() {
    return Math.floor((usedMemory / totalMemory) * 100);
  }

  function byteToGByte(bytesValue: number) {
    return (bytesValue / (1000 * 1000 * 1000)).toFixed(2);
  }

  return (
    <>
      <h1>Monitoring</h1>

      {fetching ? (
        <ClipLoader color={"#6e36d6"} size={80} data-testid="loader" />
      ) : (
        <>
          <SystemInfoChart type="GPU" load={gpu_load} temp={gpu_temp} />
          <SystemInfoChart type="CPU" load={cpuLoad} temp={cpuTemp} />
          <div>
            <h1>RAM</h1>

            <div className="ram-usage-chart">
              <GaugeChart
                temp={getUsedMemoryPercentage()}
                label="Load"
                unit="%"
              />
            </div>

            <div>
              <p className="ram-usage-number">
                Total memory: {byteToGByte(totalMemory)}GB
              </p>
              <p className="ram-usage-number">
                Used Memory: {byteToGByte(usedMemory)}GB
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Monitoring;
