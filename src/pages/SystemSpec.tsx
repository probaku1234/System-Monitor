import { useAppSelector } from "../redux/hooks";
import { selectSystemInfo } from "../redux/slice/systemInfoSlice";
import ClipLoader from "react-spinners/ClipLoader";

function SystemSpec() {
  const systemInfo = useAppSelector(selectSystemInfo);

  return (
    <>
      <h1>System Spec</h1>
      <br />
      <div>
        {systemInfo.fetching ? (
          <ClipLoader color={"#6e36d6"} size={80} data-testid="loader" />
        ) : (
          <>
            <h3>CPU : {systemInfo?.cpuName}</h3>
            <h3>GPU : {systemInfo?.gpuName}</h3>
          </>
        )}
        {/* <h3>Motherboard : {systemInfo?.motherBoardManufact} {systemInfo?.motherBoardName}</h3> */}
      </div>
    </>
  );
}

export default SystemSpec;
