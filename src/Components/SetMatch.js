import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMatch } from "../store";
import { toast } from 'react-toastify';

//Props require teams = leagueTeams league = league
const SetMatch = (props) => {

  const dispatch = useDispatch();

  const [team1, setTeam1] = useState({});
  const [team2, setTeam2] = useState({});
  const [match, setMatch] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    leagueId: props.league.id
  });

  const handleSubmitMatch = (ev) => {
    ev.preventDefault();
    if (checkEmpty() || checkSame()) {
      console.log("Not a valid match");
    } else {
      dispatch(addMatch({ match, team1, team2 }));
    }
  };

  const checkEmpty = () => {
    for (let key in match) {
      if (match[key] === "" || match[key] === undefined) {
        return true;
      }
    }
    return false;
  };

  const checkSame = () => {
    if (team1 === team2) {
      console.log("You need two different teams for a match");
      return true;
    } else {
      return false;
    }
  };

  const notify = () => toast("Saved!",{
    className: 'custom-toast',
    position: "top-center",
    autoClose: 2000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    theme: "light",
});

  return (
    <div className="setmatch__container">
      <form className="setmatch__form" onSubmit={handleSubmitMatch}>
        <div className="setmatch__team1">
          <h4>Team 1</h4>
            <select
              name="team1"
              id="team1"
              onChange={(e) =>
                setTeam1(props.teams.find((team) => team.id == e.target.value))
              }
            >
              <option value="">--Choose Team--</option>
              {props.teams.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="setmatch__team2">
            <h4>Team 2</h4>
            <select
              name="team2"
              id="team2"
              onChange={(e) =>
                setTeam2(props.teams.find((team) => team.id == e.target.value))
              }
            >
              <option value="">--Choose Team--</option>
              {props.teams.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                );
              })}
            </select>
          </div>
        <div className="setmatch__main">
          <div className="setmatch__main-items">
            <label htmlFor="">Match Name:</label>
              <input
                type="text"
                value={match.name}
                onChange={(e) => setMatch({ ...match, name: e.target.value })}
              />
          </div>
          <div className="setmatch__main-items">
            <label htmlFor="">Description:</label>
              <input
                type="text"
                value={match.description}
                onChange={(e) =>
                  setMatch({ ...match, description: e.target.value })
                }
              />
          </div>
          <div className="setmatch__main-items">
            <label htmlFor="">Date:</label>
              <input
                type="date"
                value={match.date}
                onChange={(e) => setMatch({ ...match, date: e.target.value })}
              />
          </div>
          <div className="setmatch__main-items">
            <label htmlFor="">Time:</label>
              <input
                type="time"
                value={match.time}
                onChange={(e) => setMatch({ ...match, time: e.target.value })}
              />
          </div>
          <div className="setmatch__main-items">
            <label htmlFor="">Location:</label>
              <input
                type="text"
                value={match.location}
                onChange={(e) => setMatch({ ...match, location: e.target.value })}
              />
          </div>
        </div>
        <div>
          <button type="submit" onClick={notify}>Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default SetMatch;
