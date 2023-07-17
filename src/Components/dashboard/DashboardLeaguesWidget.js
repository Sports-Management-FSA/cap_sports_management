import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import leaguesSlice from '../../store/leaguesSlice';


const DashboardLeaguesWidget = (props) => {
    const leagues = props.league;
    const categories = useSelector(state => state.categories.categoriesList);
    return (
        <div className="dashboard__leagues-container">
            <div className="leagues-title">
                <p>Your Leagues</p>
            </div>
            <table className="dashboard__leagues-table">
                <thead>
                <tr className="leagues-table-row">
                    <th className="leagues-table-header">Team Name</th>
                    <th className="leagues-table-header">Team Email</th>
                    <th className="leagues-table-header">Current Season</th>
                    <th className="leagues-table-header">Public/Private</th>
                    <th className="leagues-table-header">Duration</th>

                </tr>
                </thead>
                <tbody className="leagues-table-body">
                    {leagues.map((league) => (
                        <tr className="leagues-table-row" key={league.id}>
                            <td className="leagues-table-data">{league.name}</td>                
                            <td className="leagues-table-data">{league.email}</td>                
                            <td className="leagues-table-data">{league.season}</td>                
                            <td className="leagues-table-data">{league.public ? 'Public' : 'Private'}</td>              
                            <td className="leagues-table-data">{league.startDate} - {league.endDate}</td>              
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardLeaguesWidget;