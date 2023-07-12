import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfileAccountDetail = () => {
   return (
      <div className="row">
         <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
               <div className="card-header">Profile Picture</div>
               <div className="card-body text-center">
                  <img
                     src="static/images/camera.svg"
                     alt="profile-picture"
                     className="img-account-profile rounded-circle mb-2"
                  />
                  <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                  <button className="btn btn-outline-secondary">Upload new image</button>
               </div>
            </div>
         </div>
         <div className="col-xl-8">
            <div className="card mb-4">
               <div className="card-header">Account Details</div>
               <div className="card-body">
                  <form>
                     <div className="row">
                        <div className="mb-1">
                           <label className="small mb-1" htmlFor="username">
                              Username
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              id="username"
                              placeholder="Username can not be empty"
                           />
                        </div>
                     </div>
                     <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                           <label className="small mb-1" htmlFor="firstName">
                              First Name
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              id="firstName"
                              placeholder="FirstName can not be empty"
                           />
                        </div>
                        <div className="col-md-6">
                           <label className="small mb-1" htmlFor="lastName">
                              Last Name
                           </label>
                           <input
                              className="form-control"
                              type="text"
                              id="lastName"
                              placeholder="LastName can not be empty"
                           />
                        </div>
                     </div>
                     <div className="row">
                        <div className="mb-1">
                           <label className="small mb-1" htmlFor="email">
                              Email
                           </label>
                           <input
                              className="form-control"
                              type="email"
                              id="email"
                              placeholder="Email can not be empty"
                           />
                        </div>
                     </div>
                     <div>
                        <button className="btn btn-outline-secondary">Save changes</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>{" "}
      </div>
   );
};

export default UserProfileAccountDetail;
