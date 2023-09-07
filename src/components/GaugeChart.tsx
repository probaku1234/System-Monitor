import React from "react";
import GaugeComponent from "react-gauge-component";

type GaugeChartProps = {
  temp: number;
  label: string;
  unit: string;
};

export const GaugeChart: React.FC<GaugeChartProps> = ({
  temp,
  label,
  unit,
}) => {
  return (
    <>
      <h2>{label}</h2>
      <GaugeComponent
        type="semicircle"
        arc={{
          colorArray: ["#00FF15", "#FF2121"],
          padding: 0.02,
          subArcs: [
            { limit: 40 },
            { limit: 60 },
            { limit: 70 },
            {},
            {},
            {},
            {},
          ],
        }}
        pointer={{ type: "blob", animationDelay: 0 }}
        value={temp}
        labels={{
          valueLabel: {
            formatTextValue: (value) => value + unit,
            matchColorWithArc: true,
          },
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value) => value + unit,
            },
          },
        }}
      />
    </>
  );
};
