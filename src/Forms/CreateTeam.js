import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam, updatePlayer, fetchAllTeams } from "../store";
import { useParams } from "react-router-dom";
import validator from "validator";

const CreateTeam = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const fileInputRef = useRef(null);
   const { id } = useParams();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));
   const players = useSelector((state) => state.players.playerList);
   const teams = useSelector(state=>state.teams.teamsList);

   const [teamName, setTeamName] = useState("");
   const [teamEmail, setTeamEmail] = useState("");
   const [teamDescription, setTeamDescription] = useState("");
   const [teamLogo, setTeamLogo] = useState("");
   const [previewLogo, setPreviewLogo] = useState("");
   const [formErrors, setFormErrors] = useState("");
   const [playerInput, setPlayerInput] = useState("");
   const [playerEmailError, setPlayerEmailError] = useState("");
   const [addedPlayers, setAddedPlayers] = useState([]);

   useEffect(()=>{
      dispatch(fetchAllTeams());
   }, [dispatch])

   const handleTeamNameChange = (e) => setTeamName(e.target.value);
   const handleTeamEmailChange = (e) => setTeamEmail(e.target.value);
   const handleTeamDescriptionChange = (e) => setTeamDescription(e.target.value);
   const handlePlayerInputChange = (e) => setPlayerInput(e.target.value);
   const handleRemovePlayer = (email) => {
      const updatedPlayers = addedPlayers.filter((player) => player.email !== email);
      setAddedPlayers(updatedPlayers);
   };

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

   const handleSubmit = async(e) => {
      e.preventDefault();
      console.log('making it in here')
      const validationErrors = validateForm();
      //validation causing errors, even when all reqs are met won't allow submission
      //if (Object.keys(validationErrors).length > 0) {
         // Form has errors, prevent form submission
        // setFormErrors(validationErrors);
        // return;
     // }

      const newTeamData = {
         name: teamName,
         email: teamEmail,
         leagueId: id,
         logo: teamLogo,
         description: teamDescription
      };
      await dispatch(addTeam(newTeamData));
 
      setTeamEmail("");
      setTeamLogo("");
      setTeamDescription("");
      
      addRoles();
      
   };

   const addRoles = () =>{
      console.log(teams)
      const team = teams.find(team=>team.name == teamName);
      const role = {teamId: team.id, teamRoleId: 1}
      addedPlayers.forEach(dispatch(updatePlayer(role)))
      setTeamName("");
      navigate(`/home`);
   }

   const handleAddPlayer = (ev) => {
      ev.preventDefault();
      const emails = players.map((player) => player.email);

      if (emails.includes(playerInput)) {
         // Player email exists, add player to the table
         const player = players.find((player) => player.email === playerInput);

         setAddedPlayers([...addedPlayers, player]);
         setPlayerInput("");
         setPlayerEmailError("");
      } else {
         // Player email does not exist, set the error message
         setPlayerEmailError("Player not found");
      }
   };

   return (
      <div className="container create-team-form p-5" style={{ backgroundColor: "#112222" }}>
         <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center opacity-90 vh-100">
               <div className="col-11">
                  <div
                     className="card create-team-card"
                     style={{
                        backgroundColor: "#2a5262"
                     }}>
                     <h1 className="text-center text-light mt-4 text-uppercase">Create Team</h1>
                     <p className="mb-3 create-team-title text-center text-light">Assemble Your Winning Team Today!</p>
                     <div className="row-col-2 d-flex justify-content-center"></div>
                     <hr className="text-white" />
                     <div className="card-body">
                        <div className="row justify-content-around">
                           <div className="col-lg-6 col-sm-5 my-auto text-center">
                              <img
                                 className="rounded-circle mb-2 league-logo"
                                 src={previewLogo || "static/images/camera.svg"}
                                 alt="teamLogo"
                              />
                              <div className="small font-italic text-light mb-3">JPG or PNG no larger than 5 MB</div>
                              <button className="btn btn-light" type="button" onClick={handleUploadButtonClick}>
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
                              <label htmlFor="teamName" className="form-label text-light mt-2">
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
                              <label htmlFor="email" className="form-label text-light mt-2">
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
                              <label className="form-label mt-2 text-light" htmlFor="teamDescription">
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
                           <div className="col-sm-4">
                              <h2 className="text-start text-light ms-4 mt-4 text-uppercase">Invite Players</h2>
                           </div>
                           <div className="col-sm-8 d-flex justify-content-end align-items-end">
                              <div className="position-relative">
                                 <div className="d-flex">
                                    <input
                                       className={`form-control me-2 add-player ${
                                          playerEmailError ? "is-invalid" : ""
                                       }`}
                                       type="text"
                                       placeholder="Enter player's email"
                                       value={playerInput}
                                       onChange={handlePlayerInputChange}
                                    />
                                    <button className="btn btn-light add-player-button" onClick={handleAddPlayer}>
                                       Add
                                    </button>
                                    {playerEmailError && <div className="invalid-tooltip">{playerEmailError}</div>}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           {addedPlayers.length > 0 ? (
                              <table className="table align-middle mb-0 bg-light">
                                 <thead className="bg-light">
                                    <tr className="text-center">
                                       <th>Name</th>
                                       <th>Email</th>
                                       <th>Action</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {addedPlayers.map((player) => (
                                       <tr key={player.email} className="text-center">
                                          <td>{`${
                                             player.firstName.slice(0, 1).toUpperCase() + player.firstName.slice(1)
                                          } ${
                                             player.lastName.slice(0, 1).toUpperCase() + player.lastName.slice(1)
                                          }`}</td>
                                          <td>{player.email}</td>
                                          <td>
                                             <i
                                                className="bi bi-x-circle"
                                                role="button"
                                                onClick={() => handleRemovePlayer(player.email)}></i>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           ) : (
                              <p className="text-center text-light mt-5">No players added yet.</p>
                           )}
                        </div>
                        <hr className="mt-5" />
                        <div className="text-center">
//                            <button className="btn btn-light mt-4">Create</button>
                           <input type="submit" className="btn btn-light mt-4" value="Create"/>
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
