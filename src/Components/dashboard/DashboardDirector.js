import React from 'react';
import { useSelector } from 'react-redux';

const DashboardDirector = () => {

    const teams = useSelector(state => state.teams.teamsList);
    const users = useSelector(state => state.players.playerList);
    // const teamManager = users.find(user => user.teamId === )
    console.log(users);

    
    return(
        <div className='accordion' id="LeagueList">
            <div className='accordion-item'>
                <h2 className='accordion-header'>
                <button className="accordion-button collapsed" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#collapseOne" 
                aria-expanded="false" 
                aria-controls="collapseOne">
                    LEAGUE1 
                </button>
                </h2>
                <div id="collapseOne" 
                className="accordion-collapse collapse" 
                data-bs-parent="#accordionExample" >
                    THIS IS AN Accordion
                </div>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <h2>Director Dashboard</h2>
    //         <table className='dashboard-director-table'>
    //             <thead>
    //                 <tr>
    //                     <th>ID</th>
    //                     <th>Name</th>
    //                     <th>Wins</th>
    //                     <th>Losses</th>
    //                     <th>Email</th>
    //                     <th>Team Manager</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {teams.map(team => (
    //                     <tr  key={team.id}>
    //                         <td>  {team.id} </td>
    //                         <td>{team.name}</td>
    //                         <td>{team.gamesWon || 'null'}</td>
    //                         <td>{team.gamesLost || 'no data'}</td>
    //                         <td>{team.email}</td>
    //                         <td>Billy Bob Thorton</td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default DashboardDirector;