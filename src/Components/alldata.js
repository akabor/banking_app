import React from "react";
import {Card} from "react-bootstrap"
import UserContext from "./context";

function AllData(){
  const ctx = React.useContext(UserContext);
  let numUsers = ctx.users.length;
  
  const starPassword = (string) => {
    let stars = "";
    for(let i = 0; i<string.length; i++) {
      if(i < string.length - 3) {
        stars += "*"
      } else {
        stars += string[i];
      }
    }
    return stars;
  }

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
            Password: {starPassword(user.password)}
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