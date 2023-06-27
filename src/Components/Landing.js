import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1>TEAM MANAGEMENT APP</h1>
            </div>
            <div className="landing-loginregister">
                <div>
                    <h2><Link to={'/login'}>LOGIN</Link></h2>
                </div>
                <div>
                    <h2><Link to={'/register'}>REGISTER</Link></h2>
                </div>
            </div>
            <section className="landing-features-center">
                <div className="landing-feature">
                    <h4>Create or join leauges</h4>
                    <div className="landing-feature-description">
                        <p>fully customizable and interactive</p>
                        <a href="/">get started now</a>
                    </div>
                </div>
                <div className="landing-feature">
                    <h4>Start or join a Team</h4>
                    <div className="landing-feature-description">
                        <p>feature rich configurations</p>
                        <a href="/">get started now</a>
                    </div>
                </div>
                <div className="landing-feature">
                    <div>
                        <h4>Get real time stats</h4>
                    </div>
                    <div className="landing-feature-description">
                        <p>stunning visuals and up to date statistics</p>
                        <a href="/">get started now</a>
                    </div>
                </div>
                <dialog>What is this doing</dialog>
            </section>
        </div>
    )
}

export default Landing;