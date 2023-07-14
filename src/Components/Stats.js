import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Standings from './Standings';
import Matches from './Matches';
import Announcements from './Announcements';
import Roster from './Roster';
import Players from './Players';
import Teams from './Teams';

const Stats = (props) => {
    const {type} = props;
    const { id } = useParams();
    const [currentComponent, setCurrentComponent] = useState('Standings');
    const [activeTab, setActiveTab] = useState("Standings");
    const leagues = useSelector((state) => state.leagues.leaguesList);
    const league = leagues.find((league) => league.id == id);
 
    if (!league) {
         return <div>...loading</div>;
     }

    const matches = league.matches;
    const teams = league.teams;
    const players = [];
    teams.forEach(team=> players.push(...team.user_teamRoles.filter(player=>(player.teamRole.name == 'player'))));

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
                    <a onClick={() => handleClick('Teams')} className={activeTab === 'Teams' ? 'active' : ''}>Teams</a>
                </ul>   
                <div className="stats-content">
                    <div className="stats-content-body">
                        {currentComponent === 'Matches' && <Matches matches={matches} />}
                        {currentComponent === 'Standings' && <Standings teams={teams}/>}
                        {currentComponent === 'Players' && <Players players={players} teams={teams}/>}
                        {currentComponent === 'Teams' && <Teams teams={teams}/>}
                    </div>        
                </div>
            </div>
        </div>
    );
};

export default Stats;