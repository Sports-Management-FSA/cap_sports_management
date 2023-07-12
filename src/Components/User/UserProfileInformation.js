import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfileInformation = () => {
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state);
   const [username, setUsername] = useState(auth.username || "");
   const [firstName, setFirstName] = useState(auth.firstName || "");
   const [lastName, setLastName] = useState(auth.lastName || "");
   const [email, setEmail] = useState(auth.email || "");
   const [avatar, setAvatar] = useState(auth.avatar || "");
   const [previewAvatar, setPreviewAvatar] = useState("");
   const fileInputRef = useRef(null);

   const handleChange = (ev, setFunction) => setFunction(ev.target.value);

   useEffect(() => {
      // Retrieve form values from local storage
      const storedUsername = localStorage.getItem("username") || auth.username || "";
      const storedFirstName = localStorage.getItem("firstName") || auth.firstName || "";
      const storedLastName = localStorage.getItem("lastName") || auth.lastName || "";
      const storedEmail = localStorage.getItem("email") || auth.email || "";

      setUsername(storedUsername);
      setFirstName(storedFirstName);
      setLastName(storedLastName);
      setEmail(storedEmail);
   }, [auth]);

   // Logo Upload Function
   const handleUploadButtonClick = () => fileInputRef.current.click();
   const handleFileInputChange = (event) => {
      if (event.target && event.target.files.length > 0) {
         const file = event.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("load", () => {
            setAvatar(reader.result);
            setPreviewAvatar(reader.result);
         });
      }
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();

      const updatedProfile = {
         username,
         firstName,
         lastName,
         email,
         avatar
      };

      // Save form values to local storage
      localStorage.setItem("username", username);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("email", email);
   };

   return (
      <>
         <form onSubmit={handleSubmit}>
            <div className="form-group row">
               <div className="col-6">
                  <label htmlFor="username" className="form-label text-dark">
                     Username
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="username"
                     aria-describedby="usernameHelp"
                     placeholder="Username cannot be empty"
                     value={username}
                     onChange={(ev) => handleChange(ev, setUsername)}
                  />
               </div>
               <div className="col-6 my-auto text-center">
                  <img
                     className="rounded-circle mb-2 league-logo"
                     src={previewAvatar || auth.avatar || "static/images/camera.svg"}
                     alt="teamLogo"
                  />
                  <div className="small font-italic text-muted mb-3">JPG or PNG no larger than 5 MB</div>
                  <button className="btn btn-outline-secondary" type="button" onClick={handleUploadButtonClick}>
                     Upload
                  </button>
                  <input
                     type="file"
                     id="uploadInput"
                     className="d-none"
                     ref={fileInputRef}
                     onChange={handleFileInputChange}
                  />
               </div>
            </div>
            <div className="form-group row justify-content-evenly">
               <div className="col-6" style={{ width: "47%" }}>
                  <label htmlFor="firstname" className="form-label text-dark">
                     First Name
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="firstname"
                     aria-describedby="firstnameHelp"
                     placeholder="Firstname can not be empty"
                     value={firstName}
                     onChange={(ev) => handleChange(ev, setFirstName)}
                  />
               </div>
               <div className="col-6" style={{ width: "47%" }}>
                  <label htmlFor="firstname" className="form-label text-dark">
                     Last Name
                  </label>
                  <input
                     type="text"
                     className="form-control"
                     id="lastname"
                     aria-describedby="lastnameHelp"
                     placeholder="lastname can not be empty"
                     value={lastName}
                     onChange={(ev) => handleChange(ev, setLastName)}
                  />
               </div>
            </div>
            <div className="form-group">
               <label htmlFor="email" className="form-label text-dark">
                  Email
               </label>
               <input
                  type="text"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email cannot be empty"
                  value={email}
                  onChange={(ev) => handleChange(ev, setEmail)}
               />
            </div>
         </form>
      </>
   );
};

export default UserProfileInformation;
