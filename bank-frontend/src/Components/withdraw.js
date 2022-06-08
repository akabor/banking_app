import { useState, useEffect} from "react";
import { Card } from "react-bootstrap"


// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './fire'

const auth = getAuth();
var currentUser = null;

function Withdraw(){
  const [status, setStatus] = useState('Account Balance: ');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  var userLookupURL, isMounted, response, text;

  //check if user is logged in on refresh
  window.onload = function() {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        currentUser = user;
        isMounted = true;
        setIsLoggedIn(true);
      }
      else {
        isMounted = false;
        currentUser = null;
        setIsLoggedIn(false);
      }
    })
  }

  // run every time currentUser is changed - this looks up the current users
  // information to display
  useEffect(()=>{
    if(currentUser !== null){
      setEmail(currentUser.email);
      setIsLoggedIn(true);
      console.log('isLoggedIn? ', isLoggedIn)
      userLookupURL = `/account/lookup/${currentUser.email}`;
      (async () => {
        response = await fetch(userLookupURL);
        text = await response.text();
        currentUser = JSON.parse(text)[0];
      })()
      .then(()=>{
        if(isMounted){
          setBalance(currentUser.balance);
        }
      });
    }
    return () => (isMounted = false);
  }, [currentUser]);

  // check for signed in user through firebase
  onAuthStateChanged(auth, (user)=>{
    if(user){
      currentUser = user;
      isMounted = true;
    }
    else {
      isMounted = false;
      currentUser = null;
    }
  })

  // enable submit button when valid entry is input
  function handleChange(e){
    setWithdrawAmount(e.currentTarget.value);
    setDisabled(false);
  }

  // check validity of input, hit API route for updating account information
  function handleWithdraw(e) {
    e.preventDefault();
    if(withdrawAmount <= 0) {
      setErrorMessage("Withdraw must be greater than zero.")
      setWithdrawAmount('');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    if(withdrawAmount > balance) {
      setErrorMessage("Insufficient funds.")
      setTimeout(() => setErrorMessage(''), 3000);
      setWithdrawAmount('');
      return;
    }
    let updateURL = `/account/update/${email}/${-withdrawAmount}`;
    (async () => {
      let response = await fetch(updateURL);
      let text = await response.text();
      console.log(text);
      (async () => {
        let response = await fetch(userLookupURL);
        let text = await response.text();
        currentUser = JSON.parse(text)[0];
        setBalance(currentUser.balance);
        setStatus(`Account Balance: $${currentUser.balance}`);
        setWithdrawAmount('');
        console.log(currentUser);
      })();
    })();
  }

  // UI component
  return(
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#d98c40", color:"white"}}>Withdraw</Card.Header>
      <Card.Body style={{background:"#f0d1b2"}}> 
        {isLoggedIn ? (
        <>
        Account Balance: ${balance}<br />
        Withdraw: $ 
          <input type="number" pattern="[0-9]" min="0" step="10" value={withdrawAmount} onChange={handleChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
            if (event.key === "Enter") {
              handleWithdraw(event);
            }
          }}/>
          <br />
          <button type="submit" className="btn btn-light" onClick={(e) => handleWithdraw(e)} disabled={disabled}>Submit</button> <br/>
          {errorMessage}
        </>
        ):(
          <>
          Please log in to access this feature.
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default Withdraw;