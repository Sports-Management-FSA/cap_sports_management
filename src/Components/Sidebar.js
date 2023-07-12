import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar__container">
            <div className="menu">
                <span>Home</span>
                <div className="item">
                    <span>Profile</span>
                </div>
                <div className="item">
                    <span>Your Leagues</span>
                </div>
            </div>
            <hr />
            <div className="menu">
                <span>Browse</span>
                <div className="item">
                    <span className="nav-link">
                        <Link to="/home">Leagues</Link>
                    </span>
                </div>
                <div className="item">
                    <span>Sports</span>
                </div>
                <div className="item">
                    <span>Categories</span>
                </div>
            </div>
            <hr />
            <div className="menu">
                <span>Locker Room</span>
                <div className="item">
                  <Link to={'/dashboard'}>Dashboard</Link>
                </div>
                <div className="item">
                    <span>Your Leagues</span>
                </div>
                <div className="item">
                    <span>News Feed</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;