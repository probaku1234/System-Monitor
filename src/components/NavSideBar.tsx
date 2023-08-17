import { Navigation } from "react-minimal-side-navigation";
import React from "react";
import "./NavSideBar.css"
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
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
              itemId: "monitoring"
            }
          ]}
        />
      </div>
    </React.Fragment>
  );
};
