import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../store";
import validator from "validator";

const RequestJoinTeam = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));

   const [teamMessageUserName, setTeamMessageUserName] = useState("");
   const [teamMessageTeamName, setTeamMessageTeamName] = useState("");
   const [teamMessageEmail, setTeamMessageEmail] = useState("");
   const [teamMessageSubject, setTeamMessageSubject] = useState("");
   const [teamMessageSummary, setTeamMessageSummary] = useState("");
   const [formErrors, setFormErrors] = useState({});

   // Validate Functions
   const validateForm = () => {
      const errors = {};

      // Validate Email
      if (!validator.isEmail(teamMessageEmail)) {
         errors.teamEmail = "Invalid email format";
      }

      // Validate User Name
      if (teamMessageUserName.trim() === "") {
         errors.teamUserName = "Name is required";
      }

      // Validate Team Name
      if (teamMessageTeamName.trim() === "") {
         errors.teamName = "Team Name is required";
      } else {
         if (league && league.teams.some((team) => team.name === teamMessageTeamName)) {
            errors.teamName = "Team name already exists";
         }
      }
      setFormErrors(errors);

      return errors;
   };

   const handleTeamSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validateForm();

      if (Object.keys(validationErrors).length > 0) {
         // Form has errors, prevent form submission
         setFormErrors(validationErrors);
         return;
      }

      const newMessageData = {
         name: teamMessageUserName,
         subjectLine: teamMessageSubject,
         description: teamMessageSummary,
         teamName: teamMessageTeamName,
         teamEmail: teamMessageEmail,
         leagueId: id
      };

      console.log(newMessageData);
      dispatch(addMessage(newMessageData));
      setTeamMessageEmail("");
      setTeamMessageSubject("");
      setTeamMessageSummary("");
      setTeamMessageTeamName("");
      setTeamMessageUserName("");
   };

   return (
      <section className="vh100">
         <div className="container py-5">
            <form onSubmit={handleTeamSubmit}>
               <div className="card">
                  <div className="card-header text-center mt-3 mb-2">
                     <img src={league?.logo} alt="leagueLogo" className="create-team-leagueLogo" />
                     <h4 className="mt-2">Team Request Form</h4>
                     <p className="fst-italic text-dark request-form-paragraph">
                        This league manager must approve your application
                     </p>
                  </div>
                  <div className="card-body justify-content-center align-items-center">
                     <div className="row">
                        <div className="row">
                           <div className="col">
                              <label htmlFor="name" className="form-label">
                                 Name
                              </label>
                              <input
                                 className={`form-control ${formErrors.teamUserName ? "is-invalid" : ""}`}
                                 id="name"
                                 value={teamMessageUserName}
                                 onChange={(e) => setTeamMessageUserName(e.target.value)}
                                 placeholder="Your name"
                              />
                              {formErrors.teamUserName && (
                                 <div className="invalid-feedback">{formErrors.teamUserName}</div>
                              )}
                           </div>
                           <div className="col">
                              <label htmlFor="teamName" className="form-label">
                                 Team Name
                              </label>
                              <input
                                 className={`form-control ${formErrors.teamName ? "is-invalid" : ""}`}
                                 id="teamName"
                                 value={teamMessageTeamName}
                                 onChange={(e) => setTeamMessageTeamName(e.target.value)}
                                 placeholder="Team Name"
                              />
                              {formErrors.teamName && <div className="invalid-feedback">{formErrors.teamName}</div>}
                           </div>

                           <div className="col-12">
                              <label htmlFor="email" className="form-label mt-3">
                                 Contact Email
                              </label>
                              <input
                                 className={`form-control mb-2 ${formErrors.email ? "is-invalid" : ""}`}
                                 type="email"
                                 id="email"
                                 value={teamMessageEmail}
                                 onChange={(e) => setTeamMessageEmail(e.target.value)}
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
                           value={teamMessageSubject}
                           onChange={(e) => setTeamMessageSubject(e.target.value)}
                           placeholder="Subject"
                        />
                        <div className="col-12">
                           <label htmlFor="summary" className="form-label mt-3">
                              Please provide a brief summary of your team
                           </label>
                           <textarea
                              className="form-control"
                              id="summary"
                              value={teamMessageSummary}
                              rows="3"
                              onChange={(e) => setTeamMessageSummary(e.target.value)}></textarea>
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
};

export default RequestJoinTeam;
