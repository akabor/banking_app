import { useState, useEffect} from "react";
import {Card} from "react-bootstrap"

// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './fire'

const auth = getAuth();
var currentUser = null;

function AllData(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  let userLookupURL, isMounted, response, text;

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
      userLookupURL = `/account/lookup/${currentUser.email}`;
      (async () => {
        response = await fetch(userLookupURL);
        text = await response.text();
        currentUser = JSON.parse(text)[0];
      })()
      .then(()=>{
        if(isMounted){
          setBalance(currentUser.balance);
          setName(currentUser.name);
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
  });

  // UI component
  return (
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#85335c", color:"white"}}>Account Information</Card.Header>
      <Card.Body style={{background:"#e8d9e0"}}> 
        {isLoggedIn ? (
          <>
          Name: {name}
          <br />
          Email: {email}
          <br />
          Balance: ${balance}
          </>
        ):(
          <>
          Please log in to access account details.
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default AllData;