import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addLeague } from "../store";
import validator from "validator";
import { fetchAllLeagues } from "../store";

const CreateLeague = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const leagues = useSelector((state) => state.leagues.leaguesList);
   const categories = useSelector((state) => state.categories.categoriesList);
   const fileInputRef = useRef(null);

   const [categoryId, setCategoryId] = useState("");
   const [leagueName, setLeagueName] = useState("");
   const [leagueSeason, setLeagueSeason] = useState("");
   const [leagueEmail, setLeagueEmail] = useState("");
   const [leagueStartDate, setleagueStartDate] = useState("");
   const [leagueEndDate, setLeagueEndDate] = useState("");
   const [leagueLogo, setLeagueLogo] = useState("");
   const [previewLogo, setPreviewLogo] = useState("");
   const [formErrors, setFormErrors] = useState({});

   const handCategoryId = (e) => setCategoryId(e.target.value);
   const handleLeagueNameChange = (e) => setLeagueName(e.target.value);
   const handleLeagueSeasonChange = (e) => setLeagueSeason(e.target.value);
   const handleLeagueEmailChange = (e) => {
      const email = e.target.value;
      setLeagueEmail(email);
   };
   const handleStartDate = (e) => setleagueStartDate(e.target.value);
   const handleEndDate = (e) => setLeagueEndDate(e.target.value);

   // Logo Upload Function
   const handleUploadButtonClick = () => fileInputRef.current.click();
   const handleFileInputChange = (event) => {
      if (event.target && event.target.files.length > 0) {
         const file = event.target.files[0];
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.addEventListener("load", () => {
            setLeagueLogo(reader.result);
            setPreviewLogo(reader.result);
         });
      }
   };

   // Validation Functions
   const validateLeagueName = (name) => {
      if (leagueName.trim() === "") {
         return "Name is required";
      } else {
         const existingLeague = leagues.find((league) => league.name === name);
         if (existingLeague) {
            return "League name already exists";
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
      errors.leagueName = validateLeagueName(leagueName);
      errors.email = validateEmail(leagueEmail);
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
      const newLeagueData = {
         name: leagueName,
         season: leagueSeason,
         email: leagueEmail,
         public: e.target.leagueAccess.value,
         startDate: leagueStartDate,
         endDate: leagueEndDate,
         logo: leagueLogo
      };
      dispatch(addLeague(newLeagueData));
      setLeagueName("");
      setLeagueSeason("");
      setLeagueEmail("");
      setLeagueLogo("");
      navigate("/");
   };

   console.log(leagues);

   return (
      <section className="vh-100">
         <div className="d-flex align-items-center h-100">
            <div className="container py-5">
               <form onSubmit={handleSubmit}>
                  <div className="row d-flex justify-content-center align-items-center opacity-90 h-100">
                     <div className="col-9">
                        <div
                           className="card"
                           style={{
                              borderRadius: "1rem",
                              backgroundColor: "#fdfffc"
                           }}>
                           <div className="card-body p-5 text-center">
                              <div>
                                 <h2 className="mb-1">Create Your League</h2>
                                 <p className="fst-italic">Get your league started now!</p>
                                 <div className="row g-3">
                                    <div className="col-6 col-xl-7 col-md-7 col-sm-9 text-start">
                                       <label htmlFor="selectCategory" className="form-label text-dark">
                                          Choose Category
                                       </label>
                                       <select
                                          className="form-select mb-2"
                                          id="selectCategory"
                                          aria-label="Categories-select"
                                          value={categoryId}
                                          onChange={handCategoryId}>
                                          <option defaultValue="Choose Category">Choose Category</option>
                                          {categories.map((category) => (
                                             <option value={category.id} key={category.id}>
                                                {category.name}
                                             </option>
                                          ))}
                                       </select>
                                       <div className="col-lg-8 col-md-7 col-xl-7 col-sm-9">
                                          <label className="text-dark mb-2">League Access</label>
                                          <div>
                                             <div className="form-check-inline">
                                                <input
                                                   className="form-check-radio"
                                                   type="radio"
                                                   name="leagueAccess"
                                                   id="leagueAccessPublic"
                                                   defaultChecked
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
                                       <input
                                          className={`form-control mb-2 ${formErrors.leagueName ? "is-invalid" : ""}`}
                                          type="text"
                                          id="leagueName"
                                          value={leagueName}
                                          onChange={handleLeagueNameChange}
                                       />
                                       {formErrors.leagueName && (
                                          <div className="invalid-feedback">{formErrors.leagueName}</div>
                                       )}
                                       <label htmlFor="email" className="form-label text-dark">
                                          Email
                                       </label>
                                       <input
                                          className={`form-control mb-2 ${formErrors.email ? "is-invalid" : ""}`}
                                          type="email"
                                          id="email"
                                          value={leagueEmail}
                                          onChange={handleLeagueEmailChange}
                                       />
                                       {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                    </div>
                                    <div className="col-6 col-xl-5 col-sm-3 col-md-5 text-center my-auto align-items-center justify-content-center">
                                       <img
                                          className="rounded-circle mb-2 league-logo"
                                          src={previewLogo || "static/images/camera.svg"}
                                          alt="leagueLogo"
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
                                 </div>
                                 <div className="row g-3 my-auto" id="league-access">
                                    <div className="col-lg-6 col-sm-12 col-md-12 text-start">
                                       <label htmlFor="seasonName" className="form-label text-dark">
                                          Season Name
                                       </label>
                                       <input
                                          className="form-control"
                                          type="text"
                                          id="seasonName"
                                          value={leagueSeason}
                                          onChange={handleLeagueSeasonChange}
                                       />
                                    </div>
                                    <div className="col-sm-6 col-lg-3 col-md-6 text-start">
                                       <label htmlFor="startDate" className="text-dark mb-2">
                                          Start
                                       </label>
                                       <input
                                          id="startDate"
                                          className="form-control"
                                          type="date"
                                          value={leagueStartDate}
                                          onChange={handleStartDate}
                                       />
                                    </div>
                                    <div className="col-sm-6 col-lg-3 col-md-6 text-start">
                                       <label htmlFor="endDate" className="text-dark mb-2">
                                          End
                                       </label>
                                       <input
                                          id="endDate"
                                          value={leagueEndDate}
                                          onChange={handleEndDate}
                                          className="form-control"
                                          type="date"
                                       />
                                    </div>
                                 </div>
                              </div>
                              <button className="btn btn-outline-secondary mt-3">Create</button>
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

export default CreateLeague;
