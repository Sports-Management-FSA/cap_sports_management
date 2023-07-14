import { Numbers } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';

const Home2 = () => {
   const { auth, leagues } = useSelector((state) => state);
   let leaguesList = leagues.leaguesList;
   const {categories} = useSelector((state) => state);
   console.log(categories)
   const [category, setCategory] = useState('');
   const topCategories = categories.categoriesList.toSorted((a, b) => a.leagues.length > b.leagues.length ? -1: 0).slice(0, 3);

   if(category !== ''){
      leaguesList = categories.categoriesList.find(el=>el.name === category).leagues;
   }
   const leagueCardsRef = useRef([]);

   useEffect(() => {
      leagueCardsRef.current = leagueCardsRef.current.slice(0, topCategories.length);
    }, [topCategories]);

   const handleClick = (ev) => {
      ev.preventDefault();
      setCategory(ev.target.value);
   };

   
   // const leagueCards1Ref = useRef(null);
   // const leagueCards2Ref = useRef(null);

   //  Previous change
   // const scrollToLeft = (num) => {
   //    `${`leagueCards${num}Ref`}`.current.scrollLeft -= 1500;
   // };

   // onClick={scrollToLeft(index.toString())
   // const scrollToRight = (num) => {
   //  `${`leagueCards${num}Ref`}`.current.scrollLeft += 1500;
   // };

   const scrollToLeft = (index) => {
      leagueCardsRef.current.scrollLeft -= 1500;
   };
   const scrollToRight = (index) => {
      leagueCardsRef.current.scrollLeft += 1500;
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
            {topCategories.map((category, index)=>(
            <div key={category.id}>
               <h5>{category.name}</h5>
               <div className="landing__body-browse-content">
                  <div className="pagination-arrows left">
                     {/* <button className="arrow left" onClick={scrollToLeft}></button> */}
                     <KeyboardDoubleArrowLeftRoundedIcon className="arrow left" onClick={scrollToLeft}/>
                  </div>
                  <div className="landing__body-browse-leagues" ref={el => leagueCardsRef.current[index] = el}>
                     {category.leagues.map((league) => (
                        <div className="landing__browse-league-card" key={league.id}>
                           <img  className="landing__card-image" src={league.logo} width="90" height="80" alt="Image" />
                           <div className="landing__league-card-name">
                              <Link to={`/league/${league.id}`} className="home-card-text-name">{league.name}</Link>
                           </div>
                           <div className="landing__league-card-name-subtext">
                              <p>Season: {league.season}</p>
                              <p>{league.teams.length} Teams</p>
                           </div>
                        </div>
                     ))}
               </div>
                  <div className="pagination-arrows right">
                     {/* <button className="arrow right" onClick={scrollToRight}></button> */}
                     <KeyboardDoubleArrowRightRoundedIcon className="arrow right" onClick={scrollToRight}/>
                  </div>
               </div>
            </div>
            ))}
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

export default Home2;