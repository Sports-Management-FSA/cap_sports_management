import React, { useState } from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
   const { auth, leagues } = useSelector((state) => state);
   let leaguesList = leagues.leaguesList;
   const {categories} = useSelector((state) => state);
   const [category, setCategory] = useState('');
   const topCategories = categories.categoriesList.toSorted((a, b) => a.leagues.length > b.leagues.length ? -1: 0).slice(0, 5);

   if(category !== ''){
      leaguesList = categories.categoriesList.find(el=>el.name === category).leagues;
   }

   const handleClick = (ev) => {
      ev.preventDefault();
      setCategory(ev.target.value);
   };
   
   return (
      <div className="home-container">
         <div className="home-popular">
            <div className="section-titles">
               <h3>Popular League Categories</h3>
            </div>
            <div className="home-popular-cards">
               {topCategories.map((category)=>(
                  <button onClick={handleClick} value={category.name} key={category.id}>{category.name}</button>
               ))}
            </div>
         </div>
         <div className="home-leagues">
            <div className="home-leagues-header">
               <div className="home-leagues-header-left">
                  <div>
                     <h1>Leagues</h1>
                  </div>
                  <div className="search-bar">
                     <input placeholder="Search Leagues" />
                  </div>
               </div>
               <Link to="/createleague" style={{ textDecoration: 'none' }}>Create League</Link>
            </div>
            <div className="home-leagues-cards">
               {leaguesList?.map((league, idx) => (
                  <div className="card" style={{width:"14rem"}} key={idx}>
                     <Link to={`/league/${league.id}`}>
                        <div className="card-image">
                           <img src={window.location.origin + `${league.logo}`} width="180" height="140" alt="Image" />
                        </div>
                        <div  className="card-body d-flex justify-content-center flex-column ">
                           <h5 className="card-title">{league.name}</h5>
                           <h6 className="card-subtitle mb-2 text-body-secondary">{league.season}</h6>
                           <p className="card-subtitle mb-2 text-body-secondary">{league.teams.length} {league.teams.length === 1 ? "Team": "Teams"}</p>      
                        </div>
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Home;
