import React from 'react';
import { fetchAllMatches } from "../store";
import { useSelector } from "react-redux";

const RightNav = () => {
    const matches = useSelector(state => state.matches.matchesList)
    const today = new Date();
    const upcomingMatch = matches.find((match) => {
        const matchDate = new Date(match.date);
        return matchDate > today;
    })
    if (!matches || !upcomingMatch) {
        return <div>..loading</div>
    }
    let team1 = upcomingMatch.teams[0].name;
    let team2 = upcomingMatch.teams[1].name;
    // console.log(team2)


    return (
        <div className="rightnav-container">
            <div className="rightnav-matches">
                <span>Next Match</span>
                <div className="rightnav-match">
                    <span>{team1}</span> 
                    <span>vs</span>
                    <span>{team2}</span>
                </div>
            </div>
            <div className="rightnav-announcements">
                {/* <span>Recent Announcements</span>
                <div className="rightnav-announcement">
                    <article>
                        ipsum lorem ipsum lorem ipsum lorem ipsum 
                        lorem ipsum lorem ipsum lorem
                    </article>
                </div> */}
            </div>
        </div>
    );
};

export default RightNav;