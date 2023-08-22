import { useEffect } from "react";
import { NavSidebar } from "./components/NavSideBar";
import "./App.css";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentPage } from "./redux/slice/currentPageSlice";
import Main from "./pages/Main";
import SystemSpec from "./pages/SystemSpec";
import Monitoring from "./pages/Monitoring";
import { setInfoAsync } from "./redux/slice/systemInfoSlice";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const currentPage = useAppSelector(selectCurrentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setInfoAsync());
  }, []);

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
      <div className="container">
        {showCurrentPage()}
      </div>
    </>
  );
}

export default App;
