import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import validator from "validator";
import { addPlayer } from "../store";

const CreatePlayer = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const fileInputRef = useRef(null);
   const [playerAvatar, setPlayerAvatar] = useState("");
   const [previewAvatar, setPreviewAvatar] = useState("");

   // Create User Form
   const [username, setUsername] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleUsernameChange = (ev) => setUsername(ev.target.value);
   const handleFirstNameChange = (ev) => setFirstName(ev.target.value);
   const handleLastNameChange = (ev) => setLastName(ev.target.value);
   const handleEmailChange = (ev) => setEmail(ev.target.value);
   const handlePasswordChange = (ev) => setPassword(ev.target.value);
   const handleConfirmPasswordChange = (ev) => setConfirmPassword(ev.target.value);

   // Logo Upload Function
   const handleUploadButtonClick = () => fileInputRef.current.click();
   const handleFileInputChange = (event) => {
      if (event.target && event.target.files.length > 0) {
         const file = event.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("load", () => {
            setPlayerAvatar(reader.result);
            setPreviewAvatar(reader.result);
         });
      }
   };

   const handleSubmit = async (ev) => {
      ev.preventDefault();
      const player = {
         username: ev.target.username.value,
         password: ev.target.password.value,
         firstName: ev.target.firstName.value,
         lastName: ev.target.lastName.value,
         email: ev.target.email.value,
         isPlayer: true,
         teamId: teamId
      };
      dispatch(addPlayer(player));
      navigate(`/teams/${teamId}`);
   };

   return (
      <section className="vh-100">
         <div className="d-flex align-items-center h-100">
            <div className="container py-5">
               <form onSubmit={handleSubmit}>
                  <div className="row d-flex justify-content-center align-items-center opacity-90 h-100">
                     <div className="col-sm-11 col-md-11 col-lg-10">
                        <div className="card create-team-card">
                           <h3 className="text-center mt-4 create-team-leagueName">league Logo Here</h3>
                           <div className="row-col-2 d-flex justify-content-center">
                              <h4>Team Name with Logo here</h4>
                           </div>
                           <hr />
                           <div className="card-body">
                              <div className="row">
                                 <p className="mb-3 create-team-title text-center">Started your player here!</p>
                              </div>
                              <div className="row my-auto text-center justify-content-center">
                                 <img
                                    className="mb-2"
                                    src={previewAvatar || "static/images/camera.svg"}
                                    alt="teamLogo"
                                    style={{ width: "8rem", height: "7rem" }}
                                 />
                                 <div className="small font-italic text-muted mb-3">JPG or PNG no larger than 5 MB</div>
                                 <div>
                                    <button
                                       className="btn btn-outline-secondary"
                                       type="button"
                                       onClick={handleUploadButtonClick}>
                                       Upload
                                    </button>
                                 </div>
                                 <input
                                    type="file"
                                    id="uploadInput"
                                    className="d-none"
                                    ref={fileInputRef}
                                    onChange={handleFileInputChange}
                                 />
                              </div>
                              <div className="row justify-content-around">
                                 <div className="col-lg-5">
                                    <label htmlFor="username" className="form-label mt-2">
                                       Username
                                    </label>
                                    <input
                                       className="form-control"
                                       name="username"
                                       type="text"
                                       id="username"
                                       value={username}
                                       onChange={handleUsernameChange}
                                    />
                                 </div>
                                 <div className="col-lg-5">
                                    <label htmlFor="email" className="form-label mt-2">
                                       Email
                                    </label>
                                    <input
                                       className="form-control"
                                       type="email"
                                       name="email"
                                       id="email"
                                       value={email}
                                       onChange={handleEmailChange}
                                    />
                                 </div>
                              </div>
                              <div className="row justify-content-around">
                                 <div className="col-lg-5">
                                    <label htmlFor="firstName" className="form-label mt-2">
                                       First Name
                                    </label>
                                    <input
                                       className="form-control"
                                       name="firstName"
                                       type="text"
                                       id="firstName"
                                       value={firstName}
                                       onChange={handleFirstNameChange}
                                    />
                                 </div>
                                 <div className="col-lg-5">
                                    <label htmlFor="lastName" className="form-label mt-2">
                                       Last Name
                                    </label>
                                    <input
                                       className="form-control"
                                       name="lastName"
                                       type="text"
                                       id="lastName"
                                       value={lastName}
                                       onChange={handleLastNameChange}
                                    />
                                 </div>
                              </div>
                              <div className="row justify-content-around">
                                 <div className="col-5">
                                    <label htmlFor="password" className="form-label mt-2">
                                       Password
                                    </label>
                                    <input
                                       className="form-control"
                                       name="password"
                                       type="password"
                                       id="password"
                                       value={password}
                                       onChange={handlePasswordChange}
                                    />
                                 </div>
                                 <div className="col-5">
                                    <label htmlFor="confirmPassword" className="form-label mt-2">
                                       Confrim Password
                                    </label>
                                    <input
                                       className="form-control"
                                       name="confirmPassword"
                                       type="password"
                                       id="confirmPassword"
                                       value={confirmPassword}
                                       onChange={handleConfirmPasswordChange}
                                    />
                                 </div>
                              </div>
                              <div className="text-center">
                                 <button className="btn btn-outline-secondary">Submit</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
};

export default CreatePlayer;
