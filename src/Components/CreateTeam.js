import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addTeam } from '../store';
import { useParams } from 'react-router-dom';

const CreateTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  console.log(id)

  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handleEmailChange = (e) => setTeamEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeamData = {
      name: teamName,
      email: teamEmail,
      leagueId: id,
    };
    dispatch(addTeam(newTeamData));
    setTeamName('');
    setTeamEmail('');
    navigate(`/league/${id}`);
  };

  return (
    <div className="form__createteam">
      <h1>Create a team</h1>
      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input
          name="teamName"
          value={teamName}
          onChange={handleTeamNameChange}
          placeholder="enter a team name"
        />
        <label>Email</label>
        <input
          name="teamEmail"
          value={teamEmail}
          onChange={handleEmailChange}
          placeholder="email address"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTeam;