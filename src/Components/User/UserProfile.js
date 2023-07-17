import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAccountDetail from "./UserProfileAccountDetail";
import UserProfileSecurity from "./UserProfileSecurity";
import { loginWithToken } from "../../store";

const UserProfile = () => {
   const dispatch = useDispatch();
   const { auth } = useSelector(({ auth }) => ({ auth }));

   // Nav Tab control
   const [activeTab, setActiveTab] = useState("Profile");

   const handleNavClick = (tabName) => {
      setActiveTab(tabName);
   };

   const renderTabContent = () => {
      switch (activeTab) {
         case "Profile":
            return <UserProfileAccountDetail />;
         case "Security":
            return <UserProfileSecurity />;
         default:
            return null;
      }
   };

   if (!auth.username || !auth.loggedIn) {
      return (
         <h1 className="text-center mt-5 fst-italic" style={{ marginBottom: "1175px" }}>
            Please login to view the profile
         </h1>
      );
   } else {
      return (
         <div className="container mt-4 vh-100 profile-page-container" style={{ paddingBottom: "5rem" }}>
            <nav className="nav nav-borders">
               <a
                  role="button"
                  className={`nav-link ${activeTab === "Profile" ? "active" : ""}`}
                  onClick={() => handleNavClick("Profile")}>
                  Profile
               </a>
               <a
                  role="button"
                  className={`nav-link ${activeTab === "Security" ? "active" : ""}`}
                  onClick={() => handleNavClick("Security")}>
                  Security
               </a>
            </nav>
            <hr className="mt-0 mb-4" />
            {renderTabContent()}
         </div>
      );
   }
};

export default UserProfile;
