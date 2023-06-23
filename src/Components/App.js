import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import Team from "./Team";
import Player from "./Player";
import Nav from "./Nav";
import League from "./League";
import Register from "./Register";
import CreateLeague from "./CreateLeague";
import CreateTeam from "./CreateTeam";
import CreatePlayer from "./CreatePlayer";
import DashboardManager from "./DashboardManager";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLeagues, fetchAllTeams, fetchAllPlayers, fetchAllMatches, loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";

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

   return (
      <div>
         <Nav />
         {/* {
        auth.id ? <Home /> : <Login />
      } */}
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/players/:id" element={<Player />} />
               <Route path="/league/:id" element={<League />} />
               <Route path="/teams/:id" element={<Team />} />
               <Route path="/login" element={<Login />} />
               <Route path="/createteam" element={<CreateTeam />} />
               <Route path="/createleague" element={<CreateLeague />} />
               <Route path="/createplayer" element={<CreatePlayer />} />
               <Route path="/register" element={<Register />} />
               <Route path="/managerdashboard" element={<DashboardManager />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
