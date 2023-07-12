import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Landing3 = () => {
   const { leagues, categories } = useSelector((state) => state);

   return (
      <div className="body">
         <section id="section1">
            <div className="landing_container">
               <article>
                  <div className="landing_header">
                     <h1>Build.</h1>
                     <h1>Play.</h1>
                     <h1>Connect.</h1>
                     <p>
                        Unlock the realm of competive <span>sports and esports</span>
                     </p>
                  </div>

                  <div className="landing_photo"></div>
               </article>
               <p className="section1-description">
                  {/* Unlock the realm of competitive sports and esports.  */}
                  Effortlessly create and manage leagues and teams, or seamlessly join existing ones. Engage in
                  real-time communication, chat with fellow players, and stay connected to your community. Dive into
                  comprehensive statistics and receive live updates on the latest game stats, keeping you at the
                  forefront of every thrilling moment.
               </p>
            </div>
         </section>
         <section id="section2">
            <div className="section2_photos">
               <div className="home_photo"></div>
               <div className="leagues_photo"></div>
               <div className="scorekeeper_photo"></div>
            </div>
            <div className="links_container">
               <p>
                  <Link to="/home">Join a league and start a team now</Link>
               </p>
               <p>
                  <Link to="/matches">Checkout some upcoming matches</Link>
               </p>
               <p>
                  <Link to="/scorekeeper">Keep track of the game with our scorekeeper feature</Link>
               </p>
            </div>
         </section>
      </div>
   );
};

export default Landing3;
