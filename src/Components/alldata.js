import React from "react";
import {Card} from "react-bootstrap"
import UserContext from "./context";

function AllData(){
  const ctx = React.useContext(UserContext);
  //create a card for each user
  let numUsers = ctx.users.length;

  return (
    <div>
    {ctx.users.map((user,i) =>
      <div key={i}>
      <Card key={i} style={{width: "18em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
          <Card.Header style={{background: "#85335c", color:"white"}}>{user.name}</Card.Header>
          <Card.Body style={{background:"#e8d9e0"}}> 
            Name: {user.name}
            <br />
            Email: {user.email}
            <br />
            Password: {user.password}
            <br />
            Balance: ${user.balance}

          </Card.Body>
        </Card>
        <br />
      </div>
    )}
    </div>
  );
}

export default AllData;