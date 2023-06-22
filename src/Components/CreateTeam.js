import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addTeam } from '../store';

const CreateTeam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState('');
  const [teamEmail, setTeamEmail] = useState('');

  const handleTeamNameChange = (e) => setTeamName(e.target.value);
  const handleEmailChange = (e) => setTeamEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeamData = {
      name: teamName,
      email: teamEmail
    };
    dispatch(addTeam(newTeamData));
    setTeamName('');
    setTeamEmail('');
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