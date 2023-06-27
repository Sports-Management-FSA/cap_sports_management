import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Home = () => {
   const { auth, leagues } = useSelector((state) => state);
   const dispatch = useDispatch();

   console.log(auth);

   return (
      <div className="home-container">
         <h1>Podium</h1>
         <div>
            {auth.username ? (
               <div>
                  Welcome {auth.username}!!
                  <button onClick={() => dispatch(logout())}>Logout</button>
               </div>
            ) : (
               <div>
                  <button>
                     <Link to="/login">Login</Link>
                  </button>
               </div>
            )}
         </div>
         <div className="home-popular">
            <div className="section-titles">
               <h3>Popular League Categories</h3>
            </div>
            <div className="home-popular-cards">
               <a href="/">Esports</a>
               <a href="/">Baseball</a>
               <a href="/">Soccer</a>
               <a href="/">Football</a>
               <a href="/">Cricket</a>
            </div>
         </div>
         <div className="home-leagues">
            <div className="home-leagues-header">
               <div>
                  <h1>Leagues</h1>
               </div>
               <div>
                  <Link to="/createleague">Create League</Link>
               </div>
            </div>
            <div className="home-leagues-cards">
               {leagues.leaguesList?.map((league, idx) => (
                  <div className="home-league-card" key={idx}>
                     <div>
                        <h2>IMAGE HERE</h2>
                     </div>
                     <div className="home-league-card-text">
                        <div className="home-card-text-name">
                           <Link to={`/league/${league.id}`}>
                              <h4>{league.name}</h4>
                           </Link>
                        </div>
                        <div className="home-card-text-subtext">
                           <p>Season: {league.season}</p>
                           <p>{leagues.leaguesList.length} Teams</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Home;
