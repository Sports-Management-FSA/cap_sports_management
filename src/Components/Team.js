import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const Team = () => {
    const {id} = useParams();
    const teams = useSelector(state=>state.teams.teamsList);
    const team = teams.find(team=> team.id == id);
    const users = useSelector(state=>state.players.playerList);
    const players = users.filter(player=>player.teamId == id && player.isPlayer == true);
    const teamId = team.id

    return(
        <div className='team-container'>
            <div className='team-sidebar'>
                <ul>
                    <li>Home</li>
                    <li>Standings</li>
                    <li>Schedule</li>
                    <li>Roster</li>
                    <li>Statistics</li>
                </ul>
            </div>
            <h2>{team.name}</h2>
            <p>{team.email}</p>
            <div className='team-roster'>
            <h3>Player Roster</h3>
                <Link to={`/createplayer`} state={{ teamId: teamId}}>Create Player</Link>
                {
                    players.map((player, idx)=>{
                        return(
                        <Link to={`/players/${player.id}`} key={player.id}>
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
        </div>
    )
}

export default Team;