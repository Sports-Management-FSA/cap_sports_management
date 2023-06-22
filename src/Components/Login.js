import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
      }
   };

   const invalidCredentials = credentials.username === "" || credentials.password === "";

   return (
      <div>
         <h2>Login</h2>
         <form onSubmit={login}>
            <input placeholder="username" value={credentials.username} name="username" onChange={onChange} />
            <input
               placeholder="password"
               type="password"
               name="password"
               value={credentials.password}
               onChange={onChange}
            />
            <button disabled={invalidCredentials}>Login</button>
         </form>
         {loginError && <div>{loginError}</div>}
      </div>
   );
};

export default Login;
