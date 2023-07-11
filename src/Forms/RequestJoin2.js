import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../store";
import validator from "validator";
import RequestJoinTeam from "./RequestJoinTeam";
import RequestJoinPlayer from "./RequestJoinPlayer";

const RequestJoin2 = () => {
   const { id } = useParams();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));

   const [role, setRole] = useState("");

   const handleRoleChange = (e) => {
      setRole(e.target.value);
   };

   const renderForm = () => {
      if (role === "player") {
         return <RequestJoinPlayer />;
      } else if (role === "team") {
         return <RequestJoinTeam />;
      }
   };

   const renderRoleSelection = () => {
      if (role === "") {
         return (
            <div>
               <label className="fs-4 mb-2">Please select your role</label>
               <br />
               <select className="form-select" value={role} onChange={handleRoleChange}>
                  <option value="">Select...</option>
                  <option value="player">Player</option>
                  <option value="team">Team</option>
               </select>
            </div>
         );
      } else {
         return null;
      }
   };

   return (
      <div className="requestform__container">
         {renderRoleSelection()}
         {renderForm()}
      </div>
   );
};

export default RequestJoin2;
