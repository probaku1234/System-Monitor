import { PieChart } from "./PieChart";
import { GaugeChart } from "./GaugeChart";
import React from "react";

type SystemInfoChartProps = {
  type: "CPU" | "GPU";
  load: number;
  temp: number;
};

export const SystemInfoChart: React.FC<SystemInfoChartProps> = ({
  type,
  load,
  temp,
}) => {
  return (
    <div>
      <h1>{type}</h1>
      <PieChart data={load} />
      <GaugeChart 
        temp={temp}
        label="Temperature"
        unit="º"
      />
    </div>
  );
};
