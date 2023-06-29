import React from 'react';

const Roster = (props) => {
    const {users}  = props;
    //create obj with different roles as keys and save the users with those roles
    const players = users.filter(player=>(player.teamRoles.find(role => role.name == 'player')) !== null);
    const staff = users.filter(player=>(player.teamRoles.find(role => role.name == 'player')) == null);

    return (
        
            <table className="table">
                <thead>
                    <tr className="table__header-container">
                        <th  className="table__header">Name</th>
                        <th  className="table__header">Position</th>
                        <th  className="table__header">Games Played</th>
                        <th  className="table__header">Points</th>
                        <th  className="table__header">Goals</th>
                    </tr>
                </thead>
                <tbody className="table__body-container">
                    {players.map(player => (
                        <tr key={player.id}>
                            <td className="table__cell">{player.firstName} {player.lastName}</td>
                            <td className="table__cell">Forward</td>
                            <td className="table__cell">4</td>
                            <td className="table__cell">null</td>
                            <td className="table__cell">null</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    );
};

export default Roster;