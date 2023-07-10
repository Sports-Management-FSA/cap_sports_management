import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addMessage } from '../store';

const RequestJoin = () => {
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [messageUserName, setMessageUserName] = useState("");
    const [messageSubject, setMessageSubject] = useState("");
    const [messageSummary, setMessageSummary] = useState("");
    const [messageTeamName, setMessageTeamName] = useState("");
    const [messageEmail, setMessageEmail] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessageData = {
            name: messageUserName,
            subjectLine: messageSubject,
            description: messageSummary,
            teamName: messageTeamName,
            teamEmail: messageEmail,
            leagueId: id,
        }
        console.log(newMessageData);
        dispatch(addMessage(newMessageData))
        setMessageUserName("");
        setMessageSubject("");
        setMessageSummary("");
    }

    return (
            <form onSubmit={handleSubmit} className='requestform__container'>
                <h4>Request form</h4>
                <div className="requestform__upper">
                    <article>This league manager must approve your application</article>
                    <div className="requestform__upper-item">
                        <label>Name</label>
                        <input 
                            id="name"
                            value={messageUserName}
                            onChange={(e) => setMessageUserName(e.target.value)}
                            placeholder='Your name'
                        />
                    </div>
                    <div className="requestform__upper-item">
                        <label>Team Name</label>
                        <input 
                            id="name"
                            value={messageTeamName}
                            onChange={(e) => setMessageTeamName(e.target.value)}
                            placeholder='Team Name'
                        />
                    </div>
                    <div className="requestform__upper-item">
                        <label>Contact Email</label>
                        <input 
                            id="name"
                            value={messageEmail}
                            onChange={(e) => setMessageEmail(e.target.value)}
                            placeholder='Email'
                        />
                    </div>
                </div>
                <div className="requestform__summary">
                    <label>Subject:</label>
                    <input 
                        id="subject"
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                        placeholder="Subject"
                    />
                    <label>Please provide a brief summary of yourself and/or your team</label>
                    <textarea 
                        id="summary"
                        value={messageSummary} 
                        cols="30" 
                        rows="10"
                        onChange={(e) => setMessageSummary(e.target.value)}
                        >
                    </textarea>
                </div>
                <div className="requestform__btn">
                    <button>Sumbit</button>
                </div>
            </form>  
    );
};

export default RequestJoin;