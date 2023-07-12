import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Matches from './Matches';
import Roster from './Roster';
import TeamInfo from './TeamInfo';
import Personnel from './Personnel';

const TeamStats = (props) => {
    const {team} = props;
    const matches = team.matches;
    const players = team.users.filter(player=>(player.teamRoles.find(role => role.name == 'player')) !== undefined);
    const personnel = team.users.filter(personnel=>(personnel.teamRoles.filter(role => role.name !== 'player' && role.user_teamRoles.teamId == team.id)).length > 0);
    const [currentComponent, setCurrentComponent] = useState('Roster');
    const [activeTab, setActiveTab] = useState("Roster");
 
    if (!team) {
         return <div>...loading</div>;
     }
  
    //send users through props
 
    const handleClick = (component) => {
       setCurrentComponent(component);
       setActiveTab(component);
    };
    return (
        <div>
            <div className="stats-main">-
                <ul className="stats--navbar-items">
                    <a onClick={() => handleClick('Roster')} className={activeTab === 'Roster' ? 'active' : ''}>Roster</a>
                    <a onClick={() => handleClick('Personnel')} className={activeTab === 'Personnel' ? 'active' : ''}>Personnel</a>
                    <a onClick={() => handleClick('Matches')} className={activeTab === 'Matches' ? 'active' : ''} >Matches</a>
                    <a onClick={() => handleClick('Team Info')} className={activeTab === 'Team Info' ? 'active' : ''}>Team Info</a>
                </ul>   
                <div className="stats-content">
                    <div className="stats-content-body">
                        {currentComponent === 'Matches' && <Matches matches={matches} />}
                        {currentComponent === 'Roster' && <Roster players={players} />}
                        {currentComponent === 'Personnel' && <Personnel personnel={personnel} teamId={team.id}/>}
                        {currentComponent === 'Team Info' && <TeamInfo team={team} numPlayers={players.length}/>}
                    </div>        
                </div>
            </div>
        </div>
    );
};

export default TeamStats;