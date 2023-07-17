import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/User/Login";
import Team from "./Components/Team";
import Player from "./Components/Player";
import Nav from "./Components/Global/Nav";
import League from "./Components/League";
import Register from "./Components/User/Register";
import CreateLeague from "./Forms/CreateLeague";
import CreateTeam from "./Forms/CreateTeam";
import CreatePlayer from "./Forms/CreatePlayer";
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
   fetchAllMessages,
   fetchAllScorekeepers,
   fetchAllRequests,
   fetchAllPosts
} from "./store";
import { Link, Routes, Route } from "react-router-dom";
import Standings from "./Components/Standings";
import Landing3 from "./Components/Landing3";
import Staff from "./Components/Global/Staff";
import NotFound from "./Components/Global/NotFound";
import RequestJoin from "./Forms/RequestJoin";
import UserProfile from "./Components/User/UserProfile";
import RequestJoin2 from "./Forms/RequestJoin2";
import Scorekeeper from "./Components/Scorekeeper";
import AdvancedScoreKeeper from "./Components/AdvancedScoreKeeper";
import Home2 from './Components/Home2';
import { stepButtonClasses } from "@mui/material";

import Home4 from "./Components/Home4";

const App = () => {
   const { loggedIn } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const [load, setload] = useState(false);

   useEffect(() => {
      dispatch(fetchAllCategories());
      dispatch(fetchAllLeagues());
      dispatch(fetchAllMatches());
      dispatch(fetchAllPlayers());
      dispatch(fetchAllTeams());
      dispatch(loginWithToken());
      dispatch(fetchAllAnnouncements());
      dispatch(fetchAllMessages());
      dispatch(fetchAllRequests());
      dispatch(fetchAllScorekeepers());
      dispatch(fetchAllPosts())
      setload(true)
   }, []);

   // console.log(auth);
   return (
      <div className="app">
         <Nav />

         {/* {
        auth.id ? <Home /> : <Login />
      } */}
         {load ?
            <>
               <div>
                  <Routes>
                     <Route path="/" element={<Landing3 />} />
                     <Route path="/home" element={<Home2 />} />
                     <Route path="/players/:id" element={<Player />} />
                     <Route path="/league/:id" element={<League />} />
                     <Route path="/scorekeeper/:id" element={<AdvancedScoreKeeper />} />
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
                     <Route path="/league/:id/request" element={<RequestJoin2 />} />
                  </Routes>
               </div>
               <Footer />
            </>
            : null}
      </div>

   );
};

export default App;
