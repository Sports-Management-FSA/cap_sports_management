import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import leaguesSlice from '../../store/leaguesSlice';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditLeague from './EditLeague';
import { updateLeague } from '../../store/leaguesSlice';


const DashboardLeagues = () => {

    const dispatch = useDispatch();
    // Toggling component
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [activeTab, setActiveTab] = useState("Recent");

    // Used for editting fields
    const [isEditingSeason, setIsEditingSeason] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [editedSeason, setEditedSeason] = useState("");
    const [editedCategory, setEditedCategory] = useState("");
    
    // Renders edit page when toggled to true
    const [editMode, setEditMode] = useState(false);

    const leagues = useSelector(state => state.auth.leagues);
    const allLeagues = useSelector(state => state.leagues.leaguesList);
    const players = useSelector(state => state.players.playerList);
    const categories = useSelector(state => state.categories.categoriesList);

    useEffect(() => {

    },[])

    const handleSubmit = () => {
        const updatedData = {
            season: editedSeason,
        }
        setIsEditingSeason(false)
        dispatch(updateLeague(updatedData))
    }

    if (editMode) {
        return <EditLeague selectedLeague={selectedLeague} onDone={() => setEditMode(false)}  />
    }
    
    if (selectedLeague) {
        const sport = categories.find(category => category.id == selectedLeague.categoryId);
        const matchedTeams = allLeagues.filter(league => league.id == selectedLeague.id)[0].teams;
        
        console.log(matchedTeams)
        const date = new Date(selectedLeague.createdAt)
        return (
                <div className="dash__league-card">
                    <section className="dash__league-card-header">
                        <h5>{selectedLeague.name}</h5>
                        <div>
                            <span>Configure Matches</span>
                            <SettingsRoundedIcon onClick={() => setEditMode(true)} className="dashboard-icon-clickable"/>
                        </div>
                    </section>
                    <section className="dash__league-body">
                        <div className="dash__league-body-label">
                            <h5>Season</h5>
                        </div>
                            {isEditingSeason ? (
                                <div className="dash__league-body-item">
                                    <input
                                        className="dash-input"
                                        value={editedSeason}
                                        onChange={(e) => setEditedSeason(e.target.value)}
                                        placeholder="Fall"
                                    />
                                    {/* <ModeEditRoundedIcon onClick={() => {setIsEditingSeason(false)}}/> */}
                                    <button className="dash-button" onClick={() => 
                                        {dispatch(updateLeague({id: selectedLeague.id, season: editedSeason}));
                                        setIsEditingSeason(false);}}>Save</button>
                                </div>
                            ) : (
                                <div className="dash__league-body-item">
                                    <p>Fall</p>
                                    <ModeEditRoundedIcon onClick={() => {setIsEditingSeason(true)}}/>  
                                </div>
                            )}
                        <div className="dash__league-body-label">
                            <h5>Category</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{sport.name}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Total Teams</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{matchedTeams.length}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Privacy</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{selectedLeague.public ? 'Public' : 'Private'}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Season Length</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{selectedLeague.startDate} to {selectedLeague.endDate}</p>
                        </div>
                        <div className="dash__league-body-label">
                            <h5>Creation Date</h5>
                        </div>
                        <div className="dash__league-body-item">
                            <p>{date.toLocaleString()}</p>
                        </div>
                    </section>
                    <div className="dash__league-lower">
                        <ArrowBackRoundedIcon onClick={() => setSelectedLeague(null)} className="dashboard-icon"/>
                    </div>
                    <Link className="dash__league-link" to={`/league/${selectedLeague.id}`}>View League Page</Link>
                </div>
        )
    }



    const handleClick = (component) => {
        
        setActiveTab(component);
     };

     // Main Table upon openning component tab
    return (
        <div className="dashboard__leagues-container">
            <div className="leagues-title">
                <p>Your Leagues</p>
            </div>
            <table className="dashboard__leagues-table">
                <thead>
                <tr className="leagues-table-row">
                    <th className="leagues-table-header">League Name</th>
                    <th className="leagues-table-header">League Email</th>
                    <th className="leagues-table-header">Current Season</th>
                    <th className="leagues-table-header">Public/Private</th>
                    <th className="leagues-table-header">Duration</th>
                    <th className="leagues-table-header">Edit</th>

                </tr>
                </thead>
                <tbody className="leagues-table-body">
                    {leagues.map((league) => (
                        <tr onClick={() => setSelectedLeague(league)} className="leagues-table-row" key={league.id}>
                            <td className="leagues-table-data">{league.name}</td>                
                            <td className="leagues-table-data">{league.email}</td>                
                            <td className="leagues-table-data">{league.season}</td>                
                            <td className="leagues-table-data">{league.public ? 'Public' : 'Private'}</td>              
                            <td className="leagues-table-data">{league.startDate} - {league.endDate}</td>              
                            <td className="leagues-table-data"><SettingsRoundedIcon className="dashboard-icon"/></td>              
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="leagues-bottom">
                <p>View All</p>
            </div>
        </div>
    );
};

export default DashboardLeagues;