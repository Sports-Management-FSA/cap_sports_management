import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div>
            <div>
                <h1>TEAM MANAGEMENT APP</h1>
            </div>
            <div>
                <h2><Link to={'/login'}>LOGIN</Link></h2>
            </div>
            <div>
                <h2><Link to={'/register'}>REGISTER</Link></h2>
            </div>
        </div>
    )
}

export default Landing;