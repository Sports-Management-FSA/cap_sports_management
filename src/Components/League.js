import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Matches from "./Matches";
import Standings from "./Standings";
import Sidebar from "./Sidebar";
import RightNav from "./RightNav";
import Announcements from "./Announcements";
import Stats from "./Stats";
import TeamInfo from "./TeamInfo";
import Newsfeed from "./Newsfeed";


const League = () => {
   const { id } = useParams();
   const [currentComponent, setCurrentComponent] = useState('Announcements');
   const [activeTab, setActiveTab] = useState("Announcements");
   const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

   const leagues = useSelector((state) => state.leagues.leaguesList);
   const league = leagues.find((league) => league.id == id);
   const today = new Date();
   

   if (!league) {
        return <div>...loading</div>;
    }
 
   const matches = league.matches;
   const teams = league.teams;

   const upcomingMatch = matches.find((match) => {
       const matchDate = new Date(match.date);
       return matchDate > today;
    });


   const handleClick = (component) => {
      setCurrentComponent(component);
      setActiveTab(component);
   };

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
                                    <img src={window.location.origin + `${league.logo}`} width="70" height="60" alt="Image"/>
                                </div>
                                <div className="head-left-content">
                                    <h2>{league.name}</h2>
                                    <p>{league.season}</p>                                
                                </div>
                            </div>
                            <div className="head-right">
                            <Link to={`/league/${id}/request`}
                                className="open-modal-button"
                                onClick={openModal}
                            >Request to Join</Link>
                            </div>
                        </div>
                        <div className="league-navbar">
                            <ul className="league--navbar-items">
                                <a onClick={() => handleClick('Announcements')} className={activeTab === 'Announcements' ? 'active' : ''}>Announcements</a>
                                <a onClick={() => handleClick('Stats')} className={activeTab === 'Stats' ? 'active' : ''}>Stats</a>
                                <a onClick={() => handleClick('Newsfeed')} className={activeTab === 'Newsfeed' ? 'active' : ''}>Newsfeed</a>
                                <a onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''}>About</a>
                                <a onClick={() => handleClick('Chat')} className={activeTab === 'Chat' ? 'active' : ''}>Chat</a>
                            </ul>
                        </div>
                    </div>
                    <div className="league__content">
                        <div className="league__content--body">
                            {currentComponent === 'Announcements' && <Announcements />}
                            {currentComponent === 'Stats' && <Stats />}
                            {currentComponent === 'Newsfeed' && <Newsfeed />}
                            {currentComponent === 'About' && "About coming soon"}
                            {currentComponent === 'Chat' && "Chat coming soon"}
                        </div>        
                    </div>   
                </div>
            </div>
            <RightNav />
            {/* <div className="league__head">
                <img src={window.location.origin + `${league.logo}`} width="70" height="60" alt="Image"/>
                <h2>{league.name}</h2>
                <h5>{league.season}</h5>
            </div>
            <div className="league__container-main">
                <ul className="league--sidebar">
                    <li><button onClick={() => handleClick('Announcements')} className={activeTab === 'Announcements' ? 'active' : ''}>Announcements</button></li>
                    <li><button onClick={() => handleClick('Players')} className={activeTab === 'Players' ? 'active' : ''}>Players</button></li>
                    <li><button onClick={() => handleClick('Standings')} className={activeTab === 'Standings' ? 'active' : ''}>Standings</button></li>
                    <li><button onClick={() => handleClick('Matches')} className={activeTab === 'Matches' ? 'active' : ''} >Matches</button></li>
                    <li><button onClick={() => handleClick('Team Info')} className={activeTab === 'Team Info' ? 'active' : ''}>Teams</button></li>
                    <li><button onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''}>About</button></li>
                </ul>   
                <div className="league__content">
                    <div className="league__content--body">
                        {currentComponent === 'Announcements' && "Announcements coming soon"}
                        {currentComponent === 'Matches' && <Matches matches={matches} />}
                        {currentComponent === 'Standings' && <Standings teams={teams}/>}
                        {currentComponent === 'Players' && "Players Component here"}
                        {currentComponent === 'Team Info' && <TeamInfo teams={teams}/>}
                    </div>        
                </div>
            </div> */}
         </div>
   );
};

export default League;
