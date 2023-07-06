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
      email: leagueEmail,
      public: e.target.visibility.value
    };
    console.log(newLeagueData)
    dispatch(addLeague(newLeagueData));
    setLeagueName('');
    setLeagueSeason('');
    setLeagueEmail('');
    navigate('/')
  };

  return (
    <div className="createleague">
      <div className="createleague__header">
        <h1>Create your league</h1>
      </div>
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
        <p>Visibility</p>
        <fieldset data-role="controlgroup fieldcontain" data-type="horizontal">
        <input type="radio"  name="visibility" value='true'/>
        <label htmlFor="public">Public  </label>
        <input type="radio"  name="visibility" value='false'/>
        <label htmlFor="private">Private </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLeague;