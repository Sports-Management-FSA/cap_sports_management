import React, { useState} from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Matches from './Matches';
import Standings from "./Standings";

const League = () => {
    const { id } = useParams();
    const [currentComponent, setCurrentComponent] = useState(null);
    const [activeTab, setActiveTab] = useState('Standings');
    const leagues = useSelector(state => state.leagues.leaguesList);
    const league = leagues.find(league => league.id == id);
    const teams = useSelector(state => state.teams.teamsList);
    const matches = useSelector(state => state.matches.matchesList);
    const matchesByLeague = matches.filter(match => match.leagueId == id);

    const today = new Date();
    const upcomingMatch = matchesByLeague.find((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
      });

    const handleClick= (component) => {
        setCurrentComponent(component)
        setActiveTab(component);
    }

    if (!league){
        return <div>...loading</div>;
    }

    return (
        <div className="league-container">
            <div className="league__head">
                <img src={window.location.origin + `${league.logo}`} width="70" height="60" alt="Image"/>
                <h2>{league.name}</h2>
                <h5>{league.season}</h5>
            </div>
            <div className="league__container-upper">
                <div className="league__info">
                    <div className="league__info--description">
                        <h5>About this League</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                        <a href="">Request to join this league</a>
                    </div>
                </div>
                <div className="league__info--match-container">
                    <div>
                        <h5>Upcoming Match</h5>
                    </div>
                        {upcomingMatch ? (
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
                        ) : ( 
                        <div className="league__match--nomatches">
                            <p >no upcoming matches</p>
                        </div>
                        )
                    }
                </div>
            </div>
            <div className="league__container-main">
                <ul className="league--sidebar">
                    <li><button button onClick={() => handleClick('Announcements')} className={activeTab === 'Announcements' ? 'active' : ''}>Announcements</button></li>
                    <li><button onClick={() => handleClick('Players')} className={activeTab === 'Players' ? 'active' : ''}>Players</button></li>
                    <li><button onClick={() => handleClick('Standings')} className={activeTab === 'Standings' ? 'active' : ''}>Standings</button></li>
                    <li><button onClick={() => handleClick('Matches')} className={activeTab === 'Matches' ? 'active' : ''} >Matches</button></li>
                    <li><button onClick={() => handleClick('Team Info')} className={activeTab === 'Team Info' ? 'active' : ''}>Teams</button></li>
                    <li><button onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''}>About</button></li>
                </ul>   
                <div className="league__content">
                    <div className="league__content--body">
                        {currentComponent === 'Announcements' && "Announcements coming soon"}
                        {currentComponent === 'Matches' && <Matches />}
                        {currentComponent === 'Standings' && <Standings id={id}/>}
                        {currentComponent === 'Players' && "Players Component here"}
                        {currentComponent === 'Team Info' && "Team Info Component here"}
                    </div>        
                </div>
            </div>
        </div>
    )
}

export default League;