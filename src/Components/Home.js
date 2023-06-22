import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const Home = () => {
   const { auth, leagues } = useSelector((state) => state);
   const dispatch = useDispatch();

   console.log(leagues.leaguesList);

   return (
      <div>
         <h1>Home</h1>
         <div>
            Welcome {auth.username}!!
            <button onClick={() => dispatch(logout())}>Logout</button>
         </div>
         <div>
            {leagues.leaguesList[0].map((league, idx) => (
               <div key={idx}>
                  <h3>{league.name}</h3>
                  <p>Season: {league.season}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Home;
