import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store";
import { Avatar } from "@mui/material";

const Nav = () => {
   const user = useSelector((state) => state.auth);
   const { auth, leagues } = useSelector((state) => state);
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
                  {auth?.username ? (
                     <>
                        <span className="text-white align-middle">
                           Welcome! {`${auth.username[0].toUpperCase()}${auth.username.slice(1)}`}
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
                                 alt={auth.username}
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
                              <li className="dropdown-item mb-2 mt-2" role="button">
                                 <i className="bi  bi-layout-text-window"></i>
                                 <a className="d-inline text-white ps-3" href="#/dashboard">
                                    Dashboard
                                 </a>
                              </li>
                              <li className="mb-2 dropdown-item" role="button">
                                 <i className="bi bi-person-square"></i>
                                 <a className="d-inline text-white ps-3" href="#">
                                    Profile
                                 </a>
                              </li>
                              <li className="mb-2 dropdown-item" role="button">
                                 <i className="bi bi-arrow-left-square"></i>
                                 <a className="d-inline text-white ps-3" role="button" onClick={handleLogout}>
                                    Sign Out
                                 </a>
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
