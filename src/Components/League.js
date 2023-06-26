import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllLeagues } from "../store";

const League = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues.leaguesList)
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const filteredTeams = teams.filter(team => team.leagueId == league.id);
    const leagueId = league ? league.id : null;

    // useEffect(()=> {
    //     dispatch(fetchAllLeagues())
    // }, [dispatch, id])

    if (!league){
        return <div>...loading</div>
    }

    return (
        <div className="league-container">
            <div className="league__head">
                <h2>{league.logo}{league.name}</h2>
                <h2>{league.season}</h2>
            </div>
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