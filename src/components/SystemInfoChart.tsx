import Gauge from "react-svg-gauge";
import { PieChart } from "./PieChart";
import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import React from "react";

type SystemInfoChartProps = {
  type: "CPU" | "GPU";
  load: number
  temp: number
}

function getHexColor(value: number) {
  let string = value.toString(16);
  return string.length === 1 ? "0" + string : string;
}

export const SystemInfoChart: React.FC<SystemInfoChartProps> = ({type, load, temp}) => {
  const { gpuLoad: gpu_load, gpuTemp: gpu_temp } =
    useAppSelector(selectSystemInfo);
  let r = Math.floor(temp * 2.55);
  let g = Math.floor(255 - temp * 2.55);
  let b = 0;
  let colorHex = "#" + getHexColor(r) + getHexColor(g) + getHexColor(b);

  return (
    <div>
      <h1>{type}</h1>
      <PieChart data={load} />
      <Gauge
        value={temp}
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
