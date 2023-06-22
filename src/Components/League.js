import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllLeagues, fetchAllTeams } from "../store";

const League = () => {
    const {leagues, teams} = useSelector(state => state)
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchAllLeagues());
        dispatch(fetchAllTeams());
    },[id, dispatch])

    const league = leagues.find(league => league.id === id);
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