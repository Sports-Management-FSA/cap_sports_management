import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const Standings = (props) => {
    const id = props.id;
    const teams = useSelector(state => state.teams.teamsList);
    const teamsInLeague = teams.filter(team => team.leagueId == id);

    return (
        <div className="standings__container">
            <table className="table">
                <thead>
                <tr className="table__header-container">
                    <th className="table__header">Position</th>
                    <th className="table__header">Name</th>
                    <th className="table__header">Wins</th>
                    <th className="table__header">Losses</th>
                </tr>
                </thead>
                <tbody className="table__body-container">
                {teamsInLeague.map(team => (
                    <tr key={team.id}>    
                        <td className="table__cell">number</td>
                        <td className="table__cell"><Link to={`/teams/${team.id}`}> {team.name} </Link></td>
                        <td className="table__cell">{team.gamesWon || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Standings;