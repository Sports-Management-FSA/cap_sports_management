import React, {useState} from 'react';

const Roster = (props) => {
    let {players}  = props;
    console.log(players);
    //create obj with different roles as keys and save the users with those roles
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const sortTable = (accessor) => {
        const sortOrder = accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        switch(accessor){
            case "name":
                if(sortOrder === "asc"){
                    players.sort((a, b)=> a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1)
                } else {
                    players.sort((a, b)=> a.firstName.toLowerCase() < b.firstName.toLowerCase() ? 1 : -1)
                }
                break;
            case "games":
                if(sortOrder === "asc"){
                    players.sort((a, b)=> a.matches.length - b.matches.length)
                } else {
                    players.sort((a, b)=> b.matches.length - a.matches.length)
                }
                
                break;
            case "points":
                if(sortOrder === "asc"){
                    players.sort((a, b)=> a.actions.reduce((sum, current)=>sum+current.value, 0) - b.actions.reduce((sum, current)=>sum+current.value, 0))
                } else {
                    players.sort((a, b)=> b.actions.reduce((sum, current)=>sum+current.value, 0) - a.actions.reduce((sum, current)=>sum+current.value, 0))
                }
    
                break;
        }
    }

    return (
        <div className="roster__container">
            {players.length > 0 ?
           <table className="roster__table">
                <thead>
                    <tr className="table__header-container">
                        <th onClick={()=>sortTable("name")} className="table__header">Name</th>
                        <th onClick={()=>sortTable("games")} className="table__header">Games Played</th>
                        <th onClick={()=>sortTable("points")} className="table__header">Points</th>
                    </tr>
                </thead>
                <tbody className="table__body-container">
                    {players.map(player => (
                        <tr key={player.id}>
                            <td className="table__cell">{player.firstName} {player.lastName}</td>
                            <td className="table__cell">{player.matches.length}</td>
                            <td className="table__cell">{player.scorekeepers.reduce((sum, current)=>sum+current.action.value, 0)}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
            : 
            <div>
                <p>No Players to Display</p>
            </div>
            }
        </div>
    );
};

export default Roster;