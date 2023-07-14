import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMessage } from "../store";
import validator from "validator";

const RequestJoinPlayer = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));
   const {auth} = useSelector(state=>state);

   const [playerMessageUserName, setPlayerMessageUserName] = useState("");
   const [playerMessageTeamName, setPlayerMessageTeamName] = useState("");
   const [playerMessageEmail, setPlayerMessageEmail] = useState("");
   const [playerMessageSubject, setPlayerMessageSubject] = useState("");
   const [playerMessageSummary, setPlayerMessageSummary] = useState("");
   const [selectedTeam, setSelectedTeam] = useState('none');
   const [formErrors, setFormErrors] = useState({});

   const handleTeamChange = (e) => {
      setSelectedTeam(e.target.value);
   };

   // Validate Functions
   const validateForm = () => {
      const errors = {};

      // Validate Email
      if (playerMessageEmail.trim() === "") {
         errors.email = "Email is required";
      } else {
         if (!validator.isEmail(playerMessageEmail)) {
            errors.email = "Invalid email format";
         }
      }
      // Validate Team Name
      if (playerMessageUserName.trim() === "") {
         errors.userName = "Name is required";
      }
      setFormErrors(errors);

      return errors;
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
         name: playerMessageUserName,
         subjectLine: playerMessageSubject,
         description: playerMessageSummary,
         playerEmail: playerMessageEmail,
         leagueId: id,
         userId: auth.id,
         desiredTeam: selectedTeam
      };

      dispatch(addMessage(newMessageData));

      setPlayerMessageEmail("");
      setPlayerMessageSubject("");
      setPlayerMessageSummary("");
      setPlayerMessageTeamName("");
      setPlayerMessageUserName("");
   };
   return (
      <section className="vh-100">
         <div className="container py-5">
            <form onSubmit={handleSubmit}>
               <div className="card">
                  <div className="card-header text-center mt-3 mb-2">
                     <img src={league?.logo} alt="leagueLogo" className="create-team-leagueLogo" />
                     <h4 className="mt-2">Player Request Form</h4>
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
                                 className={`form-control ${formErrors.userName ? "is-invalid" : ""}`}
                                 id="name"
                                 value={playerMessageUserName}
                                 onChange={(e) => setPlayerMessageUserName(e.target.value)}
                                 placeholder="Your name"
                              />
                              {formErrors.userName && <div className="invalid-feedback">{formErrors.userName}</div>}
                           </div>
                           <div className="col">
                              <label htmlFor="selectedTeam" className="form-label">
                                 Desired Team
                              </label>
                              <select
                                 className="form-select"
                                 aria-label="Select Team"
                                 id="selectedTeam"
                                 value={selectedTeam}
                                 onChange={handleTeamChange}>
                                 <option value="none">None</option>
                                 {league?.teams?.map((team) => (
                                    <option value={team.name} key={team.id}>
                                       {team.name}
                                    </option>
                                 ))}
                              </select>
                           </div>

                           <div className="col-12">
                              <label htmlFor="email" className="form-label mt-3">
                                 Contact Email
                              </label>
                              <input
                                 className={`form-control mb-2 ${formErrors.email ? "is-invalid" : ""}`}
                                 type="email"
                                 id="email"
                                 value={playerMessageEmail}
                                 onChange={(e) => setPlayerMessageEmail(e.target.value)}
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
                           value={playerMessageSubject}
                           onChange={(e) => setPlayerMessageSubject(e.target.value)}
                           placeholder="Subject"
                        />
                        <div className="col-12">
                           <label htmlFor="summary" className="form-label mt-3">
                              Please provide a brief summary of yourself
                           </label>
                           <textarea
                              className="form-control"
                              id="summary"
                              value={playerMessageSummary}
                              rows="3"
                              onChange={(e) => setPlayerMessageSummary(e.target.value)}></textarea>
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

export default RequestJoinPlayer;
