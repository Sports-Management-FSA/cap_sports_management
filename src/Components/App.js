import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Team from './Team';
import CreateLeague from "./CreateLeague";
import CreateTeam from "./CreateTeam";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLeagues, fetchAllTeams } from "../store";
import { fetchAllPlayers } from "../store";
import { fetchAllMatches } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import League from "./League";
import Nav from "./Nav";


const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchAllLeagues());
      dispatch(fetchAllMatches());
      dispatch(fetchAllPlayers());
      dispatch(fetchAllTeams());
   }, []);

   return (
      <div>
         <Nav />
         <h1>Sports Management</h1>
         {/* {
        auth.id ? <Home /> : <Login />
      } */}
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path='/league/:id' element={<League />} />
               <Route path='/team/:id' element={<Team/>} />
               <Route path="/login" element={<Login />} />
               <Route path="/createteam" element={<CreateTeam />} />
               <Route path="/createleague" element={<CreateLeague />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
