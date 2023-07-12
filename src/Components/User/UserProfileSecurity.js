import React from "react";

const UserProfileSecurity = () => {
   return (
      <div className="row">
         <div className="card mb-4">
            <div className="card-header">Change Password</div>
            <div className="card-body">
               <form>
                  <div className="mb-3">
                     <label className="small mb-1" htmlFor="currentPassword">
                        Current Password
                     </label>
                     <input
                        className="form-control"
                        type="password"
                        id="currentPassword"
                        placeholder="Enter current password"
                     />
                  </div>
                  <div className="mb-3">
                     <label className="small mb-1" htmlFor="newPassword">
                        New Password
                     </label>
                     <input
                        className="form-control"
                        type="password"
                        id="newPassword"
                        placeholder="Enter new password"
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
                     />
                  </div>
                  <div>
                     <button className="btn btn-outline-secondary">Save</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default UserProfileSecurity;
