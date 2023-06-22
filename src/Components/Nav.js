import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
   return (
      <nav
         style={{
            backgroundColor: "palegoldenrod"
         }}>
         <div>
            <p>
               <Link to="/">Logo</Link>
            </p>
         </div>
         <div>
            <p>
               <Link to="/login">Login</Link>
            </p>
         </div>
      </nav>
   );
};

export default Nav;
