import React from "react";
import "./PieChart.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type PiChartProps = {
  data: number;
};

const getColorByData = (data: number) => {
  if (data <= 40) return "green";
  if (data <= 80) return "yellow";
  return "red";
};

export const PieChart: React.FC<PiChartProps> = ({ data }) => {
  return (
    <div className="pie-chart">
      <p className="pie-chart-load-title">Load</p>
      <CircularProgressbar
        value={data}
        text={`${data}%`}
        styles={buildStyles({
          textColor: getColorByData(data),
          pathColor: getColorByData(data),
        })}
      />
    </div>
  );
};
