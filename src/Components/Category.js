import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Category = () => {
   const { auth, leagues } = useSelector((state) => state);
   const categoryLeagues = leagues.filter(league=>league.category.id==id);
   const {id} = useParams();
   const dispatch = useDispatch();

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
               {categoryLeagues.leaguesList?.map((league, idx) => (
                  <div className="home-league-card" key={idx}>
                     <div>
                        <img src={window.location.origin + `${league.logo}`} width="170" height="160" alt="Image" />
                     </div>
                     <div className="home-league-card-text">
                        <div className="home-card-text-name">
                           <Link to={`/league/${league.id}`}>
                              <h4>{league.name}</h4>
                           </Link>
                        </div>
                        <div className="home-card-text-subtext">
                           <p>Season: {league.season}</p>
                           <p>{categoryLeagues.leaguesList.length} Teams</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Category;
