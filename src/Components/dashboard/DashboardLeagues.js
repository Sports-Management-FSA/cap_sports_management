import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import leaguesSlice from '../../store/leaguesSlice';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const DashboardLeagues = () => {
    const [selectedLeague, setSelectedLeague] = useState(null);

    const leagues = useSelector(state => state.auth.leagues);
    const allLeagues = useSelector(state => state.leagues.leaguesList);
    const players = useSelector(state => state.players.playerList)
    //const playerRoles = useSelector(state => state.players.playerList).map(players => players.teamRoles);
    const categories = useSelector(state => state.categories.categoriesList);
    console.log("all player roles", players)
    
    if (selectedLeague) {

        const sport = categories.find(category => category.id == selectedLeague.categoryId);
        const matchedTeams = allLeagues.filter(league => league.id == selectedLeague.id)[0].teams;
        console.log(matchedTeams)
        
        return (
                <div className="dash__league-card">
                    <section className="dash__league-card-header">
                        <h5>{selectedLeague.name}</h5>
                        <ModeEditRoundedIcon className="dashboard-icon"/>
                    </section>
                    <section className="dash__league-body">
                        <div className="dash__league-body-label">
                            <h5>Season</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>Fall</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Category</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{sport.name}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Total Teams</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{matchedTeams.length}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Privacy</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{selectedLeague.public ? 'Public' : 'Private'}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Season Length</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{selectedLeague.startDate} to {selectedLeague.endDate}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Creation Date</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{selectedLeague.createdAt}</p>
                        </div>
                        
                    </section>
                    <div className="dash__league-lower">
                        <ArrowBackRoundedIcon onClick={() => setSelectedLeague(null)} className="dashboard-icon"/>
                    </div>
                    <Link className="dash__league-link" to={`/league/${selectedLeague.id}`}>View Team Page</Link>
                </div>
        )
    }

    return (
        <div className="dashboard__leagues-container">
            <div className="leagues-title">
                <p>Your Leagues</p>
            </div>
            <table className="dashboard__leagues-table">
                <thead>
                <tr className="leagues-table-row">
                    <th className="leagues-table-header">League Name</th>
                    <th className="leagues-table-header">League Email</th>
                    <th className="leagues-table-header">Current Season</th>
                    <th className="leagues-table-header">Public/Private</th>
                    <th className="leagues-table-header">Duration</th>
                    <th className="leagues-table-header">Edit</th>

                </tr>
                </thead>
                <tbody className="leagues-table-body">
                    {leagues.map((league) => (
                        <tr onClick={() => setSelectedLeague(league)} className="leagues-table-row" key={league.id}>
                            <td className="leagues-table-data">{league.name}</td>                
                            <td className="leagues-table-data">{league.email}</td>                
                            <td className="leagues-table-data">{league.season}</td>                
                            <td className="leagues-table-data">{league.public ? 'Public' : 'Private'}</td>              
                            <td className="leagues-table-data">{league.startDate} - {league.endDate}</td>              
                            <td className="leagues-table-data"><SettingsRoundedIcon className="dashboard-icon"/></td>              
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="leagues-bottom">
                <p>View All</p>
            </div>
        </div>
    );
};

export default DashboardLeagues;