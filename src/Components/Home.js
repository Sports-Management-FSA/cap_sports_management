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
               <div className="home-leagues-header-left">
                  <div>
                     <h1>Leagues</h1>
                  </div>
                  <div>
                     <input placeholder="Search Leagues" />
                  </div>
               </div>
               <Link to="/createleague">Create League</Link>
            </div>
            <div className="home-leagues-cards">
               {leagues.leaguesList?.map((league, idx) => (
               <div key={idx} className="card" style={{width: "18rem"}} >
                     <div className="card-body d-flex justify-content-center flex-column ">
                        <h5 className="card-title">{league.name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{league.season}</h6>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        
                        <a href="#" className="card-link">Another link</a>
                     </div>
                  </div>
                  // <div className="home-league-card" key={idx}>
                  //    <div>
                  //       <img src={window.location.origin + `${league.logo}`} width="170" height="160" alt="Image" />
                  //    </div>
                  //    <div className="home-league-card-text">
                  //       <div className="home-card-text-name">
                  //          <Link to={`/league/${league.id}`}>
                  //             <h4>{league.name}</h4>
                  //          </Link>
                  //       </div>
                  //       <div className="home-card-text-subtext">
                  //          <p>Season: {league.season}</p>
                  //          <p>{leagues.leaguesList.length} Teams</p>
                  //       </div>
                  //    </div>
                  // </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Home;
