import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

// Import the functions you need from the SDKs you need
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import app from './fire'

const auth = getAuth();
var currentUser = null;


function Login(){
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(null);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  var userLookupURL, isMounted, response, text;


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
    }
    return () => (isMounted = false);
  }, [currentUser]);

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

  const validate = (field, label) => {
    if(!field){
      setStatus('Error: Please enter '+label);
      setTimeout(()=> setStatus(''), 3000)
      return false;
    }
    return true;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if(!validate(email, 'email')) return;
    if(!validate(password, 'password')) return;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth,email,password);
      })
      .then(()=>{
        setShow(false);
        let url = `/account/lookup/${email}`;
        (async () => {
          let response = await fetch(url);
          let text = await response.text();
          let userObj = JSON.parse(text)[0];
          setUser(userObj);
          setName(userObj.name);
          setIsLoggedIn(true);
        })();
      })
      .catch((error)=>{
        console.error('Incorrect username or password');
        setStatus('Incorrect username and password combination.');
        setTimeout(()=>setStatus(''), 3000);
      });
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
    signOut(auth)
      .then(()=>{
        setShow(true);
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
        setName('');
      })
      .catch((e)=>{
        console.log(e.message);
      })
  }

  return(
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background:"#599c9c", color:"white"}}>Login</Card.Header>
      <Card.Body style={{background:"#d9e8e8"}}>
        {!isLoggedIn ? (
        <div>
          Email<br />
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} 
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleLogin(event);
            }
          }}/> <br />
          Password <br />
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} 
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleLogin(event);
            }
          }}/> <br />
          <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
        </div>
      ):(
        <div>
          <div>Current User: {email}</div>
          <br/>
          <button type="submit" className="btn btn-light" onClick={handleLogOut}>Log out</button>
        </div>
      )}
      {status && (<div>{status}</div>)}
    </Card.Body>
    </Card>
  );
}

export default Login;