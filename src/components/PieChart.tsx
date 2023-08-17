import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import React from "react";
import "./PieChart.css"

type PiChartProps = {
  data: number;
};

export const PieChart: React.FC<PiChartProps> = ({ data }) => {
  return (
    <div className="pie-chart">
      <text className="pie-chart-load-title">Load</text>
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={[
            { x: 1, y: data },
            { x: 2, y: 100 - data },
          ]}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              },
            },
          }}
        />
        <VictoryAnimation
          duration={1000}
          data={[
            { x: 1, y: data },
            { x: 2, y: 100 - data },
          ]}
        >
          {(newProps) => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${data}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
};
