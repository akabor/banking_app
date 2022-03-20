import React from "react";
import {Card} from "react-bootstrap"
import UserContext from "./context";

function Deposit(){
  const ctx = React.useContext(UserContext);
  const [status, setStatus] = React.useState('Please log in to access account details');
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');


  function handleChange(e){
    setDepositAmount(e.currentTarget.value);
    setDisabled(false);
  }

  function handleDeposit(e) {
    e.preventDefault();
    if(depositAmount <= 0) {
      setErrorMessage("Deposit must be greater than zero.")
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    let tempBalance = Number(ctx.currentUser[0].balance) + Number(depositAmount);
    ctx.currentUser[0].balance = tempBalance;
    setStatus("Account Balance: $" + tempBalance);
  }

  return(
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#406640", color:"white"}}>Deposit</Card.Header>
      <Card.Body style={{background:"#a6b8a6"}}> 
        {ctx.loggedIn ? (
        <>
        Account Balance: ${ctx.currentUser[0].balance}<br />
        Deposit: $ <input type="number" min="0" step="1" pattern="[0-9]" onChange={handleChange}/>
        <br />
        <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={disabled}>Submit</button> <br/>
        {errorMessage}
        </>
        ):(
          <>
          Please log in to access account information.
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default Deposit;