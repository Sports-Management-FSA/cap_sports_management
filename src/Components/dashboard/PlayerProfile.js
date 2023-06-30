import React from "react";
import { useSelector, useDispatch, Link } from "react-redux";

const PlayerProfile = () => {
  const auth = useSelector((state) => state.auth);
  const leagues = useSelector((state) => state.leagues.leaguesList);
  const authTeams = auth.teams;

  if (!auth || !leagues || !authTeams) {
    return <div>...loading</div>;
  }

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
        <div className="table-responsive">
          <div>
            <h2 className="panel-heading">Teams</h2>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th className="col">Logo</th>
                <th className="col">Name</th>
                <th className="col">League</th>
                <th className="col">Email</th>
                <th className="col"></th>
              </tr>
            </thead>
            <tbody>
              {authTeams.map((team) => {
                return (
                  <>
                    <tr key={team.id}>
                      <td className="dashboard-team-logos">
                        <img
                          className="img-fluid img-thumbnail dashboard-team-logos"
                          src={team.logo}
                          alt={`${team.name}`}
                        />
                      </td>
                      <td>{team.name}</td>
                      <td>
                        {
                          leagues.find((league) => league.id == team.leagueId)
                            ?.name
                        }
                      </td>
                      <td>{team.email}</td>
                      <td>
                        <button
                          class="btn btn-primary"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#teamMatches"
                        >
                          Matches
                        </button>
                      </td>
                    </tr>
                    <div className="table-responsive collapse" id="teamMatches">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="col">Name</th>
                            <th className="col">Description</th>
                            <th className="col">Date</th>
                            <th className="col">Time</th>
                            <th className="col">location</th>
                            <th className="col">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.matches.map((match) => {
                            return (
                              <tr
                                key={match.id}
                                className="collapse"
                                id="teamMatches"
                              >
                                <th>
                                  <div>{match.name}</div>
                                </th>
                                <th>
                                  <div>{match.desciption}</div>
                                </th>
                                <th>
                                  <div>{match.date}</div>
                                </th>
                                <th>
                                  <div>{match.time}</div>
                                </th>
                                <th>
                                  <div>{match.location}</div>
                                </th>
                                <th>
                                  <div>{match.teamAscore}</div>
                                </th>
                                <th>
                                  <div>{match.teamBscore}</div>
                                </th>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                  //   <tr className="collapse" id="teamMatches">
                  //   <td>
                  //     <div>Please work</div>
                  //   </td>
                  // </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PlayerProfile;
