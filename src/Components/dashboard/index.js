import React, { useState } from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';
import Inbox from './Inbox';

const Dashboard = () => {
    const auth = useSelector(state => state.auth);
    
    const leagues = useSelector(state => state.leagues.leaguesList)
    const authLeagues = leagues.filter(league => league.id == auth.leagueId);

    const [currentComponent, setCurrentComponent] = useState('Home');
    const [activeTab, setActiveTab] = useState('Home');

    const handleClick = (component) => {
        setCurrentComponent(component);
        setActiveTab(component);
     };


    return (
        <div className="dashboard__container">
            
            <div className="dashboard__navbar">
                <ul className="dashboard__navbar-items">
                    <a 
                        onClick={() => handleClick('Home')} 
                        className={activeTab === 'Home' ? 'active' : ''}
                    >Home</a>
                    <hr />
                    <h6>Manage</h6>
                    <a 
                        onClick={() => handleClick('Leagues')} 
                        className={activeTab === 'Leagues' ? 'active' : ''}
                    >Leagues</a>
                    <a 
                        onClick={() => handleClick('Teams')} 
                        className={activeTab === 'Teams' ? 'active' : ''}
                    >Teams</a>
                    <a
                        onClick={() => handleClick('Personal')} 
                        className={activeTab === 'Personal' ? 'active' : ''}
                    >Personal</a>
                    <hr />
                    <h6>Comms</h6>
                    <a 
                        onClick={() => handleClick('Inbox')} 
                        className={activeTab === 'Inbox' ? 'active' : ''}
                        >Inbox</a>
                    <a 
                        onClick={() => handleClick('Announcements')} 
                        className={activeTab === 'Announcements' ? 'active' : ''}
                        >Announcements</a>
                </ul>
            </div>
            
            <div className="dashboard__main">
                <div className="dashboard__main-header">
                    <h1>Hi, {auth.username}!</h1>
                </div>
                <div className="dashboard__main-body">
                    {currentComponent === 'Home' && "Home coming soon"}
                    {currentComponent === 'Leagues' && "Leagues coming soon"}
                    {currentComponent === 'Teams' && "Teams coming soon"}
                    {currentComponent === 'Personal' && "Personal coming soon"}
                    {currentComponent === 'Inbox' && <Inbox />}
                </div>
            </div>
        </div>
        // <>
        //     <div>
        //         {current === 'start' &&
        //             <div>
        //                 <PlayerProfile />
        //             </div>
        //         }
        //         {current === 'leagues' &&
        //             <div className='dashboard-director-container'>
        //                 <DashboardDirector />
        //             </div>
        //         }
        //         {current === 'teams' &&
        //             <div className='dashboard-manager-container'>
        //                 <DashboardManager />
        //             </div>
        //         }
        //     </div>
        // </>
    )
}

export default Dashboard;