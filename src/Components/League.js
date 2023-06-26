import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllMatches } from "../store";
import Matches from './Matches';

const League = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues.leaguesList)
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const filteredTeams = teams.filter(team => team.leagueId == league.id);
    const leagueId = league ? league.id : null;

    
    const today = new Date();
    const matches = useSelector(state => state.matches.matchesList);
    const upcomingMatch = matches.find((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
      });

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
            </div>
            <div className="league__info--match-container">
                <div>
                    <h5>Upcoming Match</h5>
                </div>
                {/* INSERT MATCH DATA */}
                    {upcomingMatch && (
                        <div className="league__info--match" key={upcomingMatch.id}>
                       
                            <div className="league__info--match-upper">
                                <div className="league__info--match-upper-name">
                                    <p>{upcomingMatch.name}</p>
                                </div>
                                <div className="league__info--match-upper-dates">
                                    <p>{upcomingMatch.date}</p>
                                    <p>{upcomingMatch.time}</p>
                                </div>
                            </div>
                            <div className="league__info--match-vs">
                                <div className="league__match-vs-team">
                                    <p>{teams.find(team => team.id === upcomingMatch.teamAid)?.name ||  ""}</p>
                                    <p>team id: {upcomingMatch.teamAid}</p>
                                </div>
                                <p> vs </p>
                                <div className="league__match-vs-team">
                                    <p>{teams.find(team => team.id === upcomingMatch.teamBid)?.name ||  ""}</p>
                                    <p>team id: {upcomingMatch.teamBid}</p>
                                </div>
                            </div>
                            <div className="league__info--match-lower">
                                <p>{upcomingMatch.location}</p>
                                <p>{upcomingMatch.description}</p>
                            </div>
                     
                        </div>
                    )}
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