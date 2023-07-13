import React, { useState } from "react";
import { attemptLogin, attemptSignup } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const users = useSelector((state) => state.players.playerList);
   const [formErrors, setFormErrors] = useState("");
   const [formData, setFormData] = useState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
   });
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleInputChange = (ev) => {
      if (ev.target.id === "confirmPassword") {
         setConfirmPassword(ev.target.value);
      } else {
         setFormData({ ...formData, [ev.target.id]: ev.target.value });
      }
   };

   // Form validation
   const validateForm = () => {
      const errors = {};

      // Validate Email
      if (formData.email.trim() === "") {
         errors.email = "Email is required";
      } else if (!validator.isEmail(formData.email)) {
         errors.email = "Invalid email format";
      } else {
         if (users.some((user) => user.email === formData.email)) {
            errors.email = "Email already exists";
         }
      }

      // Validate Username
      if (formData.username.trim() === "") {
         errors.username = "Username is required";
      } else {
         if (users.some((user) => user.username === formData.username)) {
            errors.username = "Username already exists";
         }
      }

      // Validate Password
      if (formData.password === "") {
         errors.password = "Password is required";
      }

      // Validate Confirm Password
      if (formData.password !== confirmPassword) {
         errors.confirmPassword = "Password do no match";
      }

      setFormErrors(errors);

      return errors;
   };

   const handleSubmit = async (ev) => {
      ev.preventDefault();
      try {
         const validateErrors = validateForm();
         if (Object.keys(validateErrors).length > 0) {
            // Form has errors, prevent form submission
            setFormErrors(validateErrors);
            return;
         }
         const signUpResult = await dispatch(attemptSignup(formData));
         if (signUpResult.payload.error) {
            console.log("Sign up error:", error);
            return;
         }
         const loginResult = await dispatch(attemptLogin(formData));
         if (loginResult.payload) {
            navigate("/");
         } else {
            console.error("Error:", error);
         }
      } catch (err) {
         console.log("Error:", console.error);
      }
   };

   return (
      <section
         className="vh-100"
         style={{
            backgroundColor: "#f6f3f3"
         }}>
         <div className="mask d-flex align-items-center h-100 py-5">
            <div className="container py-5">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-9 col-md-9 col-lg-7 col-xl-6">
                     <div className="card" style={{ borderRadius: "15px", backgroundColor: "#fdfffc" }}>
                        <div className="card-body p-5">
                           <h2 className="text-uppercase text-center mb-3 fw-bold text-dark">Create an account</h2>

                           <form onSubmit={handleSubmit}>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className={`form-control ${formErrors.username ? "is-invalid" : ""}`}
                                    placeholder="Username"
                                    value={formData.username}
                                    id="username"
                                    onChange={handleInputChange}
                                 />
                                 {formErrors && <div className="invalid-feedback">{formErrors.username}</div>}
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className={`form-control ${formErrors.password ? "is-invalid" : ""}`}
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                 />
                                 {formErrors && <div className="invalid-feedback">{formErrors.password}</div>}
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className={`form-control ${formErrors.confirmPassword ? "is-invalid" : ""}`}
                                    placeholder="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                 />
                                 {formErrors && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="FirstName"
                                    value={formData.firstName}
                                    id="firstName"
                                    onChange={handleInputChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className="form-control"
                                    placeholder="LastName"
                                    value={formData.lastName}
                                    id="lastName"
                                    onChange={handleInputChange}
                                 />
                              </div>
                              <div className="form-outline form-white mb-2">
                                 <input
                                    className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                 />
                                 {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                              </div>
                              <div className="d-flex justify-content-center">
                                 <button className="btn btn-outline-dark btn-lg px-5" type="submit">
                                    Register
                                 </button>
                              </div>
                              <p
                                 className="text-center text-dark mt-3 mb-0"
                                 style={{ letterSpacing: "0", fontSize: "14px" }}>
                                 Have an account?{" "}
                                 <Link to="/login" className="text-dark fw-bold register-login">
                                    <span className="register-login-here">Login here</span>
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
