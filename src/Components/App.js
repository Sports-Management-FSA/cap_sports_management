import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllLeagues, fetchAllTeams } from "../store";
import { fetchAllPlayers } from "../store";
import { fetchAllMatches } from "../store";
import { Link, Routes, Route } from "react-router-dom";
import League from "./League";

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
         <h1>Sports Management</h1>
         {/* {
        auth.id ? <Home /> : <Login />
      } */}
         <div>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path='/league/:id' element={<League />} />
            </Routes>
         </div>
      </div>
   );
};

export default App;
