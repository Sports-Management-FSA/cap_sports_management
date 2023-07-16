import React, { useState } from "react";
import { useSelector } from "react-redux";

const Personnel = (props) => {
    const {personnel, teamId} = props;

    return (
        <div>
            { personnel.length > 0 ?
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
                        <td className="table__cell">{member.user.firstName} {member.user.lastName}</td>
                        <td className="table__cell">{member.teamRole.name}</td>
                    </tr>
                ))
            }
            </tbody>
            </table> 
            :
            <div>
                <p>No Personnel to Display</p>
            </div>
            }
        </div>
    );
};

export default Personnel;