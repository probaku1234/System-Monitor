import { Navigation } from "react-minimal-side-navigation";
import React from "react";
import "./NavSideBar.css";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { useAppDispatch } from "../redux/hooks";
import { setCurrentPage } from "../redux/slice/currentPageSlice";

export const NavSidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <div className="text-3xl font-bold underline nav-side-bar">
        <Navigation
          activeItemId="home"
          items={[
            {
              title: "Home",
              itemId: "home",
            },
            {
              title: "System Spec",
              itemId: "system_spec",
            },
            {
              title: "Monitoring",
              itemId: "monitoring",
            },
          ]}
          onSelect={(itemId) => {
            dispatch(
              setCurrentPage(
                itemId.itemId as "home" | "system_spec" | "monitoring"
              )
            );
          }}
        />
      </div>
    </React.Fragment>
  );
};
