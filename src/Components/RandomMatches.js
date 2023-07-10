import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMatch } from "../store";

const RandomMatch = (props) => {
  const dispatch = useDispatch();
  const teams = [...props.teams]
  const match = {
    name: '',
    description: '',
    leagueId: props.league.id
  }

  const handleRandomMatches = () => {
    teams.sort(() => 0.5 - Math.random());
    let count = 1
    for(let i = 0; i<teams.length; i++){
        for(let x = i+1; x<teams.length; x++){
            match.name = `Match ${count}`;
            match.description = `A match between ${teams[x].name} and ${teams[i].name}`
            dispatch(addMatch({match, team1: teams[x], team2: teams[i]})) 
            count++;
        }
    }
    count=0;
  };

  return (
    <div>
      <div>
        <h3>Randomize Matches</h3>
        <button onClick={handleRandomMatches}>Randomize</button>
      </div>
    </div>
  );
};

export default RandomMatch;
