import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import "./DiskUsageBar.css";

type DiskUsageBarProps = {
  data: number;
  diskAlpha: string;
  label: string;
};

const DiskUsageBar: React.FC<DiskUsageBarProps> = ({
  data,
  diskAlpha,
  label,
}) => {
  return (
    <div className="disk-usage-wrapper">
      <h1>{diskAlpha}:\</h1>
      <ProgressBar
        completed={data}
        height="25px"
        customLabel={label}
        borderRadius="5px"
        labelAlignment="center"
        className="disk-usage-bar"
        bgColor="#5E5C6E"
      />
    </div>
  );
};

export default DiskUsageBar;
