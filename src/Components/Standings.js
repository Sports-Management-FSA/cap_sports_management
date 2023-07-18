import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


const Standings = (props) => {
    const {teams} = props;

    return (
        <div className="standings__container">
            { teams.length > 0 ?
            <table className="standings__table">
                <thead>
                <tr className="table__header-container">
                    <th className="table__header">Position</th>
                    <th className="table__header">Name</th>
                    <th className="table__header">GP</th>
                    <th className="table__header">Points</th>
                    <th className="table__header">W</th>
                    <th className="table__header">L</th>
                    <th className="table__header">T</th>
                </tr>
                </thead>
                <tbody className="table__body-container">
                    <tr>    
                         <td className="table__cell">1</td>
                         <td className="table__cell"> <Link className="standings-link" to={`/teams/16`}>Ice Queens</Link> </td>
                         <td className="table__cell">13</td>
                         <td className="table__cell">13</td>
                         <td className="table__cell">13</td>
                         <td className="table__cell">0</td>
                         <td className="table__cell">0</td>
                     </tr>
                     <tr>    
                         <td className="table__cell">2</td>
                         <td className="table__cell">Frostbite Furies</td>
                         <td className="table__cell">13</td>
                         <td className="table__cell">11</td>
                         <td className="table__cell">10</td>
                         <td className="table__cell">1</td>
                         <td className="table__cell">0</td>
                     </tr>
                     <tr>    
                         <td className="table__cell">3</td>
                         <td className="table__cell">Power Puckettes</td>
                         <td className="table__cell">12</td>
                         <td className="table__cell">9</td>
                         <td className="table__cell">7</td>
                         <td className="table__cell">3</td>
                         <td className="table__cell">2</td>
                     </tr>
                     <tr>    
                         <td className="table__cell">4</td>
                         <td className="table__cell">Thundering Queens</td>
                         <td className="table__cell">12</td>
                         <td className="table__cell">6</td>
                         <td className="table__cell">6</td>
                         <td className="table__cell">6</td>
                         <td className="table__cell">0</td>
                     </tr>
                     <tr>    
                         <td className="table__cell">5</td>
                         <td className="table__cell">2Wins</td>
                         <td className="table__cell">12</td>
                         <td className="table__cell">6</td>
                         <td className="table__cell">8</td>
                         <td className="table__cell">2</td>
                         <td className="table__cell">1</td>
                     </tr>
                     <tr>    
                         <td className="table__cell">6</td>
                         <td className="table__cell">Aurora Blades</td>
                         <td className="table__cell">13</td>
                         <td className="table__cell">5</td>
                         <td className="table__cell">5</td>
                         <td className="table__cell">8</td>
                         <td className="table__cell">0</td>
                     </tr>
                </tbody>
            </table> 
            :
            <p>No Standings to Display</p>
            }
        </div>
    );
};

export default Standings;

// {teams.map((team, idx) => (
                
//     <tr key={team.id}>    
//         <td className="table__cell">{idx+1}</td>
//         <td className="table__cell"><Link className="table_link" to={`/teams/${team.id}`}> {team.name} </Link></td>
//         <td className="table__cell">{team.gamesWon || 'no data'}</td>
//         <td className="table__cell">{team.gamesLost || 'no data'}</td>
//         <td className="table__cell">{team.gamesLost || 'no data'}</td>
//         <td className="table__cell">{team.gamesLost || 'no data'}</td>
//         <td className="table__cell">{team.gamesLost || 'no data'}</td>
//     </tr>
    
    
// ))}

