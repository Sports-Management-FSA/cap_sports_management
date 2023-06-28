import React, { useState } from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';
import DashboardDirector from './DashboardDirector';
import DashboardManager from './DashboardManager';
import PlayerProfile from './PlayerProfile';

const Dashboard = () => {
    // const auth = useSelector(state => state.auth);
    // const leagues = useSelector(state => state.leagues.leaguesList)
    // const authLeagues = leagues.filter(league => league.id == auth.leagueId)

    const [current, setCurrent] = useState('start')

    return (
        <>
            <div className='dashboard-sidenav'>
                <div onClick={() => setCurrent('start')}>Profile</div>
                <div onClick={() => setCurrent('leagues')}>Leagues</div>
                <div onClick={() => setCurrent('teams')}>Teams</div>
                <div>Messages</div>
                <div>Invites</div>
                <div>Account</div>
            </div>
            <div className='dashboard-container'>
                {current === 'start' &&
                    <div className='dashboard-profile-container'>
                        <PlayerProfile />
                    </div>
                }
                {current === 'leagues' &&
                    <div className='dashboard-director-container'>
                        <DashboardDirector />
                    </div>
                }
                {current === 'teams' &&
                    <div className='dashboard-manager-container'>
                        <DashboardManager />
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard;