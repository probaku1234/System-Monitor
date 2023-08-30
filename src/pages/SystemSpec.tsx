import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import { selectSystemSpecInfo } from "../redux/slice/systemSpecInfoSlice";
import ClipLoader from "react-spinners/ClipLoader";

function SystemSpec() {
  const systemSpecInfo = useAppSelector(selectSystemSpecInfo);

  return (
    <>
      <h1>System Spec</h1>
      <br />
      <div>
        {systemSpecInfo.fetching ? (
          <ClipLoader color={"#6e36d6"} size={80} data-testid="loader" />
        ) : (
          <>
            <h3>CPU : {systemSpecInfo?.cpuName}</h3>
            <h3>GPU : {systemSpecInfo?.gpuName}</h3>
            <h3>Motherboard: {systemSpecInfo?.motherboardName}</h3>
            {systemSpecInfo?.diskInfo.map((info, index) => (
              <h3 key={index}>{info.model}</h3>
            ))}
          </>
        )}
        {/* <h3>Motherboard : {systemInfo?.motherBoardManufact} {systemInfo?.motherBoardName}</h3> */}
      </div>
    </>
  );
}

export default SystemSpec;
