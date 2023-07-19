import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import SportsFootballOutlinedIcon from "@mui/icons-material/SportsFootballOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import { fetchAllPlayers } from "../store";

const Landing3 = () => {
   const dispatch = useDispatch();
   const { leagues, categories } = useSelector((state) => state);

   useEffect(() => {
      dispatch(fetchAllPlayers());
   }, [dispatch]);

   return (
      <div className="body">
         <section id="section1">
            <div className="landing_container">
               <div className="landing_text_photo">
                  <div className="landing_header">
                     <h1>Build.</h1>
                     <h1>Play.</h1>
                     <h1>Connect.</h1>
                     <p>
                        Unlock the realm of competive <span>sports and esports</span>
                     </p>
                  </div>

                  <div className="landing_photo"></div>
               </div>

               <div className="about_section">
                  <div className="basketball_photo"></div>
                  {/* <div className="photo-overlay"></div> */}
                  <div className="section1-description">
                     <h5>
                        Effortlessly create and manage leagues and teams, or seamlessly join existing ones. Engage in
                        real-time communication, chat with fellow players, and stay connected to your community. Dive
                        into comprehensive statistics and receive live updates on the latest game stats, keeping you at
                        the forefront of every thrilling moment.
                     </h5>
                  </div>
               </div>
            </div>
         </section>
         <section id="section2">
            <div className="sports_icons">
               <div>
                  <SportsBaseballOutlinedIcon style={{ fontSize: "4rem" }} />
                  Baseball
               </div>
               <div>
                  <SportsFootballOutlinedIcon style={{ fontSize: "4rem" }} />
                  Football
               </div>
               <div>
                  <SportsEsportsOutlinedIcon style={{ fontSize: "4rem" }} />
                  Esports
               </div>
               <div>
                  <SportsBasketballOutlinedIcon style={{ fontSize: "4rem" }} />
                  Basketball
               </div>
               <div>
                  <SportsSoccerOutlinedIcon style={{ fontSize: "4rem" }} />
                  Soccer
               </div>
            </div>
            <div className="section2_photos">
               <div className="home_photo">
                  <div className="photo-overlay">
                     <Link to="/home" className="photo-caption">
                        Join a league and start a team now
                     </Link>
                  </div>
                  {/* <div className="cover"> */}

                  {/* </div> */}
               </div>
               <div className="leagues_photo">
                  <div className="photo-overlay">
                     <Link to="/matches" className="photo-caption">
                        Checkout upcoming matches
                     </Link>
                  </div>
               </div>
               {/* <div className="scorekeeper_photo">
                  <div className="photo-overlay">
                     <Link to="/scorekeeper" className="photo-caption">
                        Keep track of the game with Scorekeeper{" "}
                     </Link>
                  </div>
               </div> */}
            </div>
         </section>
      </div>
   );
};

export default Landing3;
