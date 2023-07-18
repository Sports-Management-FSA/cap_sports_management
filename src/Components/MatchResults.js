import React from "react";
import playersSlice from "../store/playersSlice";

const MatchResults = (props) => {
    const match = props.match;
    const team1scores = match.scorekeepers.filter((score) => score.teamId === match.teams[0].id);
    const team2scores = match.scorekeepers.filter((score) => score.teamId === match.teams[1].id);
    const usedActions = match.scorekeepers.reduce((acc, score) => {
        if ((acc.filter((action) => action.id == score.action.id).length > 0)) {
            console.log("if", acc)
            return acc;
        } else {
            console.log("else", acc)
            return [...acc, score.action];
        }
    }, [])

    return (
        <div>
            <div>
                <div>
                    <p>Final Results</p>
                </div>
                <div>
                    <div><p>{match.teams[0].name} final score</p></div>
                    <table>
                        <thead>
                            <tr>
                                <th>Player</th>
                                {
                                    usedActions.map((action) => {
                                        return (
                                            <th>{action.name}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MatchResults;