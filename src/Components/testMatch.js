import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../store";
import Scorekeeper from "./Scorekeeper";

//Props require teams = leagueTeams league = league
const TestMatch = () => {
    const matches = useSelector(state => state.matches.matchesList);
  return (
    <div>
        <Scorekeeper match = {matches[0]}/>
    </div>
  );
};

export default TestMatch;