import React, { useState } from "react";

import UserProfileAccountDetail from "./UserProfileAccountDetail";
import UserProfileSecurity from "./UserProfileSecurity";

const UserProfile = () => {
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
};

export default UserProfile;
