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
            <div className='dashboard-container'>
                <div className='dashboard-profile-container'>
                    <PlayerProfile />
                </div>
                <div>
                    <DashboardDirector />
                </div>
                <div>
                    <DashboardManager />
                </div>
            </div>
        </>
    )
}

export default Dashboard;