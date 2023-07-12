import React from 'react';


const TeamInfo = (props) => {
    const {team, numPlayers} = props;
    return (
        <div>
            <p>{team.name}</p>
            <p>Number of players: {numPlayers}</p>
            <p>Created: {team.createdAt}</p>
        </div>
    );
};

export default TeamInfo;