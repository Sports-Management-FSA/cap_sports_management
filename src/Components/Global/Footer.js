import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <footer className="bg-dark">
         <div
            className="d-flex justify-content-between align-items-center mx-auto py-4 flex-wrap"
            style={{ width: "80%" }}>
            <a href="/#" className="d-flex align-items-center text-decoration-none">
               <i className="fa-solid fa-people-group fs-6 text-decoration-none" style={{ color: "#ffffff" }}>
                  Podium
               </i>
            </a>
            <small className="text-white">&copy; Podium, {new Date().getFullYear()}. All rights reserved.</small>
            <div className="d-flex flex-wrap">
               <a href="/#" className="text-white text-decoration-none">
                  About
               </a>
               <Link to="/staff" className="text-white ms-3 text-decoration-none">
                  Team
               </Link>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
