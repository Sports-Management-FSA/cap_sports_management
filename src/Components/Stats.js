import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Standings from './Standings';
import Matches from './Matches';

const Stats = () => {
    const { id } = useParams();
    const [currentComponent, setCurrentComponent] = useState('Announcements');
    const [activeTab, setActiveTab] = useState("Announcements");
    const leagues = useSelector((state) => state.leagues.leaguesList);
    const league = leagues.find((league) => league.id == id);
 
    if (!league) {
         return <div>...loading</div>;
     }
  
    const matches = league.matches;
    const teams = league.teams;
 
    const handleClick = (component) => {
       setCurrentComponent(component);
       setActiveTab(component);
    };
    return (
        <div>
            <div className="stats-main">
                <ul className="stats--navbar-items">
                    <a onClick={() => handleClick('Standings')} className={activeTab === 'Standings' ? 'active' : ''}>Standings</a>
                    <a onClick={() => handleClick('Players')} className={activeTab === 'Players' ? 'active' : ''}>Players</a>
                    <a onClick={() => handleClick('Matches')} className={activeTab === 'Matches' ? 'active' : ''} >Matches</a>
                    <a onClick={() => handleClick('Team Info')} className={activeTab === 'Team Info' ? 'active' : ''}>Teams</a>
                </ul>   
                <div className="stats-content">
                    <div className="stats-content-body">
                        {currentComponent === 'Announcements' && "Announcements coming soon"}
                        {currentComponent === 'Matches' && <Matches matches={matches} />}
                        {currentComponent === 'Standings' && <Standings teams={teams}/>}
                        {currentComponent === 'Players' && "Players Component here"}
                        {currentComponent === 'Team Info' && "Team Info Component here"}
                    </div>        
                </div>
            </div>
        </div>
    );
};

export default Stats;