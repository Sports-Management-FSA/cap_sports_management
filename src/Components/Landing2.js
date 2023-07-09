import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Landing2 = () => {
   const { leagues, categories } = useSelector((state) => state);
   const leagueCardsRef = useRef(null);
   const scrollToNextSection = () => {
      document.getElementById("browse").scrollIntoView({ behavior: "smooth" });
   };
   const scrollToLeft = () => {
      leagueCardsRef.current.scrollLeft -= 1500;
   };
   const scrollToRight = () => {
      leagueCardsRef.current.scrollLeft += 1500;
   };
   return (
      <div className="landing__container">
         <div className="landing__header">
            <h1>Build.</h1>
            <h1>Play.</h1>
            <h1>Connect.</h1>
            <p>
               Unlock the realm of competitive sports and esports. Effortlessly create and manage leagues and teams, or
               seamlessly join existing ones. Engage in real-time communication, chat with fellow players, and stay
               connected to your community. Dive into comprehensive statistics and receive live updates on the latest
               game stats, keeping you at the forefront of every thrilling moment.
            </p>
            {
               //<button onClick={scrollToNextSection}>browse leagues</button>
            }
         </div>

         <div id="browse" className="landing__body-browse">
            <div className="landing__body-browse-header">
               <h1>Active leagues</h1>
               <p>
                  <Link to="/home">view all leagues</Link>
               </p>
            </div>
            <div className="landing__body-browse-content">
               <div className="pagination-arrows left">
                  <button className="arrow left" onClick={scrollToLeft}></button>
               </div>
               <div className="landing__body-browse-leagues" ref={leagueCardsRef}>
                  {leagues.leaguesList.map((league) => (
                     <div className="landing__browse-league-card" key={league.id}>
                        <div className="landing__card-image">
                           <img src={league.logo} width="90" height="80" alt="Image" />
                        </div>
                        <div className="landing__league-card-name">
                           <div className="home-card-text-name">
                              <Link to={`/league/${league.id}`}>
                                 <h4>{league.name}</h4>
                              </Link>
                           </div>
                           <div className="landing__league-card-name-subtext">
                              <p>Season: {league.season}</p>
                              <p>{leagues.leaguesList.length} Teams</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="pagination-arrows right">
                  <button className="arrow right" onClick={scrollToRight}></button>
               </div>
            </div>
            <div className="landing__body-browse-sports">
               <div className="landing__sports-header">
                  <h1>Sports Categories</h1>
               </div>
               {categories.categoriesList.map((category) => {
                  const numLeagues = category.leagues.length;
                  const numTeams = category.leagues.reduce(
                     (accumulator, currentValue) => accumulator + currentValue.teams.length,
                     0
                  );
                  return (
                     <Link to={`/leagues/category/${category.id}`} key={category.id}>
                        <div className="landing__sports-cards">
                           <div className="landing__sports-card">
                              <div className="card-image">
                                 <img
                                    src={window.location.origin + `${category.avatar}`}
                                    width="90"
                                    height="80"
                                    alt="Image"
                                 />
                              </div>
                              <div className="card-details">
                                 <h5>{category.name}</h5>
                                 <p>{numLeagues == 1 ? numLeagues + " league" : numLeagues + " leagues"}</p>
                                 <p> {numTeams == 1 ? numTeams + " team" : numTeams + " teams"}</p>
                              </div>
                           </div>
                        </div>
                     </Link>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default Landing2;
