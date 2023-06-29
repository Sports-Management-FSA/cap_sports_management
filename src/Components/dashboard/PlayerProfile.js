import React from "react";
import { useSelector, useDispatch, Link } from "react-redux";

const PlayerProfile = () => {
  const auth = useSelector((state) => state.auth);
  const teams = useSelector((state) => state.teams.teamsList);
  const players = useSelector((state) => state.players.playerList);
  console.log(teams);
  console.log(auth);
  console.log(players);

  return (
    // title
    <div>
      <section className="bg-info text-light p-5 text-center">
        <div className="container">
          <div className="d-sm-flex align-items-end">
            <img
              className="img-fluid img-thumbnail"
              src="../../static/images/esports.jpeg"
              alt="profile picture"
            />
            <div>
              <h1 className="text-capitalize">
                {auth.firstName} {auth.lastName}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* teams */}
      <section className="bg-dark text-light p-5 text-center">
        <div className="container">
          <div>
            <h2>Teams</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="col">Logo</th>
                <th className="col">Name</th>
                <th className="col">League</th>
                <th className="col">Email</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PlayerProfile;
