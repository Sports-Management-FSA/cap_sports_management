import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addMessage } from '../store';

const RequestJoin2 = () => {

    const { id } = useParams();
    console.log(id)

    const [role, setRole] = useState("");
    const [messageUserName, setMessageUserName] = useState("");
    const [messageSubject, setMessageSubject] = useState("");
    const [messageSummary, setMessageSummary] = useState("");
    const [messageTeamName, setMessageTeamName] = useState("");
    const [messageEmail, setMessageEmail] = useState("");


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
      setRole(e.target.value);
    };

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
        dispatch(addMessage(newMessageData));
        setMessageUserName("");
        setMessageSubject("");
        setMessageSummary("");
        setMessageTeamName("");
        setMessageEmail("");
    }

    const renderForm = () => {
        if (role === "player") {
          return (
            <div>
              <label>Player Name</label>
              <input type="text" name="playerName" />
              {/* Any other player specific fields */}
            </div>
          );
        } else if (role === "team") {
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
        }
      };

      const renderRoleSelection = () => {
        if (role === "") {
          return (
            <div>
              <label>Select your role</label>
              <select value={role} onChange={handleRoleChange}>
                <option value="">Select...</option>
                <option value="player">Player</option>
                <option value="team">Team</option>
              </select>
            </div>
          );
        } else {
          return null;
        }
      };

    return (
        <div className="requestform__container">
            {renderRoleSelection()}
            {renderForm()}
        </div>
    );
};

export default RequestJoin2;