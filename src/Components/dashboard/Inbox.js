import { all } from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';

const Inbox = () => {

    const allMessages = useSelector(state => state.joinRequests);
    const userLeagueIds = useSelector(state => state.auth.leagues.map(league => league.id));
    const matchedMessages = allMessages.filter(message => userLeagueIds.includes(message.leagueId));
    
    return (
        <div className="inbox__container">
            {matchedMessages.map(message => (
                <div className="inbox__row" key={message.id}>
                    <div className="inbox__row-name">
                        <p>{message.name}</p>
                    </div>
                    <div className="inbox__row-content">
                        <p>{message.subjectLine}</p>
                        <p>{message.description}</p>
                    </div>
                </div>
            ))
            }
        </div>
    );
};

export default Inbox;