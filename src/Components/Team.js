import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Standings from './Standings';
import Roster from './Roster';

const Team = () => {
    const {id} = useParams();
    const [currentComponent, setCurrentComponent] = useState('Home');
    const [activeTab, setActiveTab] = useState('Standings');
    
    const teams = useSelector(state=>state.teams.teamsList);
    const team = teams.find(team=> team.id == id);

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
                <img src={window.location.origin + `${team.logo}`} width="170" height="160" alt="Image"/>
                </div>
                <div className="team__header-info">
                    <h5>{team.name}</h5>
                    <p>id: {team.id}</p>
                    <p>{team.email}</p>
                    <i>league in progress</i>
                </div>
            </div>
            <div className='team__content'>
                <div className="team__content-nav">
                    <ul>
                        <li><button onClick={() => handleClick('Standings') } className={activeTab === 'Standings' ? 'active' : ''}>Standings</button></li>
                        <li><button onClick={() => handleClick('Roster')} className={activeTab === 'Roster' ? 'active' : ''}>Roster</button></li>
                        <li><button onClick={() => handleClick('Schedule')} className={activeTab === 'Schedule' ? 'active' : ''}>Schedule</button></li>
                        <li><button onClick={() => handleClick('Stats')} className={activeTab === 'Stats' ? 'active' : ''}>Stats</button></li>
                        <li><button onClick={() => handleClick('News Feed')} className={activeTab === 'News Feed' ? 'active' : ''}>News Feed</button></li>
                        <li><button onClick={() => handleClick('Media')} className={activeTab === 'Media' ? 'active' : ''}>Media</button></li>
                        <li><button onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''}>About</button></li>
                        <li>Manage Team</li>
                    </ul>
                </div>
                <div className="team__content-body">
                    {currentComponent === "Standings" && <Standings id={team.leagueId} />}
                    {currentComponent === "Roster" && <Roster users={team.users}/>}
                    {currentComponent === "Schedule" && "coming soon"}
                    {currentComponent === "Stats" && "coming soon"}
                    {currentComponent === "News Feed" && "coming soon"}
                    {currentComponent === "Media" && "coming soon"}
                    {currentComponent === "About" && "coming soon"}
                </div>
            </div>
        </div>
    )
}

export default Team;