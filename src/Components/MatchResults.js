import React from "react";
import playersSlice from "../store/playersSlice";

const MatchResults = (props) => {
    const match = props.match
    const team1Score = match.scorekeepers.reduce((acc, score) => {
        if (score.team.id === match.teams[0].id && score.action.countPoint) {
            return acc + score.action.value;
        } else {
            return acc;
        }
    }, 0)

    const team2Score = match.scorekeepers.reduce((acc, score) => {
        if (score.team.id === match.teams[1].id && score.action.countPoint) {
            return acc + score.action.value;
        } else {
            return acc;
        }
    }, 0)

    const team1Actions = match.scorekeepers.filter((score) => score.team.id === match.teams[0].id)
    const team2Actions = match.scorekeepers.filter((score) => score.team.id === match.teams[1].id)

    return (
        <>
            <div className="final-results-container">
                <div className="team1-results-container">
                    <p>{match.teams[0].name}</p>
                    <p className="results-scores">{team1Score}</p>
                    {team1Actions.map((score) => {
                        return (
                            <p>{score.user.firstName.toUpperCase()} {score.user.lastName.toUpperCase()}---{score.action.name}</p>
                        )
                    })}
                </div>
                <div className="final-results-title"><h3>Final Score</h3></div>
                <div className="team2-results-container">
                    <p>{match.teams[1].name}</p>
                    <p className="results-scores">{team2Score}</p>
                    {team2Actions.map((score) => {
                        return (
                            <p>{score.user.firstName.toUpperCase()} {score.user.lastName.toUpperCase()}---{score.action.name}</p>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MatchResults;