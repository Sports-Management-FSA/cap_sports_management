import React from "react";

const Footer = () => {
   return (
      <footer className="bg-dark">
         <div
            className="d-flex justify-content-between align-items-center mx-auto py-4 flex-wrap"
            style={{ width: "80%" }}>
            <a href="/#" className="d-flex align-items-center">
               <i className="fa-solid fa-people-group fs-6" style={{ color: "#ffffff" }}>
                  Podium
               </i>
            </a>
            <small>&copy; Podium, {new Date().getFullYear()}. All rights reserved.</small>
            <div>
               <a href="/#" className="text-white">
                  About
               </a>
               <a href="/#" className="text-white ms-3">
                  Team
               </a>
            </div>
         </div>
      </footer>
   );
};

export default Footer;
