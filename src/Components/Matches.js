import React from "react";
import { useSelector } from "react-redux";
import { fetchAllMatches } from "../store";
import { Link } from "react-router-dom";

const Matches = (props) => {
    let matches =[];

    if(props.matches){
        matches = props.matches;
    } else {
        matches = useSelector(state=> state.matches.matchesList)
    }

   
const today = new Date();
    const upcomingMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
    })

    const previousMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate < today;
    })

    const currentMatches = matches.filter((match) => {
        const matchDate = new Date(match.date);
        return matchDate === today;
    })

    return(
        <div className='matches-container'>
            <div className='matches-header'>
             <h2>Previous Matches</h2>
             </div>
        
        {
        previousMatches.map((previousMatch) => {
            return (
                <div className='matches--match-container' key={previousMatch.id}>
                    <div className="matches--match">
                        <div className="matches--match-upper">
                    <div className="matches--match-upper-name">
                        <p>{previousMatch.name}</p>
                        </div>
<div className="matches--match-upper-dates">
<p>{previousMatch.date} @ {previousMatch.time}</p>
       </div>
       </div>
       
    <div className='matches--match-vs'>
        <div className="matches-match-vs-team">
       <p><Link to={`/teams/${previousMatch.teams[0].id}`}>{previousMatch.teams[0]?.name || ""}</Link> vs <Link to={`/teams/${previousMatch.teams[1].id}`}>{previousMatch.teams[1]?.name || ""}</Link></p>
       </div>
       </div>
       <div className='matches--match-lower'>
       <p>{previousMatch.location}</p>
       <p>{previousMatch.description}</p>
       </div>
        
        </div>
        </div>
)}
)}
<div className='matches-header'>
 <h2>Current Matches</h2>
 </div>
 {
        currentMatches.map((currentMatch) => {
            return (
                <div className='matches--match-container' key={currentMatch.id}>
                <div className="matches--match">
                    <div className="matches--match-upper">
                <div className="matches--match-upper-name">
                    <p>{currentMatch.name}</p>
                    </div>
<div className="matches--match-upper-dates">
<p>{currentMatch.date} @ {currentMatch.time}</p>
   </div>
   </div>
   
<div className='matches--match-vs'>
    <div className="matches-match-vs-team">
   <p><Link to={`/teams/${currentMatch.teams[0].id}`}>{currentMatch.teams[0]?.name || ""}</Link> vs <Link to={`/teams/${currentMatch.teams[1].id}`}>{currentMatch.teams[1]?.name || ""}</Link></p>
   </div>
   </div>
   <div className='matches--match-lower'>
   <p>{currentMatch.location}</p>
   <p>{currentMatch.description}</p>
   </div>
    
    </div>
    </div>
)}
)}
<div className='matches-header'>
        <h2>Upcoming Matches</h2>
        </div>
        {
        upcomingMatches.map((upcomingMatch) => {
            return (
                <div className='matches--match-container' key={upcomingMatch.id}>
                <div className="matches--match">
                    <div className="matches--match-upper">
                <div className="matches--match-upper-name">
                    <p>{upcomingMatch.name}</p>
                    </div>
<div className="matches--match-upper-dates">
<p>{upcomingMatch.date} @ {upcomingMatch.time}</p>
   </div>
   </div>
   
<div className='matches--match-vs'>
    <div className="matches-match-vs-team">
   <p><Link to={`/teams/${upcomingMatch.teams[0].id}`}>{upcomingMatch.teams[0]?.name || ""}</Link> vs <Link to={`/teams/${upcomingMatch.teams[1].id}`}>{upcomingMatch.teams[1]?.name || ""}</Link></p>
   </div>
   </div>
   <div className='matches--match-lower'>
   <p>{upcomingMatch.location}</p>
   <p>{upcomingMatch.description}</p>
   </div>
    
    </div>
    </div>
)}
)}
    </div>
    )

}

export default Matches;