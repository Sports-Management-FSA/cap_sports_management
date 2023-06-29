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

   const googleLogin = () => {
      window.open("http://localhost:3000/auth/google", "_self");
   };

   return (
      <section className="vh-100 login-custom">
         <div className="container py-5 h-100 ">
            <form className="row d-flex justify-content-center align-items-center h-100 opacity-80">
               <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                     <div className="card-body p-5 text-center">
                        <div className="mb-md-5 mt-md-4 pb-5">
                           <h2 className="fw-bold mb-2">Log into Podium</h2>
                           <p className="text-white-50 mb-5">Please enter your username and password!</p>
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
                              <a className="text-white-50" href="#!">
                                 Forgot password?
                              </a>
                           </p>
                           {loginError && <p>{loginError}</p>}
                           <button
                              className="btn btn-outline-light btn-lg px-5"
                              disabled={invalidCredentials}
                              onClick={login}>
                              Login
                           </button>
                           <div className="d-flex justify-content-center text-center mt-4 pt-1">
                              <a className="text-white" role="button">
                                 <i className="fab fa-facebook-f fa-lg"></i>
                              </a>
                              <a className="text-white" role="button">
                                 <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                              </a>

                              <a className="text-white" role="button" onClick={googleLogin}>


                                 <i className="fab fa-google fa-lg"></i>
                              </a>
                           </div>
                        </div>
                        <div>
                           <p className="mb-0">
                              Don't have an account?{" "}
                              <Link to="/register" className="text-decoration-none text-white-50 fw-bold">
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
