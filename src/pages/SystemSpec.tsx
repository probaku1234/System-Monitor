import { useAppSelector } from "../redux/hooks";
import { selectSystemSpecInfo } from "../redux/slice/systemSpecInfoSlice";
import ClipLoader from "react-spinners/ClipLoader";
import "./SystemSpec.css";

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
            <div className="hardware">
              <h3 className="hardware-title">CPU</h3>
              <p className="hardware-name">{systemSpecInfo?.cpuName}</p>
            </div>
            <div className="hardware">
              <h3 className="hardware-title">GPU</h3>
              <p className="hardware-name">{systemSpecInfo?.gpuName}</p>
            </div>
            <div className="hardware">
              <h3 className="hardware-title">Motherboard</h3>
              <p className="hardware-name">
                {systemSpecInfo?.motherboardName}
              </p>
            </div>
            <div className="hardware">
              <h3 className="hardware-title">Drive</h3>
              {systemSpecInfo?.diskInfo.map((info, index) => (
                <p key={index} className="hardware-name">
                  {info.model}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SystemSpec;
