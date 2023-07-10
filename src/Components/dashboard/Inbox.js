import { all } from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTeam } from '../../store';

const Inbox = () => {
    const dispatch = useDispatch();

    const [toggle, setToggle] = useState(null);
    const [current, setCurrent] = useState('current')

    const allMessages = useSelector(state => state.joinRequests);
    const userLeagueIds = useSelector(state => state.auth.leagues.map(league => league.id));
    const matchedMessages = allMessages.filter(message => userLeagueIds.includes(message.leagueId));
    console.log(matchedMessages);
    const handleClick = (message) => {
        const team = {
            name: message.teamName,
            email: message.teamEmail,
            leagueId: message.leagueId
        }
        dispatch(addTeam(team));
    }
    
    return (
        <div className="inbox__container">
            <div className="inbox__header">
                <h6>Total requests:</h6>
                <p>{matchedMessages.length}</p>
            </div>
            {matchedMessages.map(message => (
                <div className="inbox__row" key={message.id}>
                    <div className="inbox__row-name">
                        <p>{message.name}</p>
                    </div>
                    <div className="inbox__row-content">
                        <p>{message.subjectLine}</p>
                        <p>{message.description}</p>
                    </div>
                    <button onClick={() => handleClick(message)}>Accept</button>
                    <button>Decline</button>
                </div>
            ))
        }
        {current === 'current' && 'not yet' ? '' : ''}
        </div>
    );
};

export default Inbox;