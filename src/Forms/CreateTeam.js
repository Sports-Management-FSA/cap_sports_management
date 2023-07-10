import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTeam } from "../store";
import { useParams } from "react-router-dom";

const CreateTeam = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id === parseInt(id));
   const fileInputRef = useRef(null);

   const [teamName, setTeamName] = useState("");
   const [teamEmail, setTeamEmail] = useState("");
   const [teamDescription, setTeamDescription] = useState("");
   const [teamLogo, setTeamLogo] = useState("");
   const [previewLogo, setPreviewLogo] = useState("");

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

   const handleSubmit = (e) => {
      e.preventDefault();
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
      navigate(`/league/${id}`);
   };

   console.log(league);

   return (
      <section className="vh-100">
         <div className="d-flex align-items-center h-100">
            <div className="container py-5">
               <form onSubmit={handleSubmit}>
                  <div className="row d-flex justify-content-center align-items-center opacity-90 h-100">
                     <div className="col-sm-11 col-md-11 col-lg-10">
                        <div className="card create-team-card">
                           <h3 className="text-center mt-4 create-team-leagueName">{league?.name.toUpperCase()}</h3>
                           <div className="row-col-2 d-flex justify-content-center">
                              <img src={league?.logo} alt="leagueLogo" className="create-team-leagueLogo" />
                           </div>
                           <hr />
                           <div className="card-body">
                              <div className="row">
                                 <p className="mb-3 create-team-title text-center">Assemble Your Winning Team Today!</p>
                              </div>
                              <div className="row justify-content-around">
                                 <div className="col-lg-6 col-sm-5 my-auto text-center">
                                    <img
                                       className="rounded-circle mb-2 league-logo"
                                       src={previewLogo || "static/images/camera.svg"}
                                       alt="teamLogo"
                                    />
                                    <div className="small font-italic text-muted mb-3">
                                       JPG or PNG no larger than 5 MB
                                    </div>
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
                                       className="form-control mb-2"
                                       type="text"
                                       id="teamName"
                                       value={teamName}
                                       onChange={handleTeamNameChange}
                                    />
                                    <label htmlFor="email" className="form-label text-dark">
                                       Email
                                    </label>
                                    <input
                                       className="form-control mb-2"
                                       type="email"
                                       id="email"
                                       value={teamEmail}
                                       onChange={handleTeamEmailChange}
                                    />
                                    <label className="form-label" htmlFor="teamDescription">
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
                              <div className="text-center">
                                 <button className="btn btn-outline-secondary mt-4">Create</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </section>
   );
};

export default CreateTeam;
