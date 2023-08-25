import Gauge from "react-svg-gauge";
import React from "react";

type GaugeChartProps = {
  temp: number;
  label: string;
  unit: string;
};

function getHexColor(value: number) {
  let string = value.toString(16);
  return string.length === 1 ? "0" + string : string;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({
  temp,
  label,
  unit,
}) => {
  let r = Math.floor(temp * 2.55);
  let g = Math.floor(255 - temp * 2.55);
  let b = 0;
  let colorHex = "#" + getHexColor(r) + getHexColor(g) + getHexColor(b);

  return (
    <>
      <Gauge
        value={temp}
        width={400}
        height={320}
        color={colorHex}
        label={label}
        valueFormatter={(value) => `${value}${unit}`}
        valueLabelStyle={""}
      />
    </>
  );
};
