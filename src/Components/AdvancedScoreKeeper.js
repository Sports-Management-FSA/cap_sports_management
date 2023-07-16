import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScorekeeper } from "../store";
import { useParams } from "react-router-dom";

const AdvancedScoreKeeper = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const matches = useSelector(state => state.matches.matchesList);
    const leagues = useSelector(state => state.leagues.leaguesList);

    const [team1Player, setTeam1Player] = useState("");
    const [team2Player, setTeam2Player] = useState("");
    const [action, setAction] = useState("");

    const [match, setMatch] = useState(matches.find((match) => { match.id == id }));
    const [league, setLeague] = useState(leagues.find((league) => league.id == match?.leagueId));

    useEffect(() => {
        setMatch(matches.find((match) => match.id == id));
        setLeague(leagues.find((league) => league.id == match?.leagueId));
    }, [id, matches, leagues,])


    const handleTeam1Action = (e) => {
        dispatch(
            addScorekeeper({
                matchId: match.id,
                userId: team1Player,
                actionId: action,
                teamId: match.teams[0].id,
            })
        );
    };

    const handleTeam2Action = (e) => {
        dispatch(
            addScorekeeper({
                matchId: match.id,
                userId: team2Player,
                actionId: action,
                teamId: match.teams[1].id,
            })
        );
    };

    return (
        <div>
            <div>
                <div className="team1Scoreboard">
                    <h3>{match?.teams[0].name} Scoreboard</h3>
                    <h3>
                        Total Score:{" "}
                        {match?.scorekeepers.reduce((acc, score) => {
                            if (score.team.id == match?.teams[0].id && score.action.countPoint) {
                                return acc + score.action.value;
                            } else {
                                return acc;
                            }
                        }, 0)}
                    </h3>
                    <div className="playerScores">
                        {match?.scorekeepers.map((score) => {
                            if (score.team.id == match?.teams[0].id) {
                                return (
                                    <p>
                                        {score.user.firstName} {score.user.lastName} scored a{" "}
                                        {score.action.name}
                                    </p>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="team2Scoreboard">
                    <h3>{match?.teams[1].name} Scoreboard</h3>
                    <h3>
                        Total Score:{" "}
                        {match?.scorekeepers.reduce((acc, score) => {
                            if (score.team.id == match?.teams[1].id && score.action.countPoint) {
                                return acc + score.action.value;
                            } else {
                                return acc;
                            }
                        }, 0)}
                    </h3>
                    <div className="playerScores">
                        {match?.scorekeepers.map((score) => {
                            if (score.team.id == match?.teams[1].id) {
                                return (
                                    <p>
                                        {score.user.firstName} {score.user.lastName} scored a{" "}
                                        {score.action.name}
                                    </p>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>

            <div>
                <h3>Actions:</h3>
                <select
                    name="actions"
                    id="actions"
                    onChange={(e) => setAction(e.target.value)}
                >
                    <option value="">--Choose Action--</option>
                    {league?.category.actions.map((action) => {

                        return (
                            <option key={action.id} value={action.id}>
                                {action.name}
                            </option>
                        );
                    })}
                </select>

                <h3>Team 1:</h3>
                <select
                    name="team1"
                    id="team1"
                    onChange={(e) => setTeam1Player(e.target.value)}
                >
                    <option value="">--Choose Player--</option>
                    {match?.teams[0].users.map((player) => {
                        return (
                            <option key={player.id} value={player.id}>
                                {player.firstName} {player.lastName}
                            </option>
                        );
                    })}
                </select>
                <button onClick={handleTeam1Action}>Add Action</button>

                <h3>Team 2:</h3>
                <select
                    name="actions"
                    id="actions"
                    onChange={(e) => setTeam2Player(e.target.value)}
                >
                    <option value="">--Choose Player--</option>
                    {match?.teams[1].users.map((player) => {
                        return (
                            <option key={player.id} value={player.id}>
                                {player.firstName} {player.lastName}
                            </option>
                        );
                    })}
                </select>
                <button onClick={handleTeam2Action}>Add Action</button>
            </div>
        </div>
    );
};

export default AdvancedScoreKeeper;
