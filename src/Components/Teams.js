import React, { useState } from "react";

const Teams = (props) => {
    const {teams} = props;
    
    return (
        <table className="table">
            <thead>
                <tr className="table__header-container">
                    <th className="table__header"></th>
                    <th className="table__header">Team Name</th>
                    <th className="table__header">Total Players</th>
                </tr>
            </thead>
            <tbody className="table__body-container">
           {
            teams.map(team=>{
                const players = team.users.filter(player=>(player.teamRoles.find(role => role.name == 'player')) !== null)
                return(
                        <tr key={team.id}>
                            <td className="table__cell"><img src={window.location.origin + `${team.logo}`} width="20" height="10" alt="Image" /> </td>
                            <td className="table__cell">{team.name}</td>
                            <td className="table__cell">{players.length}</td>
                        </tr>
                )
            })
           }
           </tbody>
        </table>
    );
};

export default Teams;