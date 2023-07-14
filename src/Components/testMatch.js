import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../store";
import Scorekeeper from "./Scorekeeper";
import AdvancedScoreKeeper from "./AdvancedScoreKeeper";

//Props require teams = leagueTeams league = league
const TestMatch = () => {
    const matches = useSelector(state => state.matches.matchesList);
    const categories = useSelector(state => state.categories.categoriesList)
  return (
    <div>
        {/* <Scorekeeper match = {matches[0]}/> */}
        <AdvancedScoreKeeper match = {matches[0]} actions = {categories[0].actions} />
    </div>
  );
};

export default TestMatch;