
import { useSelector } from "react-redux";
import { DashboardSidebar } from './DashboardSidebar';
import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import Inbox from './Inbox';
import DashboardLeaguesWidget from './DashboardLeaguesWidget';
import Standings from '../Standings';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';


export function Home({league}) {

  const auth = useSelector(state => state.auth);
  const posts = useSelector(state => state.auth.posts)
  console.log(posts)
    
  return (
        <div className="dashboard__home">
                <div className="dashboard__home-body">
                    <div className="main-body-upper">
                        <div className="widget__container">
                            <div className="widget__cards">
                                <div className="widget__card">
                                    <div className="widget__card-upper">
                                        <p>Total Leagues</p>
                                        <EmojiEventsRoundedIcon className="dashboard-icon" />
                                    </div>
                                    <div className="widget__card-center">
                                        <p>{auth.leagues.length}</p>
                                    </div>
                                    <div className="widget__card-lower">
                                        <i>+16%</i>
                                    </div>
                                </div>
                                <div className="widget__card">
                                    <div className="widget__card-upper">
                                        <p>Total Teams</p>
                                        <Groups2RoundedIcon className="dashboard-icon"/>
                                    </div>
                                    <div className="widget__card-center">
                                        <p>{auth.teams.length}</p>
                                    </div>
                                    <div className="widget__card-lower">
                                        <i>+16%</i>
                                    </div>
                                </div>
                                <div className="widget__card">
                                    <div className="widget__card-upper">
                                        <p>New Messages</p>
                                        <MailOutlineRoundedIcon className="dashboard-icon" />
                                    </div>
                                    <div className="widget__card-center">
                                        <p>{auth.leagues.length}</p>
                                    </div>
                                    <div className="widget__card-lower">
                                        <i>+16%</i>
                                    </div>
                                </div>
                                <div className="widget__card">
                                    <div className="widget__card-upper">
                                        <p>New Announcements</p>
                                        <CampaignRoundedIcon className="dashboard-icon" />
                                    </div>
                                    <div className="widget__card-center">
                                        <p>{auth.leagues.length}</p>
                                    </div>
                                    <div className="widget__card-lower">
                                        <i>+16%</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard__leaguedata-container">
                            <DashboardLeaguesWidget league={league} />
                        </div>
                    </div>
                    <div className="main-body-center">
                            <div className="center-posts-container">
                                <div className="post__card">
                                    <div className="post__card-upper">
                                        <p>Recent Posts</p>
                                    </div>
                                        {posts.map(post => (
                                            <div className="post__card-content">
                                               <p>{post.message}</p><span>{post.likes} likes</span>               
                                            </div>
                                        ))}
                                </div>
                            </div>
                        <div className="center-inbox-container">
                            {/* <Inbox /> */  }
                        </div>
                    </div>
                </div>
                
            </div>);
}
  