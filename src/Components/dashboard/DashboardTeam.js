import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import leaguesSlice from '../../store/leaguesSlice';
import teamsSlice, { updateTeam } from '../../store/teamsSlice';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditLeague from './EditLeague';
import { updateLeague } from '../../store/leaguesSlice';

const DashboardTeam = () => {

    const dispatch = useDispatch();
    // // Toggling component
    // const [selectedLeague, setSelectedLeague] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null);
    // const [activeTab, setActiveTab] = useState("Recent");

    // // Used for editting fields
    // const [isEditingSeason, setIsEditingSeason] = useState(false);
    // const [isEditingCategory, setIsEditingCategory] = useState(false);
    // const [editedSeason, setEditedSeason] = useState("");
    // const [editedCategory, setEditedCategory] = useState("");
    
    // // Renders edit page when toggled to true
    // const [editMode, setEditMode] = useState(false);

    // const leagues = useSelector(state => state.auth.leagues);
    const teams = useSelector(state => state.auth.teams)
    console.log("teams", teams);
    // const allLeagues = useSelector(state => state.leagues.leaguesList);
    // const allTeams = useSelector(state => state.teams.teamsList);
    // const players = useSelector(state => state.players.playerList);
    // const categories = useSelector(state => state.categories.categoriesList);

    // useEffect(() => {

    // },[])

    // const handleSubmit = () => {
    //     const updatedData = {
    //         season: editedSeason,
    //     }
    //     setIsEditingSeason(false)
    //     dispatch(updateLeague(updatedData))
    // }

    // if (editMode) {
    //     return <EditLeague selectedLeague={selectedLeague} onDone={() => setEditMode(false)}  />
    // }
    
    // if (selectedTeam) {
    //     const sport = categories.find(category => category.id == selectedTeam.categoryId);
    //     const matchedTeams = allTeams.filter(team => team.id == selectedTeam.id)[0];
        
   
    // const handleClick = (component) => {
        
    //     setActiveTab(component);
    //  };

    return (
        <div className="dashboard__leagues-container">
            <div className="leagues-title">
                <p>Your Teams</p>
            </div>
            <table className="dashboard__leagues-table">
                <thead>
                <tr className="leagues-table-row">
                    <th className="leagues-table-header">Team Name</th>
                    <th className="leagues-table-header">Team Email</th>
                    <th className="leagues-table-header">Public/Private</th>
                    <th className="leagues-table-header">Games Won</th>
                    <th className="leagues-table-header">Games Lost</th>
                    <th className="leagues-table-header">Edit</th>

                </tr>
                </thead>
                <tbody className="leagues-table-body">
                    {teams.map((team) => (
                        <tr onClick={() => setSelectedTeam(team)} className="leagues-table-row" key={team.id}>
                            <td className="leagues-table-data">{team.name}</td>                
                            <td className="leagues-table-data">{team.email}</td>                
                            <td className="leagues-table-data">{team.public ? 'Public' : 'Private'}</td>              
                            <td className="leagues-table-data">{team.gamesWon}</td>       
                            <td className="leagues-table-data">{team.gamesLost}</td>        
                            <td className="leagues-table-data"><SettingsRoundedIcon className="dashboard-icon"/></td>              
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    );
};

export default DashboardTeam;