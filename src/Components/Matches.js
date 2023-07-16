import React from "react";
import { useSelector } from "react-redux";
import { fetchAllMatches } from "../store";
//import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
// import AdvancedScoreKeeper from "./AdvancedScoreKeeper";


const Matches = (props) => {
    const { id } = useParams();
    let matches = [];
    const category = useSelector(state => state.categories.categoriesList);


    if (props.matches) {
        matches = props.matches;
    } else {
        matches = useSelector(state => state.matches.matchesList);
    }
    console.log(matches)

    const today = new Date();
    const upcomingMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
    })
    console.log(upcomingMatches);
    const previousMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate < today;
    })

    const currentMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate === today;
    })

    return (
        <div className='matches-container'>
            {matches.length > 0 ?
                <div className='matches--match-container'>
                    {upcomingMatches.map((upcomingMatch) => {
                        return (
                            <div className="matches--match" key={upcomingMatch.id}>
                                <div className="match-body">
                                    <div className='matches--match-vs'>
                                        <p><Link to={`/teams/${upcomingMatch.teams[0].id}`}>{upcomingMatch.teams[0]?.name || ""}</Link> vs <Link to={`/teams/${upcomingMatch.teams[1].id}`}>{upcomingMatch.teams[1]?.name || ""}</Link></p>
                                    </div>
                                    <div className="matches--match-upper">
                                        <p>{upcomingMatch.date} @ {upcomingMatch.time}</p>
                                    </div>
                                    <div className='matches--match-lower'>
                                        <p>{upcomingMatch.location}</p>
                                    </div>

                                </div>
                                <div className="match-lower">
                                    <Link to={`/scorekeeper/${upcomingMatch.id}`}>Score this Match</Link>
                                </div>
                            </div>
                        )}
                        )}
                    </div>
                    :
                    <div>
                        <p>No Matches to Display</p>
                    </div>
                    }
                </div>
            )
}

export default Matches;