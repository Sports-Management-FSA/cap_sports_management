import React from 'react';
import { useSelector, useDispatch, Link  } from 'react-redux';

const DashboardManager = () => {
    const auth = useSelector(state => state.auth);
    const users = useSelector(state => state.players.playerList);
    const teamMembers = users.filter(user => user.teamId == auth.teamId);

    return (
        <div>
            <h1> Manager Dashboard</h1>
            <table>
                <thead>
                    <tr><th>ID</th><th>Name</th><th>Wins</th><th>Losses</th><th>Email</th></tr>
                </thead>
                <tbody>
                    {teamMembers.map(teamMembers => (
                        <tr key={teamMembers.id}>
                            <td>  {teamMembers.id} </td>
                            <td>{teamMembers.firstName} {teamMembers.lastName}</td>
                            <td>{teamMembers.gamesWon || 'no data'}</td>
                            <td>{teamMembers.gamesLost || 'no data'}</td>
                            <td>{teamMembers.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardManager;