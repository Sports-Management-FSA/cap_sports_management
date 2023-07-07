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


    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessageData = {
            name: messageUserName,
            subjectLine: messageSubject,
            description: messageSummary,
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
                <div className="requestform__name">
                    <article>This league manager must approve your application</article>
                    <label>Name</label>
                    <input 
                        id="name"
                        value={messageUserName}
                        onChange={(e) => setMessageUserName(e.target.value)}
                        placeholder='Your name'
                    />
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