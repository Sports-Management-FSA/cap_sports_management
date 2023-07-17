import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword, deleteUser, loginWithToken } from "../../store";
import toast, { Toaster } from "react-hot-toast";

const UserProfileSecurity = () => {
   const { auth } = useSelector(({ auth }) => ({ auth }));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formErrors, setFormErrors] = useState({});
   const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

   const handleInputChange = (ev) => {
      setFormData({ ...formData, [ev.target.id]: ev.target.value });
   };

   // Form validation
   const validateForm = () => {
      const errors = {};

      if (formData.newPassword !== formData.confirmPassword) {
         errors.newPassword = "New password and confirm password do not match";
      }

      return errors;
   };

   const isFormEmpty = () => {
      return Object.values(formData).every((value) => value === "");
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();

      const validateErrors = validateForm();
      if (Object.keys(validateErrors).length > 0) {
         // Form has errors, set the formErrors state
         setFormErrors(validateErrors);
      } else {
         // Clear the formErrors state
         setFormErrors({});

         dispatch(
            updatePassword({
               currentPassword: formData.currentPassword,
               newPassword: formData.newPassword
            })
         )
            .then(() => {
               // Password changed successfully
               toast.success("Password changed successfully!");
               setTimeout(() => {
                  window.location.reload(); // Refresh the page
               }, 1000); // Delay in milliseconds (optional)
            })
            .catch((error) => {
               // Handle error
               setFormErrors({ general: error.message });
               toast.error("Password change failed"); // Show error toast
            });
      }
   };

   // Delete User Function
   const handleDeleteUser = () => {
      dispatch(deleteUser(auth));
      navigate(0);
   };

   return (
      <div className="row d-flex justify-content-center">
         <div>
            <Toaster position="top-center" reverseOrder={false} />
         </div>
         <div className="col-xl-8">
            <div
               className="card mb-4"
               style={{
                  backgroundColor: "#2a5262"
               }}>
               <div className="card-header">Change Password</div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                        <label className="small mb-1 text-white" htmlFor="currentPassword">
                           Current Password
                        </label>
                        <input
                           className={`form-control ${formErrors.currentPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="currentPassword"
                           placeholder="Enter current password"
                           onChange={handleInputChange}
                        />
                        {formErrors.currentPassword && (
                           <div className="invalid-feedback">{formErrors.currentPassword}</div>
                        )}
                     </div>
                     <div className="mb-3">
                        <label className="small mb-1 text-white" htmlFor="newPassword">
                           New Password
                        </label>
                        <input
                           className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="newPassword"
                           placeholder="Enter new password"
                           onChange={handleInputChange}
                        />
                        {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                     </div>
                     <div className="mb-3">
                        <label className="small mb-1 text-white" htmlFor="confirmPassword">
                           Confirm Password
                        </label>
                        <input
                           className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="confirmPassword"
                           placeholder="Confirm New Password"
                           onChange={handleInputChange}
                        />
                        {formErrors.newPassword && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                     </div>
                     {formErrors.general && (
                        <div className="alert alert-danger" role="alert">
                           {formErrors.general}
                        </div>
                     )}
                     <div>
                        <button type="submit" className="btn btn-light" disabled={isFormEmpty()}>
                           Save
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className="col-xl-4">
            <div
               className="card mb-4"
               style={{
                  backgroundColor: "#2a5262"
               }}>
               <div className="card-header">Delete Account</div>
               <div className="card-body">
                  <p className="text-light user-security-pargraph delete-message">
                     Deleting your account is a permanent action and cannot be undone. If you are sure you want to
                     delete your account, select the button below.
                  </p>
                  <button className="btn btn-danger" type="button" onClick={() => handleDeleteUser(auth)}>
                     Delete
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfileSecurity;
