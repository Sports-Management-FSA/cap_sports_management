import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const DashboardLeagues = (props) => {
    const {teams} = props;

    return (
        <div className="standings__container">
            <table className="table">
                <thead>
                <tr className="table__header-container">
                    <th className="table__header">Position</th>
                    <th className="table__header">Team Name</th>
                    <th className="table__header">Teamm Manager</th>
                    <th className="table__header">Slots available</th>

                </tr>
                </thead>
                <tbody className="table__body-container">
                    <tr>
                        <td>beep</td>
                        <td>beep</td>
                        <td>beep</td>
                        <td>beep</td>
                    </tr>
                {/* {teams.map(team => (
                    <tr key={team.id}>    
                        <td className="table__cell">number</td>
                        <td className="table__cell"><Link to={`/teams/${team.id}`}> {team.name} </Link></td>
                        <td className="table__cell">{team.gamesWon || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                        <td className="table__cell">{team.gamesLost || 'no data'}</td>
                    </tr>
                ))} */}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardLeagues;