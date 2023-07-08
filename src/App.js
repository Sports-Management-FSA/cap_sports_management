import React, { useEffect } from "react";
import Home from "./Components/Home";
import Login from "./Components/User/Login";
import Team from "./Components/Team";
import Player from "./Components/Player";
import Nav from "./Components/Global/Nav";
import League from "./Components/League";
import Register from "./Components/User/Register";
import CreateLeague from "./Components/CreateLeague";
import CreateTeam from "./Components/CreateTeam";
import CreatePlayer from "./Components/CreatePlayer";
import Dashboard from "./Components/dashboard";
import Matches from "./Components/Matches";
import Footer from "./Components/Global/Footer";
import { useSelector, useDispatch } from "react-redux";
import {
   fetchAllLeagues,
   fetchAllTeams,
   fetchAllPlayers,
   fetchAllMatches,
   loginWithToken,
   fetchAllAnnouncements,
   fetchAllCategories,
   fetchAllMessages
} from "./store";
import { Link, Routes, Route } from "react-router-dom";
import Standings from "./Components/Standings";
import Landing2 from "./Components/Landing2";
import Staff from "./Components/Global/Staff";
import NotFound from "./Components/Global/NotFound";
import RequestJoin from "./Forms/RequestJoin";
import UserProfile from "./Components/User/UserProfile";

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
      dispatch(fetchAllAnnouncements());
      dispatch(fetchAllMessages());
   }, []);
   console.log(auth);
   return (
      <div className="app">
         <Nav />

         {/* {
        auth.id ? <Home /> : <Login />
      } */}
         <div>
            <Routes>
               <Route path="/" element={<Landing2 />} />
               <Route path="/home" element={<Home />} />
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
               <Route path="/staff" element={<Staff />} />
               <Route path="/profile" element={<UserProfile />} />
               <Route path="*" element={<NotFound />} />
               <Route path="/league/:id/request" element={<RequestJoin />} />
            </Routes>
         </div>
         <Footer />
      </div>
   );
};

export default App;
