import { useState, useContext } from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

// Import the functions you need from the SDKs you need
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './fire'

const auth = getAuth();

function CreateAccount(){
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  // clear form on submit
  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  // confirm user has input values
  function validate(field, label) {
    if(!field){
      setStatus('Error: Please enter '+label);
      setTimeout(()=> setStatus(''), 3000)
      return false;
    }
    return true;
  }

  // create account
  function handleCreate() {
    if(!validate(name, 'name')) return;
    if(!validate(email, 'email')) return;
    if(!validate(password, 'password')) return;
    // require password length to be equal to or greater than 8 characters
    if(password.length<8) {
      setStatus('Error: Password must be 8 characters minimum');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    // check if email includes @ symbol
    if(!email.includes("@") || !email.includes(".")) {
      setStatus('Error: Invalid email');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    // create user account with firebase authentication
    const promise = createUserWithEmailAndPassword(auth, email, password);
    promise.then(()=>{
      let url = `/account/create/${name}/${email}`;
      (async () => {
        let response = await fetch(url);
        let text = await response.text();
        console.log('response: ', response);
        setShow(false);
      })();
    })
      .catch(e=> {
        console.log(e.message);
        if(e.message.includes('already-in-use')) {
          setStatus('Error: Email already in use. Please try logging in to your account.')
          setEmail('');
          setName('');
          setPassword('');
          setTimeout(() => setStatus(''), 3000);
          return;
        }
        setStatus(e.message);  
        setTimeout(() => setStatus(''), 3000);
        return;
      });
  }

  // UI component
  return(
    <>
    <Card style={{width: "20em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#7575a3", color:"white"}}>Create Account</Card.Header>
      <Card.Body style={{background:"#e9e6f8"}}> 
      {show ? (
          <div>
            Name<br />
           <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => {setName(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
            Email address <br />
            <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => {setEmail(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
            Password <br />
            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => {setPassword(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
            <button type="submit" className="btn btn-light" disabled={disabled} onClick={handleCreate}>Create Account</button>
          </div>
        ):(
          <div>
            User created: {name}
            <br/>
            <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button> 
            <br/>
            <br/>
            <button className="btn btn-light">
              <Link to="/login/" style={{color: "black", textDecoration: "none"}}>Login</Link>
            </button>
          </div>
        )}
        {status && (<div id="createStatus">{status}</div>)}
      </Card.Body>
    </Card>
    </>
  );
}

export default CreateAccount;