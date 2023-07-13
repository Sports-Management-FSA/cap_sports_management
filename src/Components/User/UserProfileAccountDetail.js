import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithToken, updateUser } from "../../store";

const UserProfileAccountDetail = () => {
   const { auth } = useSelector(({ auth }) => ({ auth }));
   const fileInputRef = useRef(null);
   const dispatch = useDispatch();
   const [formData, setFormData] = useState({
      username: auth.username || "",
      firstName: auth.firstName || "",
      lastName: auth.lastName || "",
      email: auth.email || "",
      avatar: auth.avatar || ""
   });

   // Account Details
   const handleInputChange = (ev) => {
      setFormData({ ...formData, [ev.target.id]: ev.target.value });
   };

   // User Avatar
   const [previewAvatar, setPreviewAvatar] = useState("");

   const handleUploadButtonClick = () => fileInputRef.current.click();
   const handleFileInputChange = (ev) => {
      if (ev.target && ev.target.files.length > 0) {
         const file = ev.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("load", () => {
            setFormData({ ...formData, avatar: reader.result });
            setPreviewAvatar(reader.result);
         });
      }
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();

      dispatch(updateUser(formData));
   };

   useEffect(() => {
      dispatch(loginWithToken());
   }, [dispatch]);

   return (
      <div className="row">
         <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
               <div className="card-header">Profile Picture</div>
               <div className="card-body text-center">
                  <img
                     src={formData.avatar ? formData.avatar : "static/images/camera.svg"}
                     alt="profile-picture"
                     className="img-account-profile rounded-circle mb-2"
                  />
                  <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                  <button className="btn btn-outline-secondary" onClick={handleUploadButtonClick}>
                     Upload new image
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
         </div>
         <div className="col-xl-8">
            <div className="card mb-4">
               <div className="card-header">Account Details</div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
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
                              value={formData.username}
                              onChange={handleInputChange}
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
                              value={formData.firstName}
                              onChange={handleInputChange}
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
                              value={formData.lastName}
                              onChange={handleInputChange}
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
                              value={formData.email}
                              onChange={handleInputChange}
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
