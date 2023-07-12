import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTeam, deleteMessage, fetchAllLeagues, fetchAllMessages } from '../../store';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const Inbox = () => {

    const dispatch = useDispatch();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const allMessages = useSelector(state => state.joinRequests);
    const userLeagueIds = useSelector(state => state.auth.leagues.map(league => league.id));
    const matchedMessages = allMessages.filter(message => userLeagueIds.includes(message.leagueId));
    console.log(matchedMessages)


    useEffect(() => {
        fetchAllMessages();
        fetchAllLeagues();
    }, [allMessages, userLeagueIds, matchedMessages])

    if (!allMessages || !userLeagueIds || !matchedMessages) {
        return <div>loading</div>
    }

    const handleApprove = (message) => {
        const team = {
            name: message.teamName,
            email: message.teamEmail,
            leagueId: message.leagueId
        }
        dispatch(addTeam(team));
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
                        <span>Subject: </span><p>{selectedMessage.subjectLine}</p>
                        <p>Team Name: {selectedMessage.teamName}</p>
                        <p>Email: {selectedMessage.teamEmail}</p>
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
            {matchedMessages.map(message => (
                    <tr  className="inbox__row" key={message.id}>
                        <td className="inbox-col-name">{message.name}</td>
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
                ))
            }
            </table>
        </div>
    );
};

export default Inbox;