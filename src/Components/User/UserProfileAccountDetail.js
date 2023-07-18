import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginWithToken, updateUser } from "../../store";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfileAccountDetail = () => {
   const { auth } = useSelector(({ auth }) => ({ auth }));
   const users = useSelector((state) => state.players.playerList);
   const fileInputRef = useRef(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formErrors, setFormErrors] = useState("");
   const [showConfirmation, setShowConfirmation] = useState(false);
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

   // Form validation
   const validateForm = () => {
      const errors = {};

      // Validate Email
      if (formData.email.trim() === "") {
         errors.email = "Email is required";
      } else if (!validator.isEmail(formData.email)) {
         errors.email = "Invalid email format";
      } else {
         if (formData.email !== auth.email && users.some((user) => user.email === formData.email)) {
            errors.email = "Email already exists";
         }
      }

      // Validate Username
      if (formData.username.trim() === "") {
         errors.username = "Username is required";
      } else {
         if (formData.username !== auth.username && users.some((user) => user.username === formData.username)) {
            errors.username = "Username already exists";
         }
      }
      setFormErrors(errors);

      return errors;
   };
   const handleSubmit = (ev) => {
      ev.preventDefault();

      // Check for empty fields
      if (formData.username.trim() === "") {
         toast.error("Username cannot be empty");
         return;
      }

      if (formData.firstName.trim() === "") {
         toast.error("First Name cannot be empty");
         return;
      }

      if (formData.lastName.trim() === "") {
         toast.error("Last Name cannot be empty");
         return;
      }

      if (formData.email.trim() === "") {
         toast.error("Email cannot be empty");
         return;
      }

      const validateErrors = validateForm();
      if (Object.keys(validateErrors).length > 0) {
         // Form has errors, prevent form submission
         setFormErrors(validateErrors);
         return;
      } else {
         dispatch(updateUser(formData))
            .then(() => {
               toast.success("Profile changed successfully!");
               //    setTimeout(() => {
               //       window.location.reload(); // Refresh the page
               //    }, 1000); // Delay in milliseconds (optional)
            })
            .catch((error) => {
               // Handle error
               setFormErrors({ general: error.message });
               toast.error("Profile change failed"); // Show error toast
            });
      }
   };

   useEffect(() => {
      dispatch(loginWithToken());
   }, [dispatch]);

   return (
      <div className="row profile-account-details">
         <div className="col-xl-4">
            <Toaster position="top-center" reverseOrder={false} />
            <div
               className="card mb-4 mb-xl-0"
               style={{
                  backgroundColor: "#2a5262"
               }}>
               <div className="card-header text-white">Profile Picture</div>
               <div className="card-body text-center align-items-center">
                  <img
                     src={formData.avatar ? formData.avatar : "static/images/camera.svg"}
                     alt="profile-picture"
                     className="img-account-profile rounded-circle mb-2"
                  />
                  <div className="small font-italic text-light mb-4">JPG or PNG no larger than 5 MB</div>
                  <button className="btn btn-light" onClick={handleUploadButtonClick}>
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
            <div
               className="card mb-4"
               style={{
                  backgroundColor: "#2a5262"
               }}>
               <div className="card-header">Account Details</div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
                     <div className="row">
                        <div className="mb-1">
                           <label className="small mb-1 text-white" htmlFor="username">
                              Username
                           </label>
                           <input
                              className={`form-control ${formErrors.username ? "is-invalid" : ""}`}
                              type="text"
                              id="username"
                              placeholder="Username can not be empty"
                              value={formData.username}
                              onChange={handleInputChange}
                           />
                           {formErrors && <div className="invalid-feedback">{formErrors.username}</div>}
                        </div>
                     </div>
                     <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                           <label className="small mb-1 text-white" htmlFor="firstName">
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
                           <label className="small mb-1 text-white" htmlFor="lastName">
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
                           <label className="small mb-1 text-white" htmlFor="email">
                              Email
                           </label>
                           <input
                              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                              type="email"
                              id="email"
                              placeholder="Email can not be empty"
                              value={formData.email}
                              onChange={handleInputChange}
                           />
                           {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                        </div>
                        <div>
                           <button className="btn btn-light mt-4" onClick={handleSubmit}>
                              Save
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfileAccountDetail;
