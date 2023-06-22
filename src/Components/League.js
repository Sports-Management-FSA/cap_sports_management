import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const League = () => {
    const {id} = useParams();
    const leagues = useSelector(state => state.leagues.leaguesList)
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const filteredTeams = teams.filter(team => team.leagueId == league.id);

    return(
        <div>
            <h2>{league.logo}{league.name}</h2>
            <h2>{league.season}</h2>
            <ul>
                {
                    filteredTeams.map((team) => {
                        return(
                            <li>
                                {team.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default League;