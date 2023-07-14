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

   // Form validation
   const validateForm = () => {
      const errors = {};

      if (formData.newPassword !== formData.confirmPassword) {
         errors.newPassword = "New password and confirm password do not match";
      }

      return errors;
   };

   const handleSubmit = (ev) => {
      ev.preventDefault();

      const validateErrors = validateForm();
      if (Object.keys(validateErrors).length > 0) {
         // Form has errors, prevent form submission
         setFormErrors(validateErrors);
         return;
      }
      setShowConfirmation(true);
   };

   const handleConfirmChanges = () => {
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
      setShowConfirmation(false);
      // Close the modal and backdrop after user confirm
      const modal = document.getElementById("confirmModal");
      const backdrop = document.getElementsByClassName("modal-backdrop")[0];
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      backdrop.parentNode.removeChild(backdrop);
      // Refresh Page after user confirm
      navigate("/");
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
                           className={`form-control ${formErrors.currentPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="currentPassword"
                           placeholder="Enter current password"
                           onChange={handleInputChange}
                        />
                        {formErrors && <div className="invalid-feedback">{formErrors.currentPassword}</div>}
                     </div>
                     <div className="mb-3">
                        <label className="small mb-1" htmlFor="newPassword">
                           New Password
                        </label>
                        <input
                           className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="newPassword"
                           placeholder="Enter new password"
                           onChange={handleInputChange}
                        />
                        {formErrors && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                     </div>
                     <div className="mb-3">
                        <label className="small mb-1" htmlFor="confirmPassword">
                           Confirm Password
                        </label>
                        <input
                           className={`form-control ${formErrors.newPassword ? "is-invalid" : ""}`}
                           type="password"
                           id="confirmPassword"
                           placeholder="Confirm New Password"
                           onChange={handleInputChange}
                        />
                        {formErrors && <div className="invalid-feedback">{formErrors.newPassword}</div>}
                     </div>
                     <div>
                        <button
                           type="button"
                           className="btn btn-outline-secondary"
                           data-bs-toggle="modal"
                           data-bs-target="#confirmModal">
                           Save
                        </button>
                     </div>
                     {/* Modal */}
                     <div
                        className="modal fade"
                        id="confirmModal"
                        tabIndex="-1"
                        aria-labelledby="modalLabel"
                        aria-hidden="true">
                        <div className="modal-dialog">
                           <div className="modal-content">
                              <div className="modal-header">
                                 <h1 className="modal-title fs-6" id="modalLabel" style={{ letterSpacing: "0" }}>
                                    Confirm Changes
                                 </h1>
                                 <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                              </div>
                              <div className="modal-body">Are you sure you want to save the changes?</div>
                              <div className="modal-footer">
                                 <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => setShowConfirmation(false)}>
                                    Close
                                 </button>
                                 <button type="button" className="btn btn-primary" onClick={handleConfirmChanges}>
                                    Save changes
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         <div className="col-xl-4">
            <div className="card mb-4">
               <div className="card-header">Delete Account</div>
               <div className="card-body">
                  <p className="text-dark user-security-pargraph delete-message">
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
