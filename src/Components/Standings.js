import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const Standings = (props) => {
    const {teams} = props;

    return (
        <div className="standings__container">
            { teams.length > 0 ?
            <table className="standings__table">
                <thead>
                <tr className="table__header-container">
                    <th className="table__header">Position</th>
                    <th className="table__header">Name</th>
                    <th className="table__header">GP</th>
                    <th className="table__header">Points</th>
                    <th className="table__header">W</th>
                    <th className="table__header">L</th>
                    <th className="table__header">T</th>
                </tr>
                </thead>
                <tbody className="table__body-container">
                {teams.map((team, idx) => (
                    <tr key={team.id}>    
                        <td className="table__cell">{idx+1}</td>
                        <td className="table__cell"><Link className="table_link" to={`/teams/${team.id}`}> {team.name} </Link></td>
                        <td className="table__cell">{team.gamesWon || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                    </tr>
                ))}
                </tbody>
            </table> 
            :
            <p>No Standings to Display</p>
            }
        </div>
    );
};

export default Standings;