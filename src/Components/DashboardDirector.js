import React from 'react';

const DashboardDirector = () => {

    const teams = useSelector(state => state.teams.teamsList);
    const users = useSelector(state => state.players.playerList);
    // const teamManager = users.find(user => user.teamId === )
    console.log(users);

    return (
        <div>
            <h1>Director Dashboard</h1>
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
                            <td>  {team.id} </td>
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

export default DashboardDirector;