import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Standings from "./Standings";
import Roster from "./Roster";
import Sidebar from "./Sidebar";
import Matches from "./Matches";
import Announcements from "./Announcements";
import RightNav from "./RightNav";
import TeamStats from './TeamStats';
import Newsfeed from "./Newsfeed";

const Team = () => {
   const { id } = useParams();
   const auth = useSelector(state => state.auth);
   const [currentComponent, setCurrentComponent] = useState("Newsfeed");
   const [activeTab, setActiveTab] = useState("Newsfeed");
   const today = new Date();
   const teams = useSelector((state) => state.teams.teamsList);
   const leagues = useSelector((state) => state.leagues.leaguesList);
  
   const team = teams.find((team) => team.id == id);
   const league = leagues.find(league => league.id == team?.leagueId);
   console.log(team)
   

   const handleClick = (componentAndTab) => {
      setCurrentComponent(componentAndTab);
      setActiveTab(componentAndTab);
   };

   if (!team || !id) {
      return <div>loading</div>;
   }
   const posts = team.posts;
   
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
                           <img src={team.logo} width="70" height="60" alt="Image" />
                        </div>
                        <div className="head-left-content">
                           <h2>{team.name}</h2>
                           <i>{league.name}</i>
                        </div>
                     </div>
                     <div className="head-right">
                        {auth && (<Link className="link" to={`/league/${id}/request`}>Request to Join</Link>)}
                     </div>
                  </div>
                  <section className="head__about">
                     <div className="head__about-title">
                        <h5>About us</h5>
                     </div>
                     <article className="head__about-content">
                        {team.description}
                     </article>
                  </section>
                  <div className="league-navbar">
                     <ul className="league--navbar-items">
                        <a onClick={() => handleClick("Stats")} className={activeTab === "Stats" ? "active" : ""}>
                           Stats
                        </a>
                        <a onClick={() => handleClick("Announcements")} className={activeTab === "Announcements" ? "active" : ""}>
                           Announcements
                        </a>
                        <a onClick={() => handleClick("Newsfeed")} className={activeTab === "Newsfeed" ? "active" : ""}>
                           Newsfeed
                        </a>
                     </ul>
                  </div>
               </div>
               <div className="league__content">
                  <div className="league__content--body">
                     {currentComponent === "Stats" && <TeamStats team={team}/>}
                     {currentComponent === "Announcements" && <Announcements />}
                     {currentComponent === "Newsfeed" && <Newsfeed posts={posts} team={team}/>}
                  </div>
               </div>
            </div>
            {/* <TestMatch /> */}
         </div>
         <RightNav />
      </div>
      // Previous verion from 7/16
      // <div className="league-container">
      //    <div className="sidebar">
      //       <Sidebar />
      //    </div>
      //    <div className="league-main">
      //       <div className="league-main-upper">
      //          <div className="league-head">
      //             <img src={window.location.origin + `${team.logo}`} width="70" height="60" alt="Image" />
      //             <h2>{team.name}</h2>
      //             {/* <p>{league.season}</p> */}
      //          </div>
      //          <div className="league-navbar">
      //             <ul className="league--navbar-items">
      //                <a
      //                   onClick={() => handleClick("Announcements")}
      //                   className={activeTab === "Announcements" ? "active" : ""}>
      //                   Announcements
      //                </a>
      //                <a onClick={() => handleClick("Stats")} className={activeTab === "Stats" ? "active" : ""}>
      //                   Stats
      //                </a>
      //                <a onClick={() => handleClick("Newsfeed")} className={activeTab === "Newsfeed" ? "active" : ""}>
      //                   Newsfeed
      //                </a>
      //                <a onClick={() => handleClick("About")} className={activeTab === "About" ? "active" : ""}>
      //                   About
      //                </a>
      //                <a onClick={() => handleClick("Chat")} className={activeTab === "Chat" ? "active" : ""}>
      //                   Chat
      //                </a>
      //             </ul>
      //             <div className="team__content">
      //                <div className="league__content--body">
      //                   {currentComponent === "Announcements" && <Announcements />}
      //                   {currentComponent === "Stats" && <TeamStats team={team}/>}
      //                   {currentComponent === "Newsfeed" && "Newsfeed coming soon"}
      //                   {currentComponent === "About" && "About coming soon"}
      //                   {currentComponent === "Chat" && "Chat coming soon"}
      //                </div>
      //             </div>
      //          </div>
      //       </div>
      //    </div>
      //    <RightNav />
      // </div>
      // <div className='team__container'>
      //     <div className="team__header">
      //         <div className="team__header-image">
      //         <img src={window.location.origin + `${team.logo}`} width="170" height="160" alt="Image"/>
      //         </div>
      //         <div className="team__header-info">
      //             <h5>{team.name}</h5>
      //             <p>id: {team.id}</p>
      //             <p>{team.email}</p>
      //             <i>league in progress</i>
      //         </div>
      //     </div>
      //     <div className='team__content'>
      //         <div className="team__content-nav">
      //             <ul>
      //                 <li><button onClick={() => handleClick('Standings') } className={activeTab === 'Standings' ? 'active' : ''}>Standings</button></li>
      //                 <li><button onClick={() => handleClick('Roster')} className={activeTab === 'Roster' ? 'active' : ''}>Roster</button></li>
      //                 <li><button onClick={() => handleClick('Schedule')} className={activeTab === 'Schedule' ? 'active' : ''}>Schedule</button></li>
      //                 <li><button onClick={() => handleClick('Stats')} className={activeTab === 'Stats' ? 'active' : ''}>Stats</button></li>
      //                 <li><button onClick={() => handleClick('News Feed')} className={activeTab === 'News Feed' ? 'active' : ''}>News Feed</button></li>
      //                 <li><button onClick={() => handleClick('Media')} className={activeTab === 'Media' ? 'active' : ''}>Media</button></li>
      //                 <li><button onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''}>About</button></li>
      //                 <li>Manage Team</li>
      //             </ul>
      //         </div>
      //         <div className="team__content-body">
      //             {currentComponent === "Standings" && <Standings id={team.leagueId} />}
      //             {currentComponent === "Roster" && <Roster users={team.users}/>}
      //             {currentComponent === "Schedule" && "coming soon"}
      //             {currentComponent === "Stats" && "coming soon"}
      //             {currentComponent === "News Feed" && "coming soon"}
      //             {currentComponent === "Media" && "coming soon"}
      //             {currentComponent === "About" && "coming soon"}
      //         </div>
      //     </div>
      // </div>
   );
};

export default Team;
