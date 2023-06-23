import React, { useState } from "react";
import { attemptLogin, registerUser } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [credentials, setCredentials] = useState({
      username: "",
      password: "",
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
      navigate('/leagues');
   };

   const invalidCredentials =
      credentials.username === "" ||
      credentials.password === "" ||
      credentials.firstName === "" ||
      credentials.lastName === "" ||
      credentials.email === "";

   return (
      <div>
         <h2>Register Page</h2>
         <form onSubmit={handleRegister}>
            <div>
               <input placeholder="Username" value={credentials.username} name="username" onChange={onChange} />
            </div>
            <div>
               <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
               />
            </div>
            <div>
               <input placeholder="FirstName" value={credentials.firstName} name="firstName" onChange={onChange} />
            </div>
            <div>
               <input placeholder="LastName" value={credentials.lastName} name="lastName" onChange={onChange} />
            </div>
            <div>
               <input placeholder="Email" type="email" name="email" value={credentials.email} onChange={onChange} />
            </div>
            <div>
               <button disabled={invalidCredentials} type="submit">
                  Register
               </button>
            </div>
         </form>
         {registerError && <div>{registerError}</div>}
      </div>
   );
};

export default Register;
