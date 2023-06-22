import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";

const Home = () => {
   const { auth, leagues } = useSelector((state) => state);
   const dispatch = useDispatch();

   console.log(leagues.leaguesList);

   return (
      <div>
         <h1>Sports Management</h1>
         <div>
            {auth.username ? (
               <div>
                  Welcome {auth.username}!!
                  <button onClick={() => dispatch(logout())}>Logout</button>
               </div>
            ) : (
               <div>
                  <button>Login</button>
               </div>
            )}
         </div>
         <div>
            <Link to='/createleague'>Create League</Link>
            {leagues.leaguesList?.map((league, idx) => (
                  <div key={idx}>
                     <Link to={`/league/${league.id}`} >
                        <h3>{league.name}</h3>
                     </Link>
                     <p>Season: {league.season}</p>
                  </div>
            ))}
         </div>
      </div>
   );
};

export default Home;
