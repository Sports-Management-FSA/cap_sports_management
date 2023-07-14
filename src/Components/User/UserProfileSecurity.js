import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../store";

const UserProfileSecurity = () => {
   const { auth } = useSelector(({ auth }) => ({ auth }));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formErrors, setFormErrors] = useState("");
   const [showConfirmation, setShowConfirmation] = useState(false);
   const [formData, setFormData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

   const handleInputChange = (ev) => {
      setFormData({ ...formData, [ev.target.id]: ev.target.value });
   };
   const handleSubmit = (ev) => {
      ev.preventDefault();

      if (formData.newPassword !== formData.confirmPassword) {
         setFormErrors("New password and confirm password do not match");
         return;
      }

      dispatch(
         updatePassword({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
         })
      )
         .then(() => {
            // Password changed successfully
            navigate("/profile");
         })
         .catch((error) => {
            // Handle error
            setFormErrors(error.message);
         });
   };

   return (
      <div className="row d-flex justify-content-center">
         <div className="col-xl-8">
            <div className="card mb-4">
               <div className="card-header">Change Password</div>
               <div className="card-body">
                  <form onSubmit={handleSubmit}>
                     <div className="mb-3">
                        <label className="small mb-1" htmlFor="currentPassword">
                           Current Password
                        </label>
                        <input
                           className="form-control"
                           type="password"
                           id="currentPassword"
                           placeholder="Enter current password"
                           onChange={handleInputChange}
                        />
                     </div>
                     {formErrors && <div className="text-danger">{formErrors}</div>}
                     <div className="mb-3">
                        <label className="small mb-1" htmlFor="newPassword">
                           New Password
                        </label>
                        <input
                           className="form-control"
                           type="password"
                           id="newPassword"
                           placeholder="Enter new password"
                           onChange={handleInputChange}
                        />
                     </div>
                     <div className="mb-3">
                        <label className="small mb-1" htmlFor="confirmPassword">
                           Confirm Password
                        </label>
                        <input
                           className="form-control"
                           type="password"
                           id="confirmPassword"
                           placeholder="Confirm New Password"
                           onChange={handleInputChange}
                        />
                     </div>
                     {formErrors && <div className="text-danger">{formErrors}</div>}
                     <div>
                        <button className="btn btn-outline-secondary">Save</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className="col-xl-4">
            <div className="card mb-4">
               <div className="card-header">Delete Account</div>
               <div className="card-body">
                  <p className="text-dark user-security-pargraph">
                     Deleting your account is a permanent action and cannot be undone. If you are sure you want to
                     delete your account, select the button below.
                  </p>
                  <button className="btn btn-danger" type="button">
                     Delete
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfileSecurity;
