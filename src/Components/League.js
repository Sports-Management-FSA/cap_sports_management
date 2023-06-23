import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const League = () => {
    const { id } = useParams();
    const leagues = useSelector(state => state.leagues.leaguesList)
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const filteredTeams = teams.filter(team => team.leagueId == league.id);
    const leagueId = league.id;

    return (
        <div className="league-container">
            <h2>{league.logo}{league.name}</h2>
            <h2>{league.season}</h2>
            <Link to='/createteam' state={{ leagueId: leagueId}}>Create Team</Link>
            {
                filteredTeams.map((team) => {
                    return (
                        <div key={team.id}>
                            <Link to={`/teams/${team.id}`}>{team.name}</Link>
                            <p>{team.email}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default League;