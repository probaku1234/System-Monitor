import Gauge from "react-svg-gauge";
import { PieChart } from "./PieChart";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";

function getHexColor(value: number) {
  let string = value.toString(16);
  return string.length === 1 ? "0" + string : string;
}

export const SystemInfoChart = () => {
  const { gpuLoad: gpu_load, gpuTemp: gpu_temp } =
    useAppSelector(selectSystemInfo);
  let r = Math.floor(gpu_temp * 2.55);
  let g = Math.floor(255 - gpu_temp * 2.55);
  let b = 0;
  let colorHex = "#" + getHexColor(r) + getHexColor(g) + getHexColor(b);

  return (
    <div>
      <h1>GPU</h1>
      <PieChart data={gpu_load} />
      <Gauge
        value={gpu_temp}
        width={400}
        height={320}
        color={colorHex}
        label="Temperature"
        valueFormatter={(value) => `${value}º`}
        valueLabelStyle={""}
      />
    </div>
  );
};
