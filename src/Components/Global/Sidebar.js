import { colors } from "@mui/material";
import React from "react";

const SideBar = () => {
   return (
      <>
         <button
            className="btn bg-dark text-white sidebar-toggle"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="offcanvas">
            <i className="bi bi-list fs-4"></i>
         </button>

         <div
            className="offcanvas offcanvas-start text-bg-dark"
            data-bs-scroll="true"
            tabindex="-1"
            id="offcanvas"
            aria-labelledby="offcanvas"></div>
      </>
   );
};

export default SideBar;
