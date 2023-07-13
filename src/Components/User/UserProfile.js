import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAccountDetail from "./UserProfileAccountDetail";
import UserProfileSecurity from "./UserProfileSecurity";

const UserProfile = () => {
  
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
      return <h2 className="text-center mt-5">Please login to view the profile</h2>;
   } else {
      return (
         <div className="container-xl px-4 mt-4 vh-100">
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
