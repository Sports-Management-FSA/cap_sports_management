import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Scorekeeper = () => {
    const [teamAVisible, setTeamAVisible] = useState(false);
    const [teamBVisible, setTeamBVisible] = useState(false);
    const [teamAVisibleMinus, setTeamAVisibleMinus] = useState(false);
    const [teamBVisibleMinus, setTeamBVisibleMinus] = useState(false);
  
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
        <div className="row my-4 d-flex justify-content-center ">
            
            <Card border="light" style={{ width: '18rem'}}>
        <Card.Header>
          <div className="d-flex justify-content-center fs-1">Team A</div>  
            </Card.Header>
        <Card.Body>
          {/* <Card.Title>Light Card Title</Card.Title> */}
          <Card.Text>

          <div className="mt-4 d-flex justify-content-between fs-2">
           <div onClick={toggleTeamAVisibilityMinus}>-</div>
           <div>0</div>
           <div  onClick={toggleTeamAVisibility}>+</div>
            </div>
            {teamAVisibleMinus && (
            <div className="float-start mt-5 mb-5">
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        <div>Player 1 (1)</div>
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 2 (3)</ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        Player 3 (2)
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 4 (0)</ListGroup.Item>
    </ListGroup>
    </div>
    )}

 {teamAVisible && (
 <div className="float-end mt-5 mb-5">
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        <div>Player 1 (1)</div>
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 2 (3) </ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        Player 3 (2)
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 4 (0)</ListGroup.Item>
    </ListGroup>
    </div>
 )}

          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <Card border="light" style={{ width: '18rem' }}>
        <Card.Header>
          <div className="d-flex justify-content-center fs-1">Team B</div>  
            </Card.Header>
        <Card.Body>
          {/* <Card.Title>Light Card Title</Card.Title> */}
          <Card.Text>

           <div className="mt-4 d-flex justify-content-between fs-2">
           <div onClick={toggleTeamBVisibilityMinus}>-</div>
           <div>0</div>
           <div onClick={toggleTeamBVisibility}>+</div>
            </div>
{teamBVisibleMinus && (
            <div className="float-start mt-5">
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        <div>Player 1 (1)</div>
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 2 (3)</ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        Player 3 (2)
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 4 (0)</ListGroup.Item>
    </ListGroup>
    </div>
    )}

    {teamBVisible && (
<div className="float-end mt-5">
    <ListGroup as="ul">
      <ListGroup.Item as="li" active>
        <div>Player 1 (1)</div>
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 2 (3) </ListGroup.Item>
      <ListGroup.Item as="li" disabled>
        Player 3 (2)
      </ListGroup.Item>
      <ListGroup.Item as="li">Player 4 (0)</ListGroup.Item>
    </ListGroup>
    </div>
    )}


          </Card.Text>
        </Card.Body>
      </Card>
      <br />


      <div className="d-flex justify-content-center">
    <ListGroup as="ul" style={{ width: '36rem'}}>
      <ListGroup.Item as="li">
        <div className="d-flex justify-content-center">Result</div>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <div className="d-flex justify-content-center"> End Game </div> 
        </ListGroup.Item>
    </ListGroup>
    </div>



</div>
    );
};

export default Scorekeeper;