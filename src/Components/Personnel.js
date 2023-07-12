import React, { useState } from "react";
import { useSelector } from "react-redux";

const Personnel = (props) => {
    const {personnel, teamId} = props;

    return (
        <table className="table">
            <thead>
                <tr className="table__header-container">
                    <th className="table__header">Name</th>
                    <th className="table__header">Role</th>
                </tr>
            </thead>
            <tbody className="table__body-container">
           {
            personnel.map(member=>(
                <tr key={member.id}>
                    <td className="table__cell">{member.firstName} {member.lastName}</td>
                    <td className="table__cell">{member.teamRoles.find(role=>role!='player').name}</td>
                </tr>
            ))
           }
           </tbody>
        </table>
    );
};

export default Personnel;