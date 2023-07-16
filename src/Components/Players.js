import React, { useState } from "react";
import { useSelector } from "react-redux";

const Players = (props) => {
    const {players, teams} = props;

    return (
        <div className="players__container">
            {players.length > 0 ?
            <table className="players__table">
                <thead>
                    <tr className="table__header-container">
                        <th className="table__header">Name</th>
                        <th className="table__header">Team</th>
                        <th className="table__header">GP</th>
                        <th className="table__header">G</th>
                        <th className="table__header">A</th>
                        <th className="table__header">+/-</th>
                    </tr>
                </thead>
                <tbody className="table__body-container">
            {
                players.map(member=>{
                    return(
                    <tr key={member.id} >
                        <td className="table__cell">{teams.find(team=>team.id==member.teamId).name}</td>
                        <td className="table__cell">The Bobcats</td>
                        <td className="table__cell">8</td>
                        <td className="table__cell">17</td>
                        <td className="table__cell">6</td>
                        <td className="table__cell">+5</td>
                    </tr>
                        )})
            }
            </tbody>
            {/* <tfoot>
                
                <td><article>GP = Games Played, G=Goals, A=Assists, +/- = Plus/Minus</article></td>
                
            </tfoot> */}
            </table>
            :
            <p>No Players to Display</p>
            }
        </div>
    );
};

export default Players;