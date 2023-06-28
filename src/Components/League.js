import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllLeagues } from "../store";
import Matches from './Matches';
import Standings from "./Standings";

const League = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const leagues = useSelector(state => state.leagues.leaguesList)
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const [currentComponent, setCurrentComponent] = useState(null);

    
    const today = new Date();
    const matches = useSelector(state => state.matches.matchesList);
    const upcomingMatch = matches.find((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
      });

    useEffect(()=> {
        dispatch(fetchAllLeagues())
    }, [dispatch, id])

    const handleClick= (component) => {
        setCurrentComponent(component)
    }

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
                    {/* <Link to='/createteam' state={{ leagueId: leagueId}}>Create Team</Link> */}
                    <a href="">Request to join this league</a>
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
                                    <p>{upcomingMatch.date} @ {upcomingMatch.time}</p>
                                    
                                </div>
                            </div>
                            <div className="league__info--match-vs">
                                <div className="league__match-vs-team">
                                    <p><Link to={`/teams/${upcomingMatch.teamAid}`}>{teams.find(team => team.id === upcomingMatch.teamAid)?.name ||  ""}</Link></p>
                                    <p>team id: {upcomingMatch.teamAid}</p>
                                </div>
                                <p> vs </p>
                                <div className="league__match-vs-team">
                                    <p><Link to={`/teams/${upcomingMatch.teamBid}`}>{teams.find(team => team.id === upcomingMatch.teamBid)?.name ||  ""}</Link></p>
                                    <p>team id: {upcomingMatch.teamBid}</p>
                                </div>
                            </div>
                            <div className="league__info--match-lower">
                                <p>{upcomingMatch.location}</p>
                                <p><Link to="/matches">View all matches</Link></p>
                            </div>
                     
                        </div>
                    )}
            </div>
            
            <div className="league__content">
                <div className="league__content--body">
                    <h1>Body of content</h1>
                    {currentComponent === 'Matches' && <Matches />}
                    {currentComponent === 'Standings' && <Standings id={id}/>}
                    {currentComponent === 'Players' && "Players Component here"}
                    {currentComponent === 'Team Info' && "Team Info Component here"}
                </div>
                <div className="league__content--sidebar">
                    <ul className="league--sidebar">
                        <li><button onClick={() => handleClick('Players')}>Players</button></li>
                        <li><button onClick={() => handleClick('Standings')}>Standings</button></li>
                        <li><button onClick={() => handleClick('Matches')}>Matches</button></li>
                        <li><button onClick={() => handleClick('Team Info')}>Team Info</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default League;