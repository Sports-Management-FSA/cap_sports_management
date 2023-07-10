import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Scorekeeper = () => {
  const [teamAVisible, setTeamAVisible] = useState(false);
  const [teamBVisible, setTeamBVisible] = useState(false);
  const [teamAVisibleMinus, setTeamAVisibleMinus] = useState(false);
  const [teamBVisibleMinus, setTeamBVisibleMinus] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  const teams = useSelector(state=>state.teams.teamsList);

  const toggleTeamAVisibility = () => {
    setTeamAVisible(!teamAVisible);
  };

  const toggleTeamAVisibilityMinus = () => {
    setTeamAVisibleMinus(!teamAVisibleMinus);
  };

  const toggleTeamBVisibility = () => {
    setTeamBVisible(!teamBVisible);
  };

  const toggleTeamBVisibilityMinus = () => {
    setTeamBVisibleMinus(!teamBVisibleMinus);
  };


  return (

    <div className="row my-4 d-flex justify-content-center">
      <div className="card" style={{ width: '25rem' }}>
        <div className="card-header">
          <div className="d-flex justify-content-center fs-1">Team A</div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <div className="mt-4 d-flex justify-content-between fs-2">
              <div onClick={toggleTeamAVisibilityMinus}>-</div>
              <div>{teamAScore}</div>
              <div onClick={toggleTeamAVisibility}>+</div>
            </div>
            {teamAVisibleMinus && (
              <div className="float-start mt-5 mb-5">
                <ul className="list-group">
                  <li className="btn btn-outline-dark btn-lg px-4">
    
                    <div onClick={() => setTeamAScore(prevScore => prevScore - 1)}>Player 1 (1)</div>
            
                  </li>

                  <div onClick={() => setTeamAScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 2 (3)</li>
                  </div>
                  <div onClick={() => setTeamAScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">
                    Player 3 (2)
                  </li>
                  </div>
                  <div onClick={() => setTeamAScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 4 (0)</li>
                  </div>
                </ul>
              </div>
            )}
            {teamAVisible && (
              <div className="float-end mt-5 mb-5">
                <ul className="list-group">
                  <li className="btn btn-outline-dark btn-lg px-4">
                    <div onClick={() => setTeamAScore(prevScore => prevScore + 1)}>Player 1 (1)</div>
                  </li>
                  <div onClick={() => setTeamAScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 2 (3)</li>
                  </div>
                  <div onClick={() => setTeamAScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">
                    Player 3 (2)
                  </li>
                  </div>
                  <div onClick={() => setTeamAScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 4 (0)</li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="card" style={{ width: '25rem' }}>
        <div className="card-header">
          <div className="d-flex justify-content-center fs-1">Team B</div>
        </div>
        <div className="card-body">
          <div className="card-text">
            <div className="mt-4 d-flex justify-content-between fs-2">
              <div onClick={toggleTeamBVisibilityMinus}>-</div>
              <div>{teamBScore}</div>
              <div onClick={toggleTeamBVisibility}>+</div>
            </div>
            {teamBVisibleMinus && (
              <div className="float-start mt-5">
                <ul className="list-group">
                  <li className="btn btn-outline-dark btn-lg px-4">
                    <div onClick={() => setTeamBScore(prevScore => prevScore - 1)}>Player 1 (1)</div>
                  </li>
                  <div onClick={() => setTeamBScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 2 (3)</li>
                  </div>
                  <div onClick={() => setTeamBScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">
                    Player 3 (2)
                  </li>
                  </div>
                  <div onClick={() => setTeamBScore(prevScore => prevScore - 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 4 (0)</li>
                  </div>
                </ul>
              </div>
            )}
            {teamBVisible && (
              <div className="float-end mt-5">
                <ul className="list-group">
                  <li className="btn btn-outline-dark btn-lg px-4">
                    <div onClick={() => setTeamBScore(prevScore => prevScore + 1)}>Player 1 (1)</div>
                  </li>
                  <div onClick={() => setTeamBScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 2 (3)</li>
                  </div>
                  <div onClick={() => setTeamBScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">
                    Player 3 (2)
                  </li>
                  </div>
                  <div onClick={() => setTeamBScore(prevScore => prevScore + 1)}>
                  <li className="btn btn-outline-dark btn-lg px-4">Player 4 (0)</li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <ul className="list-group" style={{ width: '36rem' }}>
          {/* <li className="list-group-item">
            <div className="d-flex justify-content-center">Result</div>
          </li> */}
          <li className="list-group-item">
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-dark btn-lg px-5">End Game</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scorekeeper;
