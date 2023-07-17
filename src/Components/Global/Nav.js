import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, fetchAllPlayers } from "../../store";
import { Avatar } from "@mui/material";

const Nav = () => {
   const user = useSelector((state) => state.auth);
   const { loggedIn, username } = user;
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleLogout = () => {
      dispatch(logout());
      navigate("/");
   };

   return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
         <div className="container-fluid">
            <Link to="/home">
               <i className="fa-solid fa-people-group ms-5" style={{ color: "#ffffff" }}>
                  {"  "}
                  Podium
               </i>
            </Link>
            <button
               className="navbar-toggler"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#navbarToggler"
               aria-controls="navbarToggler"
               aria-expanded="false"
               aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse me-4" id="navbarToggler">
               <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mt-2 align-items-center">
                  {loggedIn ? (
                     <>
                        <span className="text-white align-middle" style={{ letterSpacing: "0", fontSize: "14px" }}>
                           Welcome! {username}
                        </span>
                        <li className="nav-item dropdown">
                           <a
                              className="nav-link dropdown-toggle caret-off"
                              href="#"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false">
                              <Avatar
                                 alt={username}
                                 src={user.firstName ? user.firstName.slice(0, 1) : null}
                                 className="text-uppercase bg-white text-dark"
                                 sx={{
                                    height: "35px",
                                    width: "35px"
                                 }}
                              />
                           </a>
                           <ul
                              className="dropdown-menu dropdown-menu-dark dropdown-menu-end justify-cotent-start"
                              aria-labelledby="navbarDropdown">
                              <Link to="/dashboard" className="dropdown-item mb-2 mt-2" role="button">
                                 <i className="bi  bi-layout-text-window"></i>
                                 <span className="d-inline text-white ps-3 text-decoration-none navbar-tab">
                                    Dashboard
                                 </span>
                              </Link>
                              <Link to="/profile" className="mb-2 dropdown-item" role="button">
                                 <i className="bi bi-person-square"></i>
                                 <span className="d-inline text-white ps-3 text-decoration-none navbar-tab">
                                    Profile
                                 </span>
                              </Link>

                              <Link to="/home" className="mb-2 dropdown-item" role="button">
                                 <i className="bi bi-person-square"></i>
                                 <span className="d-inline text-white ps-3 text-decoration-none navbar-tab">
                                    Leagues
                                 </span>
                              </Link>
                              <li className="mb-2 dropdown-item" role="button" onClick={handleLogout}>
                                 <i className="bi bi-arrow-left-square"></i>
                                 <a className="d-inline text-white ps-3 text-decoration-none navbar-tab" role="button">
                                    Sign Out
                                 </a>
                              </li>
                           </ul>
                        </li>
                     </>
                  ) : (
                     <>
                        <Link to="/login" className="nav-link active me-1 nav-item" style={{ letterSpacing: "0" }}>
                           LOGIN
                        </Link>

                        <Link to="/register">
                           <button type="button" className="btn btn-primary me-3 nav-item">
                              SIGN UP
                           </button>
                        </Link>
                     </>
                  )}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Nav;
