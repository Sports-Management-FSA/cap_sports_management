import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTeam, deleteMessage, fetchAllLeagues, fetchAllMessages } from '../../store';

const Inbox = () => {

    const dispatch = useDispatch();
    const [selectedMessage, setSelectedMessage] = useState(null);
    const allMessages = useSelector(state => state.joinRequests);
    const userLeagueIds = useSelector(state => state.auth.leagues.map(league => league.id));
    const matchedMessages = allMessages.filter(message => userLeagueIds.includes(message.leagueId));

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

    const render = (message) => {

        console.log('clicked')
    }

    if (selectedMessage) {
        return (
            <section className="inbox__container">
                <section className="inbox__content">
                    <div className="inbox__content-top">
                        <h4>From: {selectedMessage.name}</h4>
                        <p>Subject: {selectedMessage.subjectLine}</p>
                    </div>
                    <div className="inbox__content-main">
                        <p>{selectedMessage.description}</p>
                    </div>
                    <div className="inbox__content-lower">
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
            {matchedMessages.map(message => (
                <ul onClick={() => setSelectedMessage(message)} className="inbox__row" key={message.id}>
                    <li className="inbox__row-name">{message.name}</li>
                    <li className="inbox__row-content">
                        <p>{message.subjectLine}</p>
                        <p>{message.description}</p>
                    </li>
                    <li className="inbox__row-content">
                        <button onClick={() => handleApprove(message)}>Accept</button>
                        <button onClick={() => handleDecline(message.id)}>Decline</button>
                    </li>
                </ul>
            ))
        }
        </div>
    );
};

export default Inbox;