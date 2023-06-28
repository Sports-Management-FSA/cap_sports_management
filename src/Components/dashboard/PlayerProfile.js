import React from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';

const PlayerProfile = () => {
    const auth = useSelector(state => state.auth);

    return (
        <div className="dashboard-player">
            <div className='dashboard-profile-picture'>
                <img src="picture.jpg" alt='Player Profile' />
            </div>
            <h2>{auth.firstName} {auth.lastName}</h2>
            <hr />
            <div>
                <h2>Player Info</h2>
            </div>
            <div>
                <h2>Team List</h2>
            </div>
        </div>
    );
};

export default PlayerProfile;