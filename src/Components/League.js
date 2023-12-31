import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import Matches from "./Matches";
import Standings from "./Standings";
import Sidebar from "./Sidebar";
import RightNav from "./RightNav";
import Announcements from "./Announcements";
import Stats from "./Stats";
import TeamInfo from "./TeamInfo";
import Newsfeed from "./Newsfeed";
import TestMatch from "./testMatch";

const League = () => {
   const { id } = useParams();
   const auth = useSelector(state => state.auth.id);
   const navigate = useNavigate();
   const [currentComponent, setCurrentComponent] = useState("Stats");
   const [activeTab, setActiveTab] = useState("Stats");

   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id == id);
   const today = new Date();

   // if (!league) {
   //    return navigate("/notfound");
   // }

   const matches = league?.matches;
   const teams = league?.teams;

   const posts = league?.posts;

   const upcomingMatch = matches?.find((match) => {
      const matchDate = new Date(match.date);
      return matchDate > today;
   });

   const handleClick = (component) => {
      setCurrentComponent(component);
      setActiveTab(component);
   };

   // console.log(league);

   return (
      <div className="league-container">
         <div className="sidebar">
            <Sidebar />
         </div>
         <div className="league-main">
            <div className="league-main-upper">
               <div className="league-main-upperbox">
                  <div className="league-head">
                     <div className="head-left">
                        <div className="head-left-img">
                           <img src={league?.logo} alt="Image" /> 
                           {/* before was this width="70" height="60" */}
                        </div>
                        <div className="head-left-content">
                           <h2>{league?.name}</h2>
                           <p>{league?.season}</p>
                        </div>
                     </div>
                     <div className="head-right">
                        {auth && (<Link className="head-request" to={`/league/${id}/request`}>Request to Join</Link>)}
                     </div>
                  </div>
                  <section className="head__about">
                     <div className="head__about-title">
                        <h5>About us</h5>
                     </div>
                     <article className="head__about-content">
                        {league?.description}
                     
                     </article>
                  </section>
                  <div className="league-navbar">
                     <ul className="league--navbar-items">
                        <a onClick={() => handleClick("Announcements")} className={activeTab === "Announcements" ? "active" : ""}>
                           Announcements
                        </a>
                        <a onClick={() => handleClick("Stats")} className={activeTab === "Stats" ? "active" : ""}>
                           Stats
                        </a>
                        <a onClick={() => handleClick("Newsfeed")} className={activeTab === "Newsfeed" ? "active" : ""}>
                           Newsfeed
                        </a>
                        
                     </ul>
                  </div>
               </div>
               <div className="league__content">
                  <div className="league__content--body">
                     {currentComponent === "Announcements" && <Announcements />}
                     {currentComponent === "Stats" && <Stats />}
                     {currentComponent === "Newsfeed" && <Newsfeed posts={posts} league={league}/>}
                     
                  </div>
               </div>
            </div>
            {/* <TestMatch /> */}
         </div>
         <RightNav />
      </div>
   );
};

export default League;
