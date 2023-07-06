import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [credentials, setCredentials] = useState({
      username: "",
      password: ""
   });

   const [loginError, setLoginError] = useState("");

   const onChange = (ev) => {
      setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
      setLoginError("");
   };

   const login = async (ev) => {
      ev.preventDefault();
      try {
         const resultAction = await dispatch(attemptLogin(credentials));
         const success = resultAction.type.endsWith("/fulfilled");

         if (success) {
            navigate("/");
         } else {
            setLoginError("Invalid credentials. Please try again.");
         }
      } catch (error) {
         console.error("Error during login:", error);
         setLoginError("An error occurred during login. Please try again.");
      }
   };

   const invalidCredentials = credentials.username === "" || credentials.password === "";

   const google = () => {
      window.open("http://localhost:3000/auth/google", "_self");
   };
   const facebook = () => {
      window.open("http://localhost:3000/auth/facebook", "_self");
   };

   const twitter = () => {
      window.open("http://localhost:3000/auth/twitter", "_self");
   };

   return (
      <section
         className="vh-100"
         style={{
            backgroundColor: "#e7ecef"
         }}>
         <div className="container py-5 h-100 ">
            <form className="row d-flex justify-content-center align-items-center h-100 opacity-90">
               <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div
                     className="card text-white"
                     style={{
                        borderRadius: "1rem",
                        backgroundColor: "#fdfffc",
                        border: "none"
                     }}>
                     <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                           <h2 className="fw-bold mb-2 text-dark">Log into Podium</h2>
                           <p className="text-dark mb-5">Please enter your username and password!</p>
                           <div className="form-outline form-white mb-4">
                              <input
                                 className="form-control form-control-lg"
                                 placeholder="Username"
                                 value={credentials.username}
                                 name="username"
                                 onChange={onChange}
                              />
                           </div>
                           <div className="form-outline form-white mb-4">
                              <input
                                 className="form-control form-control-lg"
                                 placeholder="Password"
                                 type="password"
                                 name="password"
                                 value={credentials.password}
                                 onChange={onChange}
                              />
                           </div>
                           <p className="small mb-5 pb-lg-2">
                              <a className="text-dark text-decoration-none forgot-password" href="#!">
                                 Forgot password?
                              </a>
                           </p>
                           {loginError && <p>{loginError}</p>}
                           <button
                              className="btn btn-outline-dark btn-lg px-5"
                              disabled={invalidCredentials}
                              onClick={login}>
                              Login
                           </button>
                           <div className="d-flex justify-content-center text-center mt-4 pt-1">
                              <a className="text-dark" role="button" onClick={facebook}>
                                 <i className="fab fa-facebook-f fa-lg"></i>
                              </a>
                              <a className="text-dark" role="button" onClick={twitter}>
                                 <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                              </a>

                              <a className="text-dark" role="button" onClick={google}>
                                 <i className="fab fa-google fa-lg"></i>
                              </a>
                           </div>
                        </div>
                        <div>
                           <p className="mb-0 text-dark">
                              Don't have an account?{" "}
                              <Link to="/register" className="text-decoration-none text-dark fw-bold sign-up">
                                 Sign Up
                              </Link>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </section>
   );
};

export default Login;
