import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScorekeeper, deleteScorekeeper } from "../store";
import { useNavigate, useParams } from "react-router-dom";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const AdvancedScoreKeeper = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const matches = useSelector(state => state.matches.matchesList);
    const leagues = useSelector(state => state.leagues.leaguesList);

    const [team1Player, setTeam1Player] = useState("");
    const [team2Player, setTeam2Player] = useState("");
    const [action1, setAction1] = useState("");
    const [action2, setAction2] = useState("");

    const [match, setMatch] = useState(matches.find((match) => { match.id == id }));
    const [league, setLeague] = useState(leagues.find((league) => league.id == match?.leagueId));
    const actions = leagues.find((league) => league.id == match?.leagueId)?.category?.actions


    useEffect(() => {
        setMatch(matches.find((match) => match.id == id));
        setLeague(leagues.find((league) => league.id === match?.leagueId));
    }, [id, matches, leagues, dispatch])


    const handleTeam1Action = (e) => {
        dispatch(
            addScorekeeper({
                matchId: match.id,
                userId: team1Player,
                actionId: action1,
                teamId: match.teams[0].id,
            })
        )
        navigate(0);
    };

    const handleTeam2Action = (e) => {
        dispatch(
            addScorekeeper({
                matchId: match.id,
                userId: team2Player,
                actionId: action2,
                teamId: match.teams[1].id,
            })
        );
        navigate(0);
    };

    const handleComplete = () => {
        console.log('The')
    }

    const handleRemoveAction = (id) => {
        console.log('THE ID:', id)
        dispatch(deleteScorekeeper(id))
        navigate(0);
    }
    
    


    return (
        <div className="scorekeeper-container">
            <div className="scoreboards-container">
                <div className="team-scoreboard-container">
                    <h3>{match?.teams[0].name} Scoreboard</h3>
                    <div className="playerScores-container">
                        {match?.scorekeepers.map((score) => {
                            if (score.team.id == match?.teams[0].id) {
                                return (
                                    <div className="score-container">
                                        <p>
                                            {score.user.firstName} {score.user.lastName} scored: {score.action.name}
                                        </p>
                                        {/* <button onClick={() => handleRemoveAction(score.id)}>delete</button> */}
                                        <RemoveCircleOutlineIcon onClick={() => handleRemoveAction(score.id)} className="scorekeeper-icon"/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <section className="scorekeeper-lower">
                    <div>
                        <h4>
                            Total Score:{" "}
                            {match?.scorekeepers.reduce((acc, score) => {
                                if (score.team.id == match?.teams[0].id && score.action.countPoint) {
                                    return acc + score.action.value;
                                } else {
                                    return acc;
                                }
                            }, 0)}
                        </h4>
                    </div>
                    <div className="scorekeeper-lower-actions">
                        {/* <h5>{match?.teams[0].name} players:</h5> */}
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
                        <select
                            name="actions"
                            id="actions"
                            onChange={(e) => setAction1(e.target.value)}
                        >
                            <option value="">--Choose Action--</option>
                            {actions?.map((action) => {
                                return (
                                    <option key={action.id} value={action.id}>
                                        {action.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button onClick={handleTeam1Action}>Add Action</button>
                    </div>
                    {/* <div className="scorekeeper-lower-actions">
                        <h5>Actions:</h5>
                        <select
                            name="actions"
                            id="actions"
                            onChange={(e) => setAction1(e.target.value)}
                        >
                            <option value="">--Choose Action--</option>
                            {actions?.map((action) => {
                                return (
                                    <option key={action.id} value={action.id}>
                                        {action.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                    </section>
                </div>
                <div className="team-scoreboard-container">
                    <h3>{match?.teams[1].name} Scoreboard</h3>

                    <div className="playerScores-container">
                        {match?.scorekeepers.map((score) => {
                            if (score.team.id == match?.teams[1].id) {
                                return (
                                    <div className="score-container">
                                        <p>
                                            {score.user.firstName} {score.user.lastName} scored: {score.action.name}
                                        </p>
                                        <button onClick={() => handleRemoveAction(score.id)}>delete</button>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <section className="scorekeeper-lower">
                        <div>
                            <h4>
                                Total Score:{" "}
                                {match?.scorekeepers.reduce((acc, score) => {
                                    if (score.team.id == match?.teams[1].id && score.action.countPoint) {
                                        return acc + score.action.value;
                                    } else {
                                        return acc;
                                    }
                                }, 0)}
                            </h4>
                        </div>
                    <div className="scorekeeper-lower-actions">
                        {/* <h5>{match?.teams[1].name} players:</h5> */}
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
                        <select
                            name="actions"
                            id="actions"
                            onChange={(e) => setAction2(e.target.value)}
                        >
                            <option value="">--Choose Action--</option>
                            {actions?.map((action) => {

                                return (
                                    <option key={action.id} value={action.id}>
                                        {action.name}
                                    </option>
                                );
                            })}
                        </select>
                        <button onClick={handleTeam2Action}>Add Action</button>
                    </div>
                    {/* <div className="scorekeeper-lower-actions">
                        <h5>Actions:</h5>
                        <select
                            name="actions"
                            id="actions"
                            onChange={(e) => setAction2(e.target.value)}
                        >
                            <option value="">--Choose Action--</option>
                            {actions?.map((action) => {

                                return (
                                    <option key={action.id} value={action.id}>
                                        {action.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div> */}
                </section>
            </div>
            <div className="scoreboard-footer">
                <button>End Match</button>
            </div>
            </div>
        </div>
    );
};

export default AdvancedScoreKeeper;
