import React, { useState } from "react";
import { useSelector } from "react-redux";

const Players = (props) => {
    const {players, teams} = props;

    return (
        <table className="table">
            <thead>
                <tr className="table__header-container">
                    <th className="table__header">Team</th>
                    <th className="table__header">Name</th>
                </tr>
            </thead>
            <tbody className="table__body-container">
           {
            players.map(member=>{
                return(
                <tr key={member.id}>
                    <td className="table__cell">{teams.find(team=>team.id==member.teamId).name}</td>
                    <td className="table__cell">{member.user.firstName} {member.user.lastName}</td>
                </tr>
                    )})
           }
           </tbody>
        </table>
    );
};

export default Players;