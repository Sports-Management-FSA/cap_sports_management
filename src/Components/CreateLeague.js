import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addLeague } from '../store';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// Radio buttons
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// Date Picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const CreateLeague = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leagueName, setLeagueName] = useState('');
  const [leagueSeason, setLeagueSeason] = useState('');
  const [leagueEmail, setLeagueEmail] = useState('');
  const [value, setValue] = useState([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);

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
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField
          required
          id="standard-required"
          label="League Name"
          defaultValue="Hello World"
          variant="standard"
      />
      <TextField
          required
          id="standard-required"
          label="Season Name"
          defaultValue="Hello World"
          variant="standard"
      />
      <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
      />
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">League Access</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Private" control={<Radio />} label="Private" />
          <FormControlLabel value="Public" control={<Radio />} label="Public" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="other"
          />
        </RadioGroup>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateRangePicker']}>
          <DateRangePicker localeText={{ start: 'Start date', end: 'End date' }} />
        </DemoContainer>
      </LocalizationProvider>
      </Box>
    
      {/* <h1>Create a League</h1>
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
      </form> */}
    </div>
  );
};

export default CreateLeague;