import React from 'react';
import SetMatch from '../SetMatch';
import { useSelector } from 'react-redux';

const EditLeague = ({ selectedLeague, onDone }) => {
    
    const leagues = useSelector(state => state.leagues.leaguesList);
    const league = leagues.find(league => league.id == selectedLeague.id);
    console.log(league)

    return (
        <div className="editleague__container">
            <SetMatch league={league} teams={league.teams} onDone={onDone}/>
        </div>
    );
};

export default EditLeague;