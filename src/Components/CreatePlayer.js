import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addPlayer } from '../store';

const CreatePlayer = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {teamId} = props;

    const create = async(ev)=>{
        ev.preventDefault();
        const player={
            firstName: ev.target.firstName.value,
            lastName: ev.target.lastName.value,
            email: ev.target.email.value,
            isPlayer: true,
            teamId: teamId,
        };
       dispatch(addPlayer(player));
       navigate(`/teams/${teamId}`);
    }

    return(
        <div>
             <form onSubmit={create}>
             <div className='form-inputs'>
                    <label>First Name: </label>
                    <input name='firstName' placeholder='required' required/>
                </div>
                <div className='form-inputs'>
                    <label>Last Name: </label>
                    <input name='lastName' placeholder='required' required/>
                </div>
                <div className='form-inputs'>
                    <label>Email: </label>
                    <input name='email' placeholder='required' required/>
                </div>
                <button type="submit">Submit</button>
          </form>
        </div>
    )
}

export default CreatePlayer;