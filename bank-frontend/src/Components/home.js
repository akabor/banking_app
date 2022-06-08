import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BankPicture from "./bank-icon.png";

function Home(){
  return(
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#7094b8", color:"white"}}>Bank of Amelia</Card.Header>
      <Card.Body style={{background:"#d6e0eb"}}> 
        <Card.Title>Welcome to Bank of Amelia</Card.Title>
        <Card.Text>This interactive, full stack banking application was created using MongoDB, Express, React, Node, Google Cloud Platform, and Firebase. 
        <br/> 
        <br/>
        Start by 
        <Link to="/createaccount/" style={{textDecoration: "none"}}> creating an account </Link>
        or
        <Link to="/login/" style={{textDecoration: "none"}}> logging in</Link>.
        </Card.Text>
        <Card.Img src={BankPicture} style={{width: "50%", display:"block", marginLeft: "auto", marginRight: "auto"}}/>
      </Card.Body>
    </Card>
  );
}

export default Home;