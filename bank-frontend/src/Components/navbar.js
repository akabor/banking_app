import ReactBootstrap from "react-bootstrap";
import Bootstrap from "bootstrap";
import {Link} from "react-router-dom";

function NavBar() {
  
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BOA</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createaccount/">Create Account</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login/" >Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/deposit/">Deposit</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/withdraw/">Withdraw</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accountinformation/">Account Information</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;