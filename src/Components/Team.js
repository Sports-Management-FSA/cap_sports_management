import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Team = () => {
    const {id} = useParams();
    const team = useSelector(state=>state.teams.teamsList.find(team=>team.id==id));
    const players = useSelector(state=>state.players.playersList.filter(player=>player.teamId == team));
    return(
        <div>
            <h2>{team.name}</h2>
            <p>{team.email}</p>
            <h3>Player Roster</h3>
            {
                players.map((player, idx)=>{
                    <Link to={`/player/${player.id}`}>
                        <div key={player.id}>
                            <span> {idx+1} </span>
                            <span> {player.firstName} </span>
                            <span> {player.lastName} </span>
                        </div>
                    </Link>
                })
            }
        </div>
    )
}

export default Team;