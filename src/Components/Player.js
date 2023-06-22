import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Player = () => {
    const { id } = useParams();

    const users = useSelector(state=>state.players.playerList);
    const player = users.find(player=>player.id == id);

return (
    <div>
        <h1>Player</h1>
<p>Username: {player.username}</p>
        <p>First Name: {player.firstName} </p> 
        <p>Last Name: {player.lastName}</p>
        <p>Team Id: {player.teamId}</p>
        <p>Avatar: {player.avatar}</p>
       
    </div>
)
}

export default Player;