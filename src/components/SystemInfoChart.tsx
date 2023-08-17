import Gauge from "react-svg-gauge";
import { PieChart } from "./PieChart";

function getHexColor(value: number) {
  let string = value.toString(16);
  return string.length === 1 ? "0" + string : string;
}

export const SystemInfoChart = () => {
  let r = Math.floor(60 * 2.55);
  let g = Math.floor(255 - 60 * 2.55);
  let b = 0;
  let colorHex = "#" + getHexColor(r) + getHexColor(g) + getHexColor(b);

  return (
    <div>
      <h1>GPU</h1>
      <PieChart data={1} />
      <Gauge
        value={60}
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
