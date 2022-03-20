import React from "react";
import {Card} from "react-bootstrap";
import UserContext from "./context";

function Login(){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [show, setShow] = React.useState(null);
  const [name, setName] = React.useState('');
  const [user, setUser] = React.useState(null);
  const [storedPwW, setStoredPW] = React.useState(null);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if(!field){
      setStatus('Error: Please enter '+label);
      setTimeout(()=> setStatus(''), 3000)
      return false;
    }
    return true;
  }

  

  const handleLogin = () => {
    let userFound = false;
    if(ctx.users.length === 0) {
      setStatus('Error: User not found');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if(!validate(email, 'email')) return;
    if(!validate(password, 'password')) return;
    for(let i = 0; i<ctx.users.length; i++) {
      console.log(ctx.users[i].email);
      if(ctx.users[i].email === email) {
        userFound = true;
        if(ctx.users[i].password === password) {
          setUser(ctx.users[i]);
          setName(ctx.users[i].name);
          ctx.currentUser[0] = ctx.users[i];
          ctx.loggedIn=true;
          setShow(false);
        }
        else {
          setStatus('Error: Incorrect email and password combination')
          setTimeout(() => setStatus(''), 3000);
        }
      }
    }
    if(userFound === false) {
      console.log("user not found");
      setStatus('Error: User not found');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
  }

  const handleLogOut = () => {
    setShow(true);
    setEmail('');
    setPassword('');
    setName('');
    ctx.currentUser[0] = [];
    ctx.loggedIn = false;
  }

  return(
    <Card style={{width: "18em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background:"#599c9c", color:"white"}}>Login</Card.Header>
      <Card.Body style={{background:"#d9e8e8"}}>
        {!ctx.loggedIn ? (
        <>
        Email<br />
        <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /> <br />
        Password <br />
        <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /> <br />
        <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button>
        </>
      ):(
        <>
        <h5>Current User: {ctx.currentUser[0].name}</h5>
        <button type="submit" className="btn btn-light" onClick={handleLogOut}>Log out</button>
        </>
      )}
      <br />
      {status}
    </Card.Body>
    </Card>
  );
}

export default Login;