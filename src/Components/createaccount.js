import React from "react";
import {Card} from "react-bootstrap";
import UserContext from "./context";

function CreateAccount(){
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);
  const ctx = React.useContext(UserContext);

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  function validate(field, label) {
    if(!field){
      setStatus('Error: Please enter '+label);
      setTimeout(()=> setStatus(''), 3000)
      return false;
    }
    return true;
  }

  function handleCreate() {
    if(!validate(name, 'name')) return;
    if(!validate(email, 'email')) return;
    if(!validate(password, 'password')) return;
    if(password.length<8) {
      setStatus('Error: Password must be 8 characters minimum');
      setTimeout(() => setStatus(''), 3000);
      return;
    }
    if(!email.includes("@") || !email.includes(".")) {
      setStatus('Error: Invalid email');
      setTimeout(() => setStatus(''), 3000);
      return;
    }

    if(ctx.users.length>0) {
      for(let i = 0; i<ctx.users.length; i++){
        if(email == ctx.users[i].email) {
          setStatus('Error: An account already exists for this email. Please use a different email or try logging in.')
          setTimeout(() => setStatus(''), 3000);
          return;
        }
      }
    }
    ctx.users.push({name,email,password,balance:0.00})
    setShow(false);
    console.log("Password stored as plain text. Real banking application would use encryption for storage and retreival of user information.")
  }

  return(
    <>
    <Card style={{width: "18em", display:"block", marginLeft:"auto", marginRight:"auto"}}>
      <Card.Header style={{background: "#7575a3", color:"white"}}>Create Account</Card.Header>
      <Card.Body style={{background:"#e9e6f8"}}> 
      {show ? (
          <>
          Name<br />
          <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => {setName(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
          Email address <br />
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => {setEmail(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
          Password <br />
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => {setPassword(e.currentTarget.value); if(e.currentTarget.value=='') setDisabled(true); if(e.currentTarget.value !== '') setDisabled(false)}} /> <br />
          <p style={{fontSize: "70%"}}>*Note: Password stored as plain text - please do not use a real password.</p>
          <button type="submit" className="btn btn-light" disabled={disabled} onClick={handleCreate}>Create Account</button>
          </>
        ):(
          <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
          </>
        )}
        {status && (<div id="createStatus">{status}</div>)}
      </Card.Body>
    </Card>
    </>
  );
}

export default CreateAccount;