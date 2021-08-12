import React from "react";

//Comp
import Navbar from "../components/layout/Navbar"

const Layout = ({ location, children }) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;