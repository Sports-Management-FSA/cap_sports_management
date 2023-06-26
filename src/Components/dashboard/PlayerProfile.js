import React from 'react';
import { useSelector, useDispatch, Link } from 'react-redux';

const PlayerProfile = () => {
    const auth = useSelector(state => state.auth);

    return (
        <div className="dashboard-player">
            <h2>Player Profile</h2>
            <div className>
                <img src="picture.jpg" alt='Player Profile' />
            </div>
            <div>
                <h3>{auth.firstName} {auth.lastName}</h3>
            </div>
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