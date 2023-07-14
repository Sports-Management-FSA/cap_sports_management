import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam } from "../store";
import { useParams } from "react-router-dom";
import validator from "validator";

const CreateTeam = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));
   const users = useSelector((state) => state);
   const fileInputRef = useRef(null);

   console.log(users);

   const [teamName, setTeamName] = useState("");
   const [teamEmail, setTeamEmail] = useState("");
   const [teamDescription, setTeamDescription] = useState("");
   const [teamLogo, setTeamLogo] = useState("");
   const [previewLogo, setPreviewLogo] = useState("");
   const [formErrors, setFormErrors] = useState("");

   const handleTeamNameChange = (e) => setTeamName(e.target.value);
   const handleTeamEmailChange = (e) => setTeamEmail(e.target.value);
   const handleTeamDescriptionChange = (e) => setTeamDescription(e.target.value);

   // Logo Upload Function
   const handleUploadButtonClick = () => fileInputRef.current.click();
   const handleFileInputChange = (event) => {
      if (event.target && event.target.files.length > 0) {
         const file = event.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("load", () => {
            setTeamLogo(reader.result);
            setPreviewLogo(reader.result);
         });
      }
   };

   // Validate Functions
   const validateTeamName = (name) => {
      if (name.trim() === "") {
         return "Name is required";
      } else {
         if (league && league.teams.some((team) => team.name === name)) {
            return "Team name already exists";
         }
      }
      return "";
   };
   const validateEmail = (email) => {
      if (!validator.isEmail(email)) {
         return "Invalid email format";
      }
      return "";
   };

   const validateForm = () => {
      const errors = {};
      errors.teamName = validateTeamName(teamName);
      errors.email = validateEmail(teamEmail);
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

      const newTeamData = {
         name: teamName,
         email: teamEmail,
         leagueId: id,
         logo: teamLogo,
         description: teamDescription
      };
      dispatch(addTeam(newTeamData));
      setTeamName("");
      setTeamEmail("");
      setTeamLogo("");
      setTeamDescription("");
      navigate(`/home`);
   };

   return (
      <div className="container create-team-form p-5">
         <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center opacity-90 vh-100">
               <div className="col-11">
                  <div className="card create-team-card">
                     <h1 className="text-center mt-4 text-uppercase">Create Team</h1>
                     <p className="mb-3 create-team-title text-center">Assemble Your Winning Team Today!</p>
                     <div className="row-col-2 d-flex justify-content-center"></div>
                     <hr />
                     <div className="card-body">
                        <div className="row justify-content-around">
                           <div className="col-lg-6 col-sm-5 my-auto text-center">
                              <img
                                 className="rounded-circle mb-2 league-logo"
                                 src={previewLogo || "static/images/camera.svg"}
                                 alt="teamLogo"
                              />
                              <div className="small font-italic text-muted mb-3">JPG or PNG no larger than 5 MB</div>
                              <button
                                 className="btn btn-outline-secondary"
                                 type="button"
                                 onClick={handleUploadButtonClick}>
                                 Upload
                              </button>
                              <input
                                 type="file"
                                 id="uploadInput"
                                 className="d-none"
                                 ref={fileInputRef}
                                 onChange={handleFileInputChange}
                              />
                           </div>
                           <div className="col-lg-4 col-sm-7">
                              <label htmlFor="teamName" className="form-label text-dark mt-2">
                                 Team Name
                              </label>
                              <input
                                 className={`form-control ${formErrors.teamName ? "is-invalid" : ""}`}
                                 type="text"
                                 id="teamName"
                                 value={teamName}
                                 onChange={handleTeamNameChange}
                              />
                              {formErrors && <div className="invalid-feedback">{formErrors.teamName}</div>}
                              <label htmlFor="email" className="form-label text-dark mt-2">
                                 Contact Email
                              </label>
                              <input
                                 className={`form-control ${formErrors.teamEmail ? "is-invalid" : ""}`}
                                 type="email"
                                 id="email"
                                 value={teamEmail}
                                 onChange={handleTeamEmailChange}
                              />
                              {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                              <label className="form-label mt-2" htmlFor="teamDescription">
                                 Team Description
                              </label>
                              <textarea
                                 className="form-control"
                                 id="teamDescription"
                                 rows="3"
                                 value={teamDescription}
                                 onChange={handleTeamDescriptionChange}></textarea>
                           </div>
                        </div>

                        <div className="row mt-3">
                           <div className="col-sm-7">
                              <h1 className="text-start ms-4 mt-4 text-uppercase">Roster</h1>
                           </div>
                           <div className="col-sm-5 d-flex justify-content-end align-items-end">
                              <input
                                 type="text"
                                 placeholder="Enter player's username or email"
                                 className="form-control me-2 add-player"
                              />
                              <button className="btn btn-outline-secondary add-player add-player-button">Add</button>
                           </div>
                        </div>
                        <div className="row">
                           <table className="table align-middle mb-0 bg-light">
                              <thead className="bg-light">
                                 <tr className="text-center">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                 </tr>
                              </thead>
                           </table>
                        </div>
                        <hr className="mt-5" />
                        <div className="text-center">
                           <button className="btn btn-outline-secondary mt-4">Create</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
};

export default CreateTeam;
