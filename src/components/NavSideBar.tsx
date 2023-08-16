import { Navigation } from "react-minimal-side-navigation";
import React from "react";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

export const NavSidebar = () => {
  return (
    <React.Fragment>
      <div className="text-3xl font-bold underline">
        <Navigation
          activeItemId="home"
          items={[
            {
              title: "Home",
              itemId: "home",
            },
            {
              title: "sex",
              itemId: "sex",
            },
          ]}
        />
      </div>
    </React.Fragment>
  );
};
