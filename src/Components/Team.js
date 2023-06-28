import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAllTeams, fetchAllLeagues} from '../store';

const Team = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const teams = useSelector(state=>state.teams.teamsList);
    const loading = useSelector(state=>state.teams)
    console.log("Loading from Teams.js", loading)
    const team = teams.find(team=> team.id == id);
    //const users = useSelector(state=>state.players.playerList);
    // const players = users.filter(player=>player.teamId == id && player.isPlayer == true);
    // const teamId = team.id

    // useEffect(() => {
    //     dispatch(fetchAllTeams())
    //     dispatch(fetchAllLeagues())
    // }, [dispatch])

    if(!team || !id) {
        return <div>loading</div>
    }

    return(
        <div className='team__container'>
            <div className="team__header">
                <div className="team__header-image">
                <img src={window.location.origin + `${team.logo}`} width="170" height="160" alt="Image"/>
                </div>
                <div className="team__header-info">
                    <h5>team name: {team.name}</h5>
                    <p>team id: {team.id}</p>
                    <p>team email: {team.email}</p>
                </div>
            </div>
            <div className='team__content'>
                <div className="team__content-nav">
                    <ul>
                        <li>Home</li>
                        <li>Standings</li>
                        <li>Schedule</li>
                        <li>Roster</li>
                        <li>Statistics</li>
                    </ul>
                </div>
            </div>
            {/* <div className='team-sidebar'>
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
            </div> */}
        </div>
    )
}

export default Team;