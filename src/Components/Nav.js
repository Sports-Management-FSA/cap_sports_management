import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store";

const Nav = () => {
   const user = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
      dispatch(logout());
      const logoutToken = window.localStorage.getItem("token");
      navigate("/");
   };

   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container-fluid">
            <Link to="/">
               <i className="fa-solid fa-people-group" style={{ color: "#ffffff" }}>
                  {"  "}
                  Sports Management
               </i>
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarTogglerDemo01"
               aria-controls="navbarTogglerDemo01"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                  {user?.id ? (
                     <>
                        <li className="nav-item dropdown">
                           <a
                              className="nav-link dropdown-toggle"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false">
                              <i className="fa-sharp fa-regular fa-circle-user fs-4" style={{ color: "white" }}></i>
                           </a>
                           <ul
                              className="dropdown-menu dropdown-menu-dark dropdown-menu-end justify-cotent-start"
                              aria-labelledby="navbarDropdown">
                              <li>
                                 <a className="dropdown-item" href="#">
                                    Dashboard
                                 </a>
                              </li>
                              <li>
                                 <a className="dropdown-item" href="#">
                                    Profile
                                 </a>
                              </li>
                              <li>
                                 <button className="dropdown-item" onClick={handleLogout}>
                                    Sign Out
                                 </button>
                              </li>
                           </ul>
                        </li>
                     </>
                  ) : (
                     <>
                        <li className="nav-item">
                           <Link to="/login" className="nav-link active me-1">
                              LOGIN
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link to="/register">
                              <button type="button" className="btn btn-primary me-3">
                                 SIGN UP
                              </button>
                           </Link>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Nav;
