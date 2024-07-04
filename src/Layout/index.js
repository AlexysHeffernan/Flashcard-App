import React from "react";
import Header from "./Header";
import RootRoutes from "./RootRoutes";

function Layout() {
  return (
    <>
      <Header />

      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <RootRoutes />
      </div>
    </>
  );
}

export default Layout;
