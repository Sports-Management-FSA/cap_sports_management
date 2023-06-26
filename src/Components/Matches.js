import React from "react";
import { useSelector } from "react-redux";
import { fetchAllMatches } from "../store";

const Matches = () => {
    const matches = useSelector(state => state.matches.matchesList);
    console.log(matches);
    const teams = useSelector(state => state.teams.teamsList);
    console.log(teams);

    var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return(
        <div className='matches-container'>
            <div className='matches-header'>
             <h1>Matches</h1>
             </div>
        <h2>Previous Matches</h2>
        {
        matches.map((match) => {
            if (date > match.date) {
            return (
                <div className='single-match-container'>
                    <div className="match-name">
                        {match.name}
                    </div>
<div className="matches-dates">
<p>{match.date}</p>
       <p>{match.time}</p>
       </div>
    <div className='matches-vs'>
       <p>{teams.find(team => team.id === match.teamAid)?.name || ""} vs {teams.find(team => team.id === match.teamBid)?.name || ""}</p>
       <div className='matches-location'>
       <p>{match.location}</p>
       <p>{match.description}</p>
       </div>
        </div>
        </div>
)}}
)}
 <h2>Current Matches</h2>
 {
        matches.map((match) => {
            if (date === match.date) {
            return (
                <section className='matches-features-center' key={match.id}>
    <div className='matches-feature'>
       <h4>{match.name}</h4>
       <p>{match.date}</p>
       <p>{match.time}</p>
       <p>{match.location}</p>
       <p>{match.description}</p>
        </div>
        </section>
)}}
)}
        <h2>Upcoming Matches</h2>
        {
        matches.map((match) => {
            if (date < match.date) {
            return (
                <section className='matches-features-center' key={match.id}>
    <div className='matches-feature'>
       <p>{match.name}</p>
       <p>{match.date}</p>
       <p>{match.time}</p>
       <p>{match.location}</p>
       <p>{match.description}</p>
        </div>
        </section>
)}}
)}
    </div>
    )

}

export default Matches;