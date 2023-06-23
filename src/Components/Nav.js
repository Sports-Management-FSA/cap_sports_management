import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";
import { useDispatch, useSelector } from "react-redux";
import auth from "../store/auth";

const Nav = () => {
   const token = window.localStorage.getItem("token");
   const user = useSelector((state) => state.auth);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout());
      const logoutToken = window.localStorage.getItem("token");

      navigate("/");
   };

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
            {user.username ? (
               <p>
                  <button onClick={handleLogout}>Logout</button>
               </p>
            ) : (
               <p>
                  <Link to="/login">Login</Link>
               </p>
            )}
         </div>
      </nav>
   );
};

export default Nav;
