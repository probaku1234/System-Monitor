import { NavSidebar } from "./components/NavSideBar";
import "./App.css";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentPage } from "./redux/slice/currentPageSlice";
import Main from "./pages/Main";
import SystemSpec from "./pages/SystemSpec";
import Monitoring from "./pages/Monitoring";
import { setInfoAsync } from "./redux/slice/systemInfoSlice";
import { setSpecInfoAsync, selectSystemSpecInfo } from "./redux/slice/systemSpecInfoSlice";
import { useAppDispatch } from "./redux/hooks";
import { useEffectOnce, useInterval } from "usehooks-ts";
import { useEffect } from "react";

function App() {
  const currentPage = useAppSelector(selectCurrentPage);
  const systemSpec = useAppSelector(selectSystemSpecInfo);
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(setSpecInfoAsync());
  });

  useInterval(() => {
    dispatch(setInfoAsync());
  }, 5000);

  useEffect(() => {
    console.log(systemSpec);
  }, [systemSpec])
  
  function showCurrentPage() {
    switch (currentPage) {
      case "home":
        return <Main />;
      case "monitoring":
        return <Monitoring />;
      case "system_spec":
        return <SystemSpec />;
      default:
        return <Main />;
    }
  }

  return (
    <>
      <NavSidebar />
      <div className="container">{showCurrentPage()}</div>
    </>
  );
}

export default App;
