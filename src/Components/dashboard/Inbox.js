import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTeam, addPlayer, deleteMessage, fetchAllLeagues, fetchAllMessages, updatePlayer, updateTeam, updateRequest, deleteRequest } from '../../store';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Navigate, useNavigate } from 'react-router-dom';

const Inbox = (props) => {
    const {auth, requests, players} = useSelector(state=>state);
    const user = players.playerList.find(player=>player.id == auth.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [leagueRequests, setLeagueRequests] = useState(requests.requestsList.filter(request=>request.to =='league' && 
    user.user_leagueRoles.find(role=>role.leagueRole.name == 'director' && role.leagueId == request.leagues[0].id)));
    const [teamRequests, setTeamRequests] = useState(requests.requestsList.filter(request=>request.to == 'team' && 
    user.user_teamRoles.find(role=>role.teamRole.name == 'manager' && teamId == request.teams[0].id)));
    const allMessages = [...leagueRequests, ...teamRequests, ...auth.receivedRequests];
    const [activeMessages, setActiveMessages] = useState(leagueRequests);
    const [activeTab, setActiveTab] = useState("league");


    if (!allMessages) {
        return <div>loading</div>
    }

    const handleApprove = async(message) => {
        let role= {};
        switch(message.to){
            case 'player':
                //add auth user to team
                role = {teamId: message.teams[0].id, roleId: 1};
                await dispatch(updatePlayer({id: auth.id, role}));
                break;
            case 'team':
                // add player to team
                role = {teamId: message.teams[0].id, roleId: 1};
                await dispatch(updatePlayer({id: message.senderId, role}));
                break;
            case 'league':
                if(message.from === 'player'){
                    //if desired team selected add to team, else assign to selected team
                    if(message.teams.length > 0){
                        role = {teamId: message.teams[0].id, roleId: 1};
                        await dispatch(updatePlayer({id: message.senderId, role}));
                    } else{
                        //choose team from selection and assign to
                        console.log('need to create selector to assign player to team if no desired team')
                    }
                }else{
                    //add team to league
                    const teamUpdated = {...message.teams[0]};
                    teamUpdated.leagueId = message.leagues[0].id;
                    await dispatch(updateTeam(teamUpdated));
                }
                break;
            default:
        }

        await dispatch(deleteRequest(message.id));

        setLeagueRequests([...requests.requestsList.filter(request=>request.to =='league' && 
            user.user_leagueRoles.find(role=>role.leagueRole.name == 'director' && role.leagueId == request.leagues[0].id) &&
            request.isActive == true)])
       // auth.user_leagueRoles.filter(role=>role.leagueRole.name==='director').forEach(leagueRole=> leagueRequests.push(...leagueRole.league.requests));
        //auth.user_teamRoles.filter(role=>role.teamRole.name==='manager').forEach(teamRole=> teamRequests.push(...teamRole.team.requests));
        setTeamRequests([...requests.requestsList.filter(request=>request.to == 'team' && 
            user.user_teamRoles.find(role=>role.teamRole.name == 'manager' && teamId == request.teams[0].id) &&
            request.isActive == true)])
        
            
    }

    const handleDecline = (id) => {
        dispatch(deleteMessage(id));
    }

    const handleClick = (messageArray, category) => {
        setActiveMessages(messageArray);
        setActiveTab(category);
    };

    if (selectedMessage) {
        return (
            <section className="inbox__container">
                <section className="inbox__content">
                    <div className="inbox__content-top">
                        <h4>From: {selectedMessage.name}</h4>
                        <p>Subject: {selectedMessage.subjectLine}</p>
                        
                        {selectedMessage.teamName && (<p>Email: {selectedMessage.teamEmail}</p>)}
                        {selectedMessage.teamName && (<p>Name: {selectedMessage.teamName}</p>)}
                        {selectedMessage.desiredTeam !== null && (<p>Desired Team: {selectedMessage.desiredTeam}</p>)}
                    </div>
                    <div className="inbox__content-main">
                        <p>{selectedMessage.description}</p>
                    </div>
                    <div className="inbox__content-lower">
                        {/* <button onClick={() => setSelectedMessage(null)}>back</button> */}
                        <ArrowBackRoundedIcon className="dashboard-icon-back" onClick={() => setSelectedMessage(null)}/>
                        <button onClick={() => handleApprove(selectedMessage)}>Accept</button>
                        <button onClick={() => handleDecline(selectedMessage.id)}>Decline</button>
                    </div>
                </section>
            </section>
        )
    }
    
    return (
        <div className="inbox__container">
            <div className="inbox__header">
                <h4>Recent Messages</h4>
                <div className="inbox__header-requests">
                    <p>Total requests:</p>
                    <p>{activeMessages.length}</p>
                </div>
            </div>
            <ul className="stats--navbar-items">
                    <a onClick={() => handleClick(leagueRequests, 'league')} className={activeTab === 'league' ? 'active' : ''}>League Requests</a>
                    <a onClick={() => handleClick(teamRequests, 'team')} className={activeTab === 'players' ? 'active' : ''}>Team Requests</a>
                    <a onClick={() => handleClick(auth.receivedRequests, 'you')} className={activeTab === 'you' ? 'active' : ''} >Your Requests</a>
                </ul> 
                <table className="inbox__table">
                    <thead>
                        <tr className="inbox__row">
                            <th className="inbox-col-name">Name</th>
                            <th className="inbox-col-name">Type</th>
                            <th className="inbox-col-content">Subject</th>
                            <th className="inbox-col-content">Description</th>
                            <th className="inbox-col-content">Decision</th>
                        </tr>
                    </thead>
                    {activeMessages.map(message => (
                        <tbody key={message.id}>
                            <tr className="inbox__row" >
                                <td className="inbox-col-name" onClick={() => setSelectedMessage(message)}>{message.sender.firstName}</td>
                                <td 
                                    className="inbox-col-name"
                                    onClick={() => setSelectedMessage(message)}
                                >{message.desiredTeam !== null ? 'Player' : 'Team'}
                                </td>
                                <td onClick={() => setSelectedMessage(message)} className="inbox-col-content">
                                    <p>{message.subjectLine}</p>
                                </td>
                                <td onClick={() => setSelectedMessage(message)} className="inbox-col-content">
                                    <p>{message.description}</p>
                                </td>
                                <td className="inbox-col-content">
                                    <button onClick={() => handleApprove(message)}>Accept</button>
                                    <button onClick={() => handleDecline(message.id)}>Decline</button>   
                                </td>
                            </tr>
                        </tbody>
                        ))
                    }
            </table>
        </div>
    );
};

export default Inbox;