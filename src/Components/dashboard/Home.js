
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


export function Home({league}) {

  const auth = useSelector(state => state.auth)
    
  return (
        <div className="dashboard__home">
                <div className="dashboard__home-body">
                    <div className="main-body-upper">
                        <div className="widget__container">
                            <div className="widget__cards">
                                <div className="widget__card">
                                    <div className="widget__card-upper">
                                        <p>Total Leagues</p>
                                        <EmojiEventsRoundedIcon className="card-icon" />
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
                                        <MailOutlineRoundedIcon className="card-icon" />
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
                                        <CampaignRoundedIcon className="card-icon" />
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
                        <div className="body-center-inbox">
                            <div className="center-posts-container">
                                <div className="post__card">
                                    <div className="post__card-upper">
                                        <p>Recent Posts</p>
                                    </div>
                                    <div className="post__card-content">
                                        <article>ipsum lorem so far</article>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="center-inbox-container">
                            {/* <Inbox /> */  }
                        </div>
                    </div>
                </div>
                
            </div>);
}
  