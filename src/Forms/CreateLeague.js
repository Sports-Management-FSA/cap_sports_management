import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addLeague } from "../store";

const CreateLeague = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const categories = useSelector((state) => state.categories.categoriesList);

   const [leagueName, setLeagueName] = useState("");
   const [leagueSeason, setLeagueSeason] = useState("");
   const [leagueEmail, setLeagueEmail] = useState("");

   const handleLeagueNameChange = (e) => setLeagueName(e.target.value);
   const handleLeagueSeasonChange = (e) => setLeagueSeason(e.target.value);
   const handleLeagueEmailChange = (e) => setLeagueEmail(e.target.value);

   const handleSubmit = (e) => {
      e.preventDefault();
      const newLeagueData = {
         name: leagueName,
         season: leagueSeason,
         email: leagueEmail,
         public: e.target.visibility.value
      };
      console.log(newLeagueData);
      dispatch(addLeague(newLeagueData));
      setLeagueName("");
      setLeagueSeason("");
      setLeagueEmail("");
      navigate("/");
   };
   console.log(categories);

   return (
      <section className="vh-100">
         <div className="d-flex align-items-center h-100 py-5">
            <div className="container py-5">
               <form onSubmit={handleSubmit}>
                  <div className="row d-flex justify-content-center align-items-center opacity-90 h-100">
                     <div className="col-10 col-md-8 col-lg-6 col-xl-8">
                        <div
                           className="card"
                           style={{
                              borderRadius: "1rem",
                              backgroundColor: "#fdfffc"
                           }}>
                           <div className="card-body p-5 text-center">
                              <div className="mb-md-5 mt-md-4 pb-5">
                                 <h2 className="mb-1">Create Your League</h2>
                                 <p className="fst-italic">Get your league started now!</p>
                                 <div className="row g-3">
                                    <div className="col-6 text-start">
                                       <label htmlFor="selectCategory" className="form-label text-dark">
                                          Choose Category
                                       </label>
                                       <select
                                          className="form-select mb-2"
                                          id="selectCategory"
                                          aria-label="Categories-select">
                                          <option selected>Choose Category</option>
                                       </select>
                                       <div className="col-12">
                                          <label className="text-dark mb-2">League Access</label>
                                          <div>
                                             <div className="form-check-inline">
                                                <input
                                                   className="form-check-radio"
                                                   type="radio"
                                                   name="leagueAccess"
                                                   id="leagueAccessPublic"
                                                   checked
                                                />
                                                <label
                                                   className="form-check-label text-dark"
                                                   htmlFor="leagueAccessPublic">
                                                   Public
                                                </label>
                                             </div>
                                             <div className="form-check-inline">
                                                <input
                                                   className="form-check-radio"
                                                   type="radio"
                                                   name="leagueAccess"
                                                   id="leagueAccessPrivate"
                                                />
                                                <label
                                                   className="form-check-label text-dark"
                                                   htmlFor="leagueAccessPrivate">
                                                   Private
                                                </label>
                                             </div>
                                             <div className="form-check-inline">
                                                <input
                                                   className="form-check-radio"
                                                   type="radio"
                                                   name="leagueAccess"
                                                   id="leagueAccessOther"
                                                />
                                                <label
                                                   className="form-check-label text-dark"
                                                   htmlFor="leagueAccessOther">
                                                   Other
                                                </label>
                                             </div>
                                          </div>
                                       </div>
                                       <label htmlFor="leageName" className="form-label text-dark mt-2">
                                          League Name
                                       </label>
                                       <input className="form-control mb-2" type="text" id="leagueName" />
                                       <label htmlFor="email" className="form-label text-dark">
                                          Email
                                       </label>
                                       <input className="form-control mb-2" type="email" id="email" />
                                    </div>
                                    <div className="col-6 text-center my-auto">
                                       <img
                                          class="rounded-circle mb-2 league-logo"
                                          src="static/images/camera.svg"
                                          alt="leagueLogo"
                                       />
                                       <div className="small font-italic text-muted mb-3">
                                          JPG or PNG no larger than 5 MB
                                       </div>
                                       <button className="btn btn-outline-secondary" type="button">
                                          Upload logo
                                       </button>
                                    </div>
                                 </div>
                                 <div className="row g-3 my-auto">
                                    <div className="col-lg-6 col-sm-12 text-start">
                                       <label htmlFor="seasonName" className="form-label text-dark">
                                          Season Name
                                       </label>
                                       <input className="form-control" type="text" id="seasonName" />
                                    </div>
                                    <div className="col-sm-6 col-lg-3 text-start">
                                       <label htmlFor="startDate" className="text-dark mb-2">
                                          Start
                                       </label>
                                       <input id="startDate" className="form-control" type="date" />
                                    </div>
                                    <div className="col-sm-6 col-lg-3 text-start">
                                       <label htmlFor="endDate" className="text-dark mb-2">
                                          End
                                       </label>
                                       <input id="endDate" className="form-control" type="date" />
                                    </div>
                                    <div className="row g-3 my-auto"></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </section>
      //   <section className="vh-100">
      //      <div className="mask d-flex align-items-center h-100 py-5">
      //         <div className="container py-5">
      //            <form onSubmit={handleSubmit}>
      //               <h1 className="display-4 fw-bold">Create your league</h1>
      //               <label>League Name</label>
      //               <input name="leageName" value={leagueName} onChange={handleLeagueNameChange} />
      //               <label>Season</label>
      //               <input name="leagueSeason" value={leagueSeason} onChange={handleLeagueSeasonChange} />
      //               <label>Email</label>
      //               <input name="leagueEmail" value={leagueEmail} onChange={handleLeagueEmailChange} />
      //               <p>Visibility</p>
      //               <fieldset data-role="controlgroup fieldcontain" data-type="horizontal">
      //                  <input type="radio" name="visibility" value="true" />  <label htmlFor="public">Public </label>
      //                  <input type="radio" name="visibility" value="false" />  <label htmlFor="private">Private </label>
      //               </fieldset>
      //               <button type="submit">Submit</button>
      //            </form>
      //         </div>
      //      </div>
      //   </section>
   );
};

export default CreateLeague;
