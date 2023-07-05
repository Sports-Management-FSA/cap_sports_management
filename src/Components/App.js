import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Team from "./Team";
import Team2 from "./Team2";
import Player from "./Player";
import Nav from "./Global/Nav";
import Footer from "./Global/Footer";
import SideBar from "./Global/Sidebar";
import League from "./League";
import Register from "./Register";
import CreateLeague from "./CreateLeague";
import CreateTeam from "./CreateTeam";
import CreatePlayer from "./CreatePlayer";
import Dashboard from "./dashboard";
import Matches from "./Matches";
import { useSelector, useDispatch } from "react-redux";
import {
   fetchAllLeagues,
   fetchAllTeams,
   fetchAllPlayers,
   fetchAllMatches,
   loginWithToken,
   fetchAllCategories
} from "../store";
import { Link, Routes, Route } from "react-router-dom";
import Standings from "./Standings";
import Landing2 from "./Landing2";

const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchAllCategories());
      dispatch(fetchAllLeagues());
      dispatch(fetchAllMatches());
      dispatch(fetchAllPlayers());
      dispatch(fetchAllTeams());
      dispatch(loginWithToken());
   }, []);
   console.log(auth);
   return (
      <div>
         <Nav />
         <SideBar />
         {/* {
        auth.id ? <Home /> : <Login />
      } */}

         <div>
            <Routes>
               <Route path="/" element={<Landing2 />} />
               <Route path="/leagues" element={<Home />} />
               <Route path="/players/:id" element={<Player />} />
               <Route path="/league/:id" element={<League />} />
               <Route path="/teams/:id" element={<Team2 />} />
               <Route path="/login" element={<Login />} />
               <Route path="/league/:id/createteam" element={<CreateTeam />} />
               <Route path="/createleague" element={<CreateLeague />} />
               <Route path="/createplayer" element={<CreatePlayer />} />
               <Route path="/register" element={<Register />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/matches" element={<Matches />} />
               <Route path="/standings" element={<Standings />} />
            </Routes>
         </div>
         <Footer />
      </div>
   );
};

export default App;
