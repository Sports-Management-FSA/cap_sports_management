import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Landing3 = () => {
   const { leagues, categories } = useSelector((state) => state);
  
   return (
<div className="body">
    <section id="section1">
      <div className="landing_container">
        <div className="landing_text_photo">
         <div className="landing_header">
            <h1>Build.</h1>
            <h1>Play.</h1>
            <h1>Connect.</h1>
            <p>Unlock the realm of competive <span>sports and esports</span></p>
         </div>

         <div className="landing_photo"></div> 
         </div>

         <div className="about_section">
            <div className="photo_overlay"></div>
               <div className="section1-description">
                  <h5>
                  Effortlessly create and manage leagues and teams, or
                  seamlessly join existing ones. Engage in real-time communication, chat with fellow players, and stay
                  connected to your community. Dive into comprehensive statistics and receive live updates on the latest
                  game stats, keeping you at the forefront of every thrilling moment.
                  </h5>
               </div>
         </div>
      </div>
   </section>
   <section id="section2">
      <div className="section2_photos">
         <div className="home_photo">
            <div className="photo-overlay"></div>
               <div className="cover">
                  <Link to="/home" className="photo-caption">Join a league and start a team now</Link>
               </div>
         </div>
         <div className="leagues_photo">
         <div className="photo-overlay"></div>
            <div className="cover">
               <Link to="/matches" className="photo-caption">Checkout some upcoming matches</Link>
            </div>
         </div>
         <div className="scorekeeper_photo">
         <div className="photo-overlay"></div>
            <div className="cover">
               <Link to="/scorekeeper" className="photo-caption">Keep track of the game with our scorekeeper feature</Link>
            </div>
         </div>
   </div>
   </section>
   <section className="section3">
      <div className="section3_left">
      <ul>
         <li>
            <p>Hello</p>
            <span>Javscript</span>, for you guys
         </li>
      </ul>
      </div>
      <div className="section3_right">

      </div>
   </section>
</div>
   );
};

export default Landing3;
            
