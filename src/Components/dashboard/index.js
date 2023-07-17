import { Home } from './Home';
import { DashboardSidebar } from './DashboardSidebar';
import React, { useState } from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';
import Inbox from './Inbox';
import DashboardLeaguesWidget from './DashboardLeaguesWidget';
import DashboardLeagues from './DashboardLeagues';
import DashboardTeam from './DashboardTeam';
import Standings from '../Standings';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

const Dashboard = () => {

    const auth = useSelector(state => state.auth)
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
                    {currentComponent === 'Inbox' && <Inbox />}
                    {currentComponent === 'Teams' && <DashboardTeam />}
                    {currentComponent === 'Personal' && "Personal coming soon"}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;