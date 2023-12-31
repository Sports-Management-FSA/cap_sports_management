import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Matches from "./Matches";
import Carousel from "react-bootstrap/Carousel";
import hockey from "../assets/images/hockey.png";

const Landing = () => {
   const matches = useSelector((state) => state.matches.matchesList);
   const teams = useSelector((state) => state.teams.teamsList);

   const today = new Date();
   const upcomingMatches = matches.filter((match) => {
      const matchDate = new Date(match.date);
      return matchDate > today;
   });
   return (
      <div className="landing-container">
         <div className="landing-header"></div>
         {/* <Carousel className="carousel">
                <Carousel.Item interval={4000}>
                    <img
                        className="d-block w-100 h-100"
                        src='/dist/images/hockey.png'
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src=""
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src=""
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}

         <div>
            <div className="landing-matches-header">
               <h2>Upcoming Matches</h2>
            </div>
            {upcomingMatches.map((upcomingMatch) => {
               return (
                  // landing-matches--match-container
                  <div className="landing-features-center" key={upcomingMatch.id}>
                     {/* landing-matches--match */}
                     <div className="landing-feature">
                        <div className="landing-matches--match-upper">
                           <div className="landing-matches--match-upper-name">
                              <p>{upcomingMatch.name}</p>
                           </div>
                           <div className="landing-matches--match-upper-dates">
                              <p>
                                 {upcomingMatch.date} @ {upcomingMatch.time}
                              </p>
                           </div>
                        </div>

                        <div className="landing-matches--match-vs">
                           <div className="landing-matches-match-vs-team">
                              <p>
                                 <Link to={`/teams/${upcomingMatch.teamAid}`}>
                                    {teams.find((team) => team.id === upcomingMatch.teamAid)?.name || ""}
                                 </Link>{" "}
                                 vs{" "}
                                 <Link to={`/teams/${upcomingMatch.teamBid}`}>
                                    {teams.find((team) => team.id === upcomingMatch.teamBid)?.name || ""}
                                 </Link>
                              </p>
                           </div>
                        </div>
                        <div className="landing-matches--match-lower">
                           <p>{upcomingMatch.location}</p>
                           <p>{upcomingMatch.description}</p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <section className="landing-features-center">
            <div className="landing-feature">
               <h4>Create or join leagues</h4>
               <div className="landing-feature-description">
                  <p>fully customizable and interactive</p>
                  <Link to="/leagues">get started now</Link>
               </div>
            </div>
            <div className="landing-feature">
               <h4>Start or join a team</h4>
               <div className="landing-feature-description">
                  <p>feature rich configurations</p>
                  <Link to="/createteam">get started now</Link>
               </div>
            </div>
            <div className="landing-feature">
               <div>
                  <h4>Get real time stats</h4>
               </div>
               <div className="landing-feature-description">
                  <p>stunning visuals and up to date statistics</p>
                  <a href="/">get started now</a>
               </div>
            </div>
            <dialog>What is this doing</dialog>
         </section>
         <div className="landing-loginregister">
            <div>
               <h2>
                  <Link to={"/login"}>LOGIN</Link>
               </h2>
            </div>
            <div>
               <h2>
                  <Link to={"/register"}>REGISTER</Link>
               </h2>
            </div>
         </div>
      </div>
   );
};

export default Landing;
