import React, { useState, useEffect } from "react";
import { attemptLogin } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { loggedIn } = useSelector((state) => state.auth);
   const [credentials, setCredentials] = useState({
      username: "",
      password: ""
   });

   const [loginError, setLoginError] = useState("");

   const onChange = (ev) => {
      setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
      setLoginError("");
   };

   useEffect(() => {
      if (loggedIn) {
         setTimeout(() => {
            navigate("/");
         }, 2000);
      }
   }, [loggedIn, navigate]);

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
      window.open("https://podium.onrender.com/auth/google", "_self");
   };
   const facebook = () => {
      window.open("https://podium.onrender.com/auth/facebook", "_self");
   };

   const twitter = () => {
      window.open("https://podium.onrender.com/auth/twitter");
   };

   return (
      <>
         {!loggedIn ? (
            <section className="vh-100" style={{ backgroundColor: "#f6f3f3", marginBottom: "1rem" }}>
               <div className="mask d-flex align-items-center h-100 py-5">
                  <div className="container py-5">
                     <form className="row d-flex justify-content-center align-items-center opacity-90 h-100">
                        <div className="col-10 col-md-8 col-lg-6 col-xl-5">
                           <div
                              className="card text-white"
                              style={{ borderRadius: "1rem", backgroundColor: "#fdfffc" }}>
                              <div className="card-body p-5 text-center">
                                 <div className="mb-md-5 mt-md-4 pb-5">
                                    <h1 className="fw-bold mb-2 text-dark">Log into Podium</h1>
                                    <p className="text-dark mb-5" style={{ letterSpacing: "0", fontSize: "14px" }}>
                                       Please enter your username and password!
                                    </p>
                                    <div className="form-outline form-white mb-4">
                                       <input
                                          className="form-control form-control-md"
                                          placeholder="Username"
                                          value={credentials.username}
                                          name="username"
                                          onChange={onChange}
                                       />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                       <input
                                          className="form-control form-control-md"
                                          placeholder="Password"
                                          type="password"
                                          name="password"
                                          value={credentials.password}
                                          onChange={onChange}
                                       />
                                    </div>
                                    <p className="small mb-5 pb-lg-2">
                                       <a className="text-dark forgot-password" href="#!">
                                          Forgot password?
                                       </a>
                                    </p>
                                    {loginError && (
                                       <p className="text-danger" style={{ letterSpacing: "0", fontSize: "13px" }}>
                                          {loginError}
                                       </p>
                                    )}
                                    <button
                                       className="btn btn-outline-dark btn-lg px-5"
                                       disabled={invalidCredentials}
                                       onClick={login}>
                                       Login
                                    </button>
                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                       <a className="text-dark social-icon" role="button" onClick={facebook}>
                                          <i className="fab fa-facebook-f fa-lg"></i>
                                       </a>
                                       <a className="text-dark social-icon" role="button" onClick={twitter}>
                                          <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                                       </a>
                                       <a className="text-dark social-icon" role="button" onClick={google}>
                                          <i className="fab fa-google fa-lg"></i>
                                       </a>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="mb-0 text-dark" style={{ letterSpacing: "0", fontSize: "14px" }}>
                                       Don't have an account?{" "}
                                       <Link to="/register" className="text-dark fw-bold sign-up">
                                          Sign Up
                                       </Link>
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </form>
                  </div>
               </div>
            </section>
         ) : (
            <section className="p-0 fluid">
               <div className="row align-items-center justify-content-center min-vh-100">
                  <div className="col-md-9 col-lg-6 my-5">
                     <div className="text-center error-page">
                        <span className="mb-0 fst-italic fw-bold" style={{ fontSize: "8rem" }}>
                           Already logged in.
                        </span>

                        <h2 className="mb-4 text-dark fst-italic">Redirecting to home page...</h2>
                        <div>
                           <a href="/" className="btn btn-outline-dark btn-lg me-sm-2 mb-2 mb-sm-0 error-home-btn">
                              Return Home
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         )}
      </>
   );
};

export default Login;
