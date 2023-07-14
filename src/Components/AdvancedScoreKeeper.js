import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addScorekeeper } from "../store";

const AdvancedScoreKeeper = (props) => {
    const dispatch = useDispatch();
    const team1 = props.match.teams[0];
    const team2 = props.match.teams[1];
    const actions = props.actions;

    const [team1Player, setTeam1Player] = useState("");
    const [team2Player, setTeam2Player] = useState("");
    const [action, setAction] = useState("");

    const handleTeam1Action = (e) => {
        dispatch(addScorekeeper({
            matchId: props.match.id,
            userId: team1Player,
            actionId: action,
            teamId: team1.id
        }))
    }

    const handleTeam2Action = (e) => {
        dispatch(addScorekeeper({
            matchId: props.match.id,
            userId: team2Player,
            actionId: action,
            teamId: team2.id
        }))
    }

    return (
        <div>
            <div>
                <div>
                    <h3>{team1.name} Score Board</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            {
                                actions.map((action) => {
                                    return(
                                        <th>{action.name}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Final Score:</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div>
                <h3>Actions:</h3>
                <select
                    name="actions"
                    id="actions"
                    onChange={(e) => setAction(e.target.value)}>
                    <option value="">--Choose Action--</option>
                    {actions.map((action) => {
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
                    onChange={(e) => setTeam1Player(e.target.value)}>

                    <option value="">--Choose Player--</option>
                    {team1.users.map((player) => {
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
                    onChange={(e) => setTeam2Player(e.target.value)}>
                    <option value="">--Choose Player--</option>
                    {team2.users.map((player) => {
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
