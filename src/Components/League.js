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
                <h5>{league.season}</h5>
            </div>
            <div className="league__info">
                <div className="league__info--description">
                    <h5>About this League</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    <Link to='/createteam' state={{ leagueId: leagueId}}>Create Team</Link>
                </div>
                <div className="league__info--match">
                    <h5>Upcoming Match</h5>
                    {/* INSERT MATCH DATA */}
                </div>
            </div>
            <div className="league__content">
                <div className="league__content--body">
                    <h1>Body of content</h1>
                </div>
                <div className="league__content--sidebar">
                    <h1>SIDEBAR</h1>
                    <ul className="league--sidebar">
                        <li><button>Players</button></li>
                        <li><button>Standings</button></li>
                        <li><button>Matches</button></li>
                        <li><button>Team Info</button></li>
                    </ul>
                </div>
            </div>
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