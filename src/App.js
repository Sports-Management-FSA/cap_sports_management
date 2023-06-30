import React, { useEffect } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Team from "./Components/Team";
import Player from "./Components/Player";
import Nav from "./Components/Nav";
import League from "./Components/League";
import Register from "./Components/Register";
import CreateLeague from "./Components/CreateLeague";
import CreateTeam from "./Components/CreateTeam";
import CreatePlayer from "./Components/CreatePlayer";
import Dashboard from "./Components/dashboard"
import Matches from "./Components/Matches";
import Footer from "./Components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLeagues, fetchAllTeams, fetchAllPlayers, fetchAllMatches, loginWithToken } from "./store";
import { Link, Routes, Route } from "react-router-dom";
import Standings from "./Components/Standings";
import Landing2 from "./Components/Landing2";
import Home2 from "./Components/Home2";
const App = () => {
   const { auth } = useSelector((state) => state);
   const dispatch = useDispatch();
   useEffect(() => {
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
         {/* {
        auth.id ? <Home /> : <Login />
      } */}

         <div>
            <Routes>
               <Route path="/" element={<Landing2 />} />
               <Route path="/home" element={<Home2 />} />
               <Route path="/players/:id" element={<Player />} />
               <Route path="/league/:id" element={<League />} />
               <Route path="/teams/:id" element={<Team />} />
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
