import React from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';
import DashboardDirector from './DashboardDirector';
import DashboardManager from './DashboardManager';
import PlayerProfile from './PlayerProfile';

const Dashboard = () => {
    const auth = useSelector(state => state.auth);
    const leagues = useSelector(state => state.leagues.leaguesList)
    const authLeagues = leagues.filter(league => league.id == auth.leagueId)

    return (
        <>
            <div className='dashboard-sidenav'>
                <div>Profile</div>
                <div>Leagues</div>
                <div>Teams</div>
                <div>Messages</div>
                <div>Invites</div>
                <div>Account</div>
            </div>
            <div className='dashboard-container'>
                <div className='dashboard-profile-container'>
                    <PlayerProfile />
                </div>
                <div className='dashboard-director-container'>
                    <DashboardDirector />
                </div>
                <div className='dashboard-manager-container'>
                    <DashboardManager />
                </div>
            </div>
        </>
    )
}

export default Dashboard;