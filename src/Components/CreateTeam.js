import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addTeam } from '../store';

const CreateTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {leagueId} = location.state;

  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handleEmailChange = (e) => setTeamEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeamData = {
      name: teamName,
      email: teamEmail,
      leagueId: leagueId,
    };
    dispatch(addTeam(newTeamData));
    setTeamName('');
    setTeamEmail('');
    navigate(`/league/${leagueId}`);
  };

  return (
    <div>
      <h1>Create a team</h1>
      <form onSubmit={handleSubmit}>
        <label>Team Name</label>
        <input
          name="teamName"
          value={teamName}
          onChange={handleTeamNameChange}
        />
        <label>Email</label>
        <input
          name="teamEmail"
          value={teamEmail}
          onChange={handleEmailChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTeam;