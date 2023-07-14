import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTeam, addPlayer, deleteMessage, fetchAllLeagues, fetchAllMessages, updatePlayer, updateTeam } from '../../store';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Inbox = () => {

    const dispatch = useDispatch();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const allMessages = useSelector(state => state.joinRequests.messagesList);
    const userLeagueIds = useSelector(state => state.auth.leagues.map(league => league.id));
    const matchedMessages = allMessages.filter(message => userLeagueIds.includes(message.leagueId));

    const leagues = useSelector((state) => state.leagues.leaguesList);

    useEffect(() => {
        
    }, [allMessages, userLeagueIds, matchedMessages])

    if (!allMessages || !userLeagueIds || !matchedMessages) {
        return <div>loading</div>
    }

    const handleApprove = (message) => {
        console.log(message)
        if (message.desiredTeam == null) {
            const team = {
                name: message.teamName,
                email: message.teamEmail,
                leagueId: message.leagueId,
                teamId: message.teamId,
            }
            console.log('this is a team, sent from handleapprove');
            dispatch(updateTeam(team));
        } else {
            console.log('this is a player request')
            const desiredTeam = leagues.find(league=>league.id == message.leagueId).teams.find(team=>team.name == message.desiredTeam);
            const role = {
                teamId: desiredTeam.id,
                teamRoleId: 1,
            }
            dispatch(updatePlayer({id: message.userId, role: role}));
        }
        //do something with message, delete or archive?
    }

    const handleDecline = (id) => {
        dispatch(deleteMessage(id));
    }

    if (selectedMessage) {
        return (
            <section className="inbox__container">
                <section className="inbox__content">
                    <div className="inbox__content-top">
                        <h4>From: {selectedMessage.name}</h4>
                        <p>Subject: {selectedMessage.subjectLine}</p>
                        
                        {selectedMessage.teamName && (<p>Email: {selectedMessage.teamEmail}</p>)}
                        {selectedMessage.teamEmail && (<p>Email: {selectedMessage.teamEmail}</p>)}
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
                    <p>{matchedMessages.length}</p>
                </div>
            </div>
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
                    {matchedMessages.map(message => (
                        <tbody key={message.id}>
                            <tr className="inbox__row" >
                                <td className="inbox-col-name" onClick={() => setSelectedMessage(message)}>{message.name}</td>
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