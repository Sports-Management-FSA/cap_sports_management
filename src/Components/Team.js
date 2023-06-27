import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Standings from './Standings';
import Roster from './Roster';

const Team = () => {
    const {id} = useParams();
    const teams = useSelector(state=>state.teams.teamsList);
    const team = teams.find(team=> team.id == id);
    const [currentComponent, setCurrentComponent] = useState('Standings');
    const [activeTab, setActiveTab] = useState('Standings');
    const users = useSelector(state=>state.players.playerList);
    const players = users.filter(player=>player.teamId == id && player.isPlayer == true);

    const handleClick = (componentAndTab) => {
        setCurrentComponent(componentAndTab)
        setActiveTab(componentAndTab);
    }

    if(!team || !id) {
        return <div>loading</div>
    }

    return(
        <div className='team__container'>
            <div className="team__header">
                <div className="team__header-image">
                    <h1>IMAGE</h1>
                </div>
                <div className="team__header-info">
                    <h5>{team.name}</h5>
                    <p>{team.id}</p>
                    <p>{team.email}</p>
                </div>
            </div>
            <div className='team__content'>
                <div className="team__content-nav">
                    <ul>
                        <li>Home</li>
                        <li><button onClick={() => handleClick('Standings') } className={activeTab === 'Standings' ? 'active' : ''}>Standings</button></li>
                        <li><button onClick={() => handleClick('Roster')} className={activeTab === 'Roster' ? 'active' : ''}>Roster</button></li>
                        <li>Schedule</li>
                        <li>Statistics</li>
                    </ul>
                </div>
                <div className="team__content-body">
                   { currentComponent === "Standings" && <Standings team={team} />}
                    {currentComponent === "Roster" && <Roster players={players}/>}
                </div>
            </div>
        </div>
    )
}

export default Team;