import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../store";
import validator from "validator";

const RequestJoin2 = () => {
   const { id } = useParams();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));

   const [role, setRole] = useState("");
   const [messageUserName, setMessageUserName] = useState("");
   const [messageSubject, setMessageSubject] = useState("");
   const [messageSummary, setMessageSummary] = useState("");
   const [messageTeamName, setMessageTeamName] = useState("");
   const [messageEmail, setMessageEmail] = useState("");
   const [formErrors, setFormErrors] = useState({});

   const dispatch = useDispatch();
   const navigate = useNavigate();

   // Validate Functions
   const validateEmail = (email) => {
      if (!validator.isEmail(email)) {
         return "Invalid email format";
      }
      return "";
   };

   const validateForm = () => {
      const errors = {};

      // Validate Emawil
      errors.email = validateEmail(messageEmail);
      // Validate Name
      if (messageUserName.trim() === "") {
         errors.name = "Name is required";
      }
      // Validate Team Name
      if (messageTeamName.trim() === "") {
         errors.teamName = "Team Name is required";
      }

      setFormErrors(errors);

      return errors;
   };

   const handleRoleChange = (e) => {
      setRole(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
         // Form has errors, prevent form submission
         setFormErrors(validationErrors);
         return;
      }
      const newMessageData = {
         name: messageUserName,
         subjectLine: messageSubject,
         description: messageSummary,
         teamName: messageTeamName,
         teamEmail: messageEmail,
         leagueId: id
      };
      console.log(newMessageData);
      dispatch(addMessage(newMessageData));
      setMessageUserName("");
      setMessageSubject("");
      setMessageSummary("");
      setMessageTeamName("");
      setMessageEmail("");
   };

   const renderForm = () => {
      if (role === "player") {
         return (
            <div>
               <label>Player Name</label>
               <input type="text" name="playerName" />
               {/* Any other player specific fields */}
            </div>
         );
      } else if (role === "team") {
         return (
            <section className="vh100">
               <div className="container py-5">
                  <form onSubmit={handleSubmit}>
                     <div className="card">
                        <div className="card-header text-center mt-3 mb-2">
                           <img src={league?.logo} alt="leagueLogo" className="create-team-leagueLogo" />
                           <h4 className="mt-2">Request Form</h4>
                           <p className="fst-italic">This league manager must approve your application</p>
                        </div>
                        <div className="card-body justify-content-center align-items-center">
                           <div className="row">
                              <div className="row">
                                 <div className="col">
                                    <label htmlFor="name" className="form-label">
                                       Name
                                    </label>
                                    <input
                                       className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                                       id="name"
                                       value={messageUserName}
                                       onChange={(e) => setMessageUserName(e.target.value)}
                                       placeholder="Your name"
                                    />
                                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                                 </div>
                                 <div className="col">
                                    <label htmlFor="teamName" className="form-label">
                                       Team Name
                                    </label>
                                    <input
                                       className={`form-control ${formErrors.teamName ? "is-invalid" : ""}`}
                                       id="name"
                                       value={messageTeamName}
                                       onChange={(e) => setMessageTeamName(e.target.value)}
                                       placeholder="Team Name"
                                    />
                                    {formErrors.teamName && (
                                       <div className="invalid-feedback">{formErrors.teamName}</div>
                                    )}
                                 </div>

                                 <div className="col-12">
                                    <label htmlFor="email" className="form-label mt-3">
                                       Contact Email
                                    </label>
                                    <input
                                       className={`form-control mb-2 ${formErrors.email ? "is-invalid" : ""}`}
                                       type="email"
                                       id="email"
                                       value={messageEmail}
                                       onChange={(e) => setMessageEmail(e.target.value)}
                                    />
                                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                 </div>
                              </div>
                           </div>
                           <div className="col-12">
                              <label htmlFor="subject" className="form-label mt-3">
                                 Subject
                              </label>
                              <input
                                 className="form-control"
                                 id="subject"
                                 value={messageSubject}
                                 onChange={(e) => setMessageSubject(e.target.value)}
                                 placeholder="Subject"
                              />
                              <div className="col-12">
                                 <label htmlFor="summary" className="form-label mt-3">
                                    Please provide a brief summary of your team
                                 </label>
                                 <textarea
                                    className="form-control"
                                    id="summary"
                                    value={messageSummary}
                                    rows="3"
                                    onChange={(e) => setMessageSummary(e.target.value)}></textarea>
                              </div>
                           </div>
                           <div className="text-center mt-4">
                              <button className="btn btn-outline-secondary">Submit</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </section>
         );
      }
   };

   const renderRoleSelection = () => {
      if (role === "") {
         return (
            <div>
               <label className="fs-4 mb-2">Please select your role</label>
               <br />
               <select className="form-select" value={role} onChange={handleRoleChange}>
                  <option selected>Select...</option>
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
