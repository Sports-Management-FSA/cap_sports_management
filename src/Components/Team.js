import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Team = () => {
    const {id} = useParams();
    const teams = useSelector(state=>state.teams.teamsList);
    const team = teams.find(team=> team.id == id);
    const users = useSelector(state=>state.players.playerList);
    const players = users.filter(player=>player.teamId == id && player.isPlayer == true);

    return(
        <div>
            <h2>{team.name}</h2>
            <p>{team.email}</p>
            <h3>Player Roster</h3>
            {
                players.map((player, idx)=>{
                    return(
                    <Link to={`/player/${player.id}`} key={player.id}>
                        <div>
                            <span> {idx+1} - </span>
                            <span> {player.firstName} </span>
                            <span> {player.lastName} </span>
                        </div>
                    </Link>
                    )
                })
            }
        </div>
    )
}

export default Team;