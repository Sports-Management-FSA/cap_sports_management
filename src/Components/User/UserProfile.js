import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar";

const UserProfile = () => {
   const { auth } = useSelector((state) => state);
   console.log(auth);
   const [username, setUsername] = useState(auth.username || "");
   const [firstName, setFirstName] = useState(auth.firstName || "");
   const [lastName, setLastName] = useState(auth.lastName || "");
   const [email, setEmail] = useState(auth.email || "");

   const handleChange = (ev, setFunction) => setFunction(ev.target.value);

   const handleSubmit = (ev) => {
      ev.preventDefault();

      const updatedProfile = {
         username,
         firstName,
         lastName,
         email
      };
   };

   return (
      <div>
         <div className="container py-5 vh-100">
            <div className="row gutters-sm">
               <div className="col-md-4 d-none d-md-block">
                  <div className="card">
                     <div className="card-body">
                        <nav className="nav flex-column nav-pills nav-gap-y-1">
                           <a
                              href="#profile"
                              data-toggle="tab"
                              className="nav-item nav-link has-icon nav-link-faded active user-profile-tab">
                              <i className="bi bi-person-square profile-icon"></i>
                              Profile Information
                           </a>
                           <a
                              href="#account"
                              data-toggle="tab"
                              className="nav-item nav-link has-icon nav-link-faded user-profile-tab">
                              <i className="bi bi-gear profile-icon"></i>
                              Account Settings
                           </a>
                           <a
                              href="#security"
                              data-toggle="tab"
                              className="nav-item nav-link has-icon nav-link-faded user-profile-tab">
                              <i className="bi bi-shield profile-icon"></i>
                              Security
                           </a>
                           <a
                              href="#notification"
                              data-toggle="tab"
                              className="nav-item nav-link has-icon nav-link-faded user-profile-tab">
                              <i className="bi bi-bell profile-icon"></i>
                              Notification
                           </a>
                        </nav>
                     </div>
                  </div>
               </div>
               <div className="col-md-8">
                  <div className="card">
                     <div className="card-header border-bottom mb-3 d-md-none">
                        <ul className="nav nav-tabs card-header-tabs nav-gap-x-1 profile-tabs" role="tablist">
                           <li className="nav-item">
                              <a href="#profile" data-toggle="tab" className="nav-link has-icon active">
                                 Profile
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#account" data-toggle="tab" className="nav-link has-icon">
                                 {" "}
                                 Account
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#security" data-toggle="tab" className="nav-link has-icon">
                                 Security
                              </a>
                           </li>
                           <li className="nav-item">
                              <a href="#notification" data-toggle="tab" className="nav-link has-icon">
                                 Notification
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="card-body tab-content">
                        <div className="tab-pane active" id="profile">
                           <h6>Profile Information</h6>
                           <hr />
                           <form onSubmit={handleSubmit}>
                              <div className="form-group">
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
                              <div className="form-group row justify-content-evenly">
                                 <div className="col-6" style={{ width: "47%" }}>
                                    <label htmlFor="firstname" className="form-label text-dark">
                                       Firstname
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
                                       Lastname
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
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
