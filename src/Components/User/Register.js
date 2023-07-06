import React, { useState } from "react";
import { attemptLogin, registerUser } from "../../store";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [credentials, setCredentials] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: ""
   });

   const [registerError, setRegisterError] = useState("");

   const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value });
      setRegisterError("");
   };

   const handleRegister = async (event) => {
      event.preventDefault();
      try {
         if (!validator.isEmail(credentials.email)) {
            setRegisterError("Please enter a valid email address.");
            return;
         }

         if (credentials.password !== credentials.confirmPassword) {
            setRegisterError("Passwords do not match. Please try again.");
            return;
         }

         const registrationResult = await dispatch(registerUser(credentials));
         if (registrationResult.payload.error) {
            setRegisterError("Username or Email already in use. Please try again.");
            return;
         }

         const loginResult = await dispatch(attemptLogin(credentials));
         if (loginResult.payload) {
            navigate("/");
         } else {
            setRegisterError("An error occurred during login. Please try again.");
         }
      } catch (error) {
         console.error("Error during registration:", error);
         setRegisterError("An error occurred during registration. Please try again.");
      }
   };

   const validateEmail = (email) => {
      // Regular expression for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const invalidCredentials =
      credentials.username === "" ||
      credentials.password === "" ||
      credentials.confirmPassword === "" ||
      credentials.firstName === "" ||
      credentials.lastName === "" ||
      credentials.email === "" ||
      !validateEmail(credentials.email) ||
      credentials.password !== credentials.confirmPassword;

   return (
      <section
         className="vh-100"
         style={{
            backgroundColor: "#f6f3f3"
         }}>
         <div className="mask d-flex align-items-center h-100 py-5">
            <div className="container py-5 h-100">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                     <div className="card" style={{ borderRadius: "15px", backgroundColor: "#fdfffc" }}>
                        <div className="card-body p-5">
                           <h2 className="text-uppercase text-center mb-3 fw-bold text-dark">Create an account</h2>

                           <form onSubmit={handleRegister}>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="Username"
                                    value={credentials.username}
                                    name="username"
                                    onChange={onChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={onChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={credentials.confirmPassword}
                                    onChange={onChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="FirstName"
                                    value={credentials.firstName}
                                    name="firstName"
                                    onChange={onChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="LastName"
                                    value={credentials.lastName}
                                    name="lastName"
                                    onChange={onChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={onChange}
                                 />
                              </div>
                              {registerError && <div className="fw-bold text-center">{registerError}</div>}
                              <div className="d-flex justify-content-center">
                                 <button className="btn btn-outline-dark btn-lg px-5" type="submit">
                                    Register
                                 </button>
                              </div>
                              <p className="text-center text-dark mt-3 mb-0">
                                 Have an account?{" "}
                                 <Link to="/login" className="text-dark fw-bold register-login">
                                    <span>Login here</span>
                                 </Link>
                              </p>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Register;
