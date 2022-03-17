import React from "react";
import {Card} from "react-bootstrap"
import UserContext from "./context";

function Withdraw(){
  const ctx = React.useContext(UserContext);
  const [status, setStatus] = React.useState('Please log in to access account details');
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);
  const [disabled, setDisabled] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState('');
  let cardBody = "Please log in to use this feature."

  function handleChange(e){
    setWithdrawAmount(e.currentTarget.value);
    setDisabled(false);
  }

  function handleWithdraw(e) {
    e.preventDefault();
    if(withdrawAmount <= 0) {
      setErrorMessage("Withdraw must be greater than zero.")
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if(withdrawAmount>ctx.currentUser[0].balance) {
      setErrorMessage("Insufficient funds.");
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    let tempBalance = Number(ctx.currentUser[0].balance) - Number(withdrawAmount);
    ctx.currentUser[0].balance = tempBalance;
    setStatus("Account Balance: $" + tempBalance);
  }


  return(
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#d98c40", color:"white"}}>Withdraw</Card.Header>
      <Card.Body style={{background:"#f0d1b2"}}> 
      {ctx.loggedIn ? (
        <>
        Account Balance: ${ctx.currentUser[0].balance}<br />
        Withdraw: $ <input type="number" min="0" onChange={handleChange}/>
        <br />
        <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={disabled}>Submit</button> <br/>
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
export default Withdraw;