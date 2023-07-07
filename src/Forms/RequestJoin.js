import React from 'react';

const RequestJoin = () => {
    return (
            <form className='requestform__container'>
                <h4>Request form</h4>
                <div className="requestform__name">
                    <article>This league manager must approve your application</article>
                    <label>Name</label>
                    <input 
                        id="name"
                        placeholder='Your name'
                    />
                </div>
                <div className="div requestform__player">
                    <label > Are you a team or single player?</label>
                    <input type="radio" name="group" value="option1" />
                    <label for="option1">Team</label>
                    <input type="radio" name="group" value="option2" />
                    <label for="option2">Player</label>
                </div>
                <div className="requestform__summary">
                    <label>Please provide a brief summary of yourself and/or your team</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="requestform__btn">
                    <button>Sumbit</button>
                </div>
            </form>  
    );
};

export default RequestJoin;