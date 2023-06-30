import React, {useState} from 'react';
import { Typography, Tab, Tabs, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';
import { ReactReduxContext, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Standings from './Standings';
import Roster from './Roster';

const Team2 = () => {

  const {id} = useParams();
  const [currentComponent, setCurrentComponent] = useState('Home');
  const [activeTab, setActiveTab] = useState('Standings');
  
  const teams = useSelector(state=>state.teams.teamsList);
  const team = teams.find(team=> team.id == id);
  const leagues = useSelector(state=>state.leagues.leaguesList);
  
  
  

  const handleClick = (componentAndTab) => {
      setCurrentComponent(componentAndTab)
      setActiveTab(componentAndTab);
  }

  if(!team || !id) {
      return <div>loading</div>
  }
  const league = leagues.find(league => league.id == team.leagueId);
  return (
<>
<CssBaseline />
<AppBar position="relative">
  <Toolbar >
    <Typography variant="h2"> {team.name} </Typography>
  </Toolbar>
</AppBar>
<main>
  <div>
 <Tabs centered>
  <Tab onClick={() => handleClick('Standings') } className={activeTab === 'Standings' ? 'active' : ''} label="Standing" />
  <Tab onClick={() => handleClick('Roster')} className={activeTab === 'Roster' ? 'active' : ''} label="Roster" />
  <Tab onClick={() => handleClick('Schedule')} className={activeTab === 'Schedule' ? 'active' : ''} label="Schedule" />
  <Tab onClick={() => handleClick('Stats')} className={activeTab === 'Stats' ? 'active' : ''}label="Stats" />
  <Tab onClick={() => handleClick('News Feed')} className={activeTab === 'News Feed' ? 'active' : ''} label="News Feed" />
  <Tab onClick={() => handleClick('Media')} className={activeTab === 'Media' ? 'active' : ''} label="Media" />
  <Tab onClick={() => handleClick('About')} className={activeTab === 'About' ? 'active' : ''} label="About" /> 
</Tabs> 
    </div>
</main>

<div className="team__content-body">
                    {currentComponent === "Standings" && <Standings teams={league.teams} />}
                    {currentComponent === "Roster" && <Roster users={team.users}/>}
                    {currentComponent === "Schedule" && "coming soon"}
                    {currentComponent === "Stats" && "coming soon"}
                    {currentComponent === "News Feed" && "coming soon"}
                    {currentComponent === "Media" && "coming soon"}
                    {currentComponent === "About" && "coming soon"}
                </div>
</>

  )
}

export default Team2;