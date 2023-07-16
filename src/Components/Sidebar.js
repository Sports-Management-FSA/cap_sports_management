import React from 'react';
import { Link } from 'react-router-dom';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import ScoreboardRoundedIcon from '@mui/icons-material/ScoreboardRounded';

const Sidebar = () => {
    return (
        <div className="sidebar__container">
            <div className="menu">
                <span>Home</span>
                <div className="item">
                    <AssignmentIndRoundedIcon className="dashboard-icon"/>
                    <Link className="item-link" to="/profile">Profile</Link>
                </div>
                <div className="item">
                    <ScoreboardRoundedIcon className="dashboard-icon" />
                    <span>Your Leagues</span>
                </div>
            </div>
            <hr />
            <div className="menu">
                <span>Browse</span>
                <div className="item">
                    <ManageAccountsRoundedIcon className="dashboard-icon" />
                    <Link className="item-link" to="/home">Leagues</Link>
                </div>
                <div className="item">
                    <CategoryRoundedIcon className="dashboard-icon"/>
                    <Link className="item-link" to="/home">Categories</Link>
                </div>
            </div>
            <hr />
            <div className="menu">
                <span>Locker Room</span>
                <div className="item">
                  <DashboardRoundedIcon className="dashboard-icon"/>
                  <Link className="item-link" to={'/dashboard'} >Dashboard</Link>
                </div>
                <div className="item">
                    <ArticleRoundedIcon className="dashboard-icon" />
                    <span>News Feed</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;