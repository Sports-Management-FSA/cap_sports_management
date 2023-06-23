import React from 'react';
import { useSelector, useDispatch, Link  } from 'react-redux';

const DashboardManager = () => {

    const teams = useSelector(state => state.teams.teamsList);
    const users = useSelector(state => state)
    console.log(teams);


    return (
        <div>
            <h1> Manager Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Email</th>
                        <th>Team Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.id}>
                            <td><Link to=""></Link>
                                {team.id}
                                </td>
                            <td>{team.name}</td>
                            <td>{team.gamesWon || 'null'}</td>
                            <td>{team.gamesLost || 'no data'}</td>
                            <td>{team.email}</td>
                            <td>Billy Bob Thorton</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardManager;