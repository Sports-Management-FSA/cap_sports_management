import React from "react";
import { useSelector } from "react-redux";
import { fetchAllMatches } from "../store";
import { Link } from "react-router-dom";

const Matches = () => {
    const matches = useSelector(state => state.matches.matchesList);
    const teams = useSelector(state => state.teams.teamsList);
   
    var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    return(
        <div className='matches-container'>
            <div className='matches-header'>
             <h2>Previous Matches</h2>
             </div>
        
        {
        matches.map((match) => {
            if (date > match.date) {
            return (
                <div className='matches--match-container'>
                    <div className="matches--match" key={match.id}>
                        <div className="matches--match-upper">
                    <div className="matches--match-upper-name">
                        <p>{match.name}</p>
                        </div>
<div className="matches--match-upper-dates">
<p>{match.date} @ {match.time}</p>
       </div>
       </div>
       
    <div className='matches--match-vs'>
        <div className="matches-match-vs-team">
       <p><Link to={`/teams/${match.teamAid}`}>{teams.find(team => team.id === match.teamAid)?.name || ""}</Link> vs <Link to={`/teams/${match.teamBid}`}>{teams.find(team => team.id === match.teamBid)?.name || ""}</Link></p>
       </div>
       </div>
       <div className='matches--match-lower'>
       <p>{match.location}</p>
       <p>{match.description}</p>
       </div>
        
        </div>
        </div>
)}}
)}
<div className='matches-header'>
 <h2>Current Matches</h2>
 </div>
 {
        matches.map((match) => {
            if (date === match.date) {
            return (
                <div className='matches--match-container'>
                <div className="matches--match" key={match.id}>
                    <div className="matches--match-upper">
                <div className="matches--match-upper-name">
                    <p>{match.name}</p>
                    </div>
<div className="matches--match-upper-dates">
<p>{match.date} @ {match.time}</p>
   </div>
   </div>
   
<div className='matches--match-vs'>
    <div className="matches-match-vs-team">
   <p><Link to={`/teams/${match.teamAid}`}>{teams.find(team => team.id === match.teamAid)?.name || ""}</Link> vs <Link to={`/teams/${match.teamBid}`}>{teams.find(team => team.id === match.teamBid)?.name || ""}</Link></p>
   </div>
   </div>
   <div className='matches--match-lower'>
   <p>{match.location}</p>
   <p>{match.description}</p>
   </div>
    
    </div>
    </div>
)}}
)}
<div className='matches-header'>
        <h2>Upcoming Matches</h2>
        </div>
        {
        matches.map((match) => {
            if (date < match.date) {
            return (
                <div className='matches--match-container'>
                <div className="matches--match" key={match.id}>
                    <div className="matches--match-upper">
                <div className="matches--match-upper-name">
                    <p>{match.name}</p>
                    </div>
<div className="matches--match-upper-dates">
<p>{match.date} @ {match.time}</p>
   </div>
   </div>
   
<div className='matches--match-vs'>
    <div className="matches-match-vs-team">
   <p><Link to={`/teams/${match.teamAid}`}>{teams.find(team => team.id === match.teamAid)?.name || ""}</Link> vs <Link to={`/teams/${match.teamBid}`}>{teams.find(team => team.id === match.teamBid)?.name || ""}</Link></p>
   </div>
   </div>
   <div className='matches--match-lower'>
   <p>{match.location}</p>
   <p>{match.description}</p>
   </div>
    
    </div>
    </div>
)}}
)}
    </div>
    )

}

export default Matches;