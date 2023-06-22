import React from 'react';

const CreatePlayer = (props) => {
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
       dispatch(addUser(player));
       navigate(`/team/${teamId}`);
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
          </form>
        </div>
    )
}

export default CreatePlayer;