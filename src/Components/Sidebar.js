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
                    {/* <img src={Friends} alt="" /> */}
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
                    {/* <img src={Friends} alt="" /> */}
                    <span>Dashboard</span>
                </div>
                <div className="item">
                    <span>Your Leagues</span>
                </div>
                <div className="item">
                    <span>News Feed</span>
                </div>
            </div>
            {/* <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active text-dark fw-bold" aria-current="page" >Home</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-dark fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Account</a></li>
                        <li><a className="dropdown-item" href="#">Player Profile</a></li>
                        <li><a className="dropdown-item" href="#">Team Manager</a></li>
                        <li><a className="dropdown-item" href="#">League Manager</a></li>
                    </ul>
                    </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fw-bold" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fw-bold" href="#">Your Leagues</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-dark fw-bold" href="#">News Feed</a>
                </li>
            </ul> */}
        </div>
    );
};

export default Sidebar;