import { Home } from './Home';
import { DashboardSidebar } from './DashboardSidebar';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Inbox from './Inbox';
import DashboardLeagues from './DashboardLeagues';

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
    const {teams, leagues, players, requests} = useSelector(state=>state);
    const league = auth.leagues;

    const [currentComponent, setCurrentComponent] = useState('Home');
    const [activeTab, setActiveTab] = useState('Home');

    if (!league || !auth) {
        return <div>loading</div>
    }

    const handleClick = (component) => {
        setCurrentComponent(component);
        setActiveTab(component);
     };


    return (
        <div className="dashboard__container">
            <div className="dashboard__navbar">
                <DashboardSidebar handleClick={handleClick} activeTab={activeTab}  />
            </div>
            <div className="dashboard__main-body">
                <div className="dashboard__main-header">
                    <h1>Hi, {auth.username}!</h1>
                    <p>Welcome to your dashboard</p>
                </div>
                <div className="dashboard__main-content">
                    {currentComponent === 'Home' && <Home league={league} />}
                    {currentComponent === 'Leagues' && <DashboardLeagues />}
                    {currentComponent === 'Inbox' && <Inbox requests={requests} leagues={leagues} players={players}/>}
                    {currentComponent === 'Teams' && "Teams coming soon"}
                    {currentComponent === 'Personal' && "Personal coming soon"}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;