import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addLeague } from '../store';

const CreateLeague = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [leagueSeason, setLeagueSeason] = useState('');
  const [leagueEmail, setLeagueEmail] = useState('');

  const handleLeagueNameChange = (e) => setLeagueName(e.target.value);
  const handleLeagueSeasonChange = (e) => setLeagueSeason(e.target.value);
  const handleLeagueEmailChange= (e) => setLeagueEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeagueData = {
      name: leagueName,
      season: leagueSeason,
      email: leagueEmail
    };
    dispatch(addLeague(newLeagueData));
    setLeagueName('');
    setLeagueSeason('');
    setLeagueEmail('')
  };

  return (
    <div>
      <h1>Create a League</h1>
      <form onSubmit={handleSubmit}>
        <label>League Name</label>
        <input
          name="leageName"
          value={leagueName}
          onChange={handleLeagueNameChange}
        />
        <label>Season</label>
        <input
          name="leagueSeason"
          value={leagueSeason}
          onChange={handleLeagueSeasonChange}
        />
        <label>Email</label>
        <input
          name="leagueEmail"
          value={leagueEmail}
          onChange={handleLeagueEmailChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLeague;