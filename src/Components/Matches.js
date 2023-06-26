import React from "react";
import { useSelector } from "react-redux";
import { fetchAllMatches } from "../store";

const Matches = () => {
    const matches = useSelector(state => state.matches.matchesList)
    console.log(matches);

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
    <div key={match.id}>
       <p>{match.name}</p>
       <p>{match.date}</p>
       <p>{match.time}</p>
       <p>{match.location}</p>
       <p>{match.description}</p>
        </div>
)}}
)}
 <h2>Current Matches</h2>
 {
        matches.map((match) => {
            if (date === match.date) {
            return (
    <div key={match.id}>
       <p>{match.name}</p>
       <p>{match.date}</p>
       <p>{match.time}</p>
       <p>{match.location}</p>
       <p>{match.description}</p>
        </div>
)}}
)}
        <h2>Upcoming Matches</h2>
        {
        matches.map((match) => {
            if (date < match.date) {
            return (
    <div key={match.id}>
       <p>{match.name}</p>
       <p>{match.date}</p>
       <p>{match.time}</p>
       <p>{match.location}</p>
       <p>{match.description}</p>
        </div>
)}}
)}
    </div>
    )

}

export default Matches;