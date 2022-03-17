import React from "react";
import { Card } from "react-bootstrap";
import UserContext from "./context";
import BankPicture from "./bank-icon.png";

function Home(){
  const ctx = React.useContext(UserContext);
  return(
    <Card style={{width: "18em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#7094b8", color:"white"}}>Bad Bank Landing Page</Card.Header>
      <Card.Body style={{background:"#d6e0eb"}}> 
        <Card.Title>Welcome to the Bad Bank Landing Page</Card.Title>
        <Card.Text>You can interact with this banking application. Start by creating an account.</Card.Text>
        <Card.Img src={BankPicture} style={{width: "50%", display:"block", marginLeft: "auto", marginRight: "auto"}}/>
      </Card.Body>
    </Card>
  );
}

export default Home;