import React from "react";
import UserProfileInformation from "./UserProfileInformation";

const UserProfile = () => {
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
                           <h6 className="profile-tab-header">Profile Information</h6>
                           <hr />
                           <UserProfileInformation />
                        </div>
                        <div className="tab-pane" id="account">
                           <h6 className="profile-tab-header">Account</h6>
                           <hr />
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
