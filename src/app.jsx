import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Employee } from './employee/employee';
import { Manager } from './manager/manager';
// import { Manager } from './manager/manager';

export default function App() {

  const [groupID, setGroupID] = React.useState(null);
  return (
    <BrowserRouter>
      <header>    
        <nav className="navbar navbar-dark">
            <h1 className="heading"><img src="/logo.png" className="logo" /> P Tracker</h1>
            
            {groupID !== null && (
              <ul className="nav nav-pills nav-fill justify-content-end">
                  <li className="nav-item heading" id="group-id"> Group ID: {groupID}</li>
                  <li className="nav-item">
                      {/* <a href="index.html" className="nav-link btn btn-outline-light justify-content-end" onClick="logout()">Logout</a>    */}
                      <NavLink className="nav-link btn btn-outline-light justify-content-end" to="login" onClick={(e) => {setGroupID(null)}}>Logout</NavLink>
                  </li>
              </ul>
            )}
            
        </nav>
      </header>

      
      <Routes>
        <Route path='/' element={<Login setGroupIDFunc={setGroupID} />} exact />
        <Route path='/login' element={<Login setGroupIDFunc={setGroupID}/>} exact />
        <Route path='/employee' element={<Employee groupID={groupID} />} />
        <Route path='/manager' element={<Manager groupID={groupID} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>



      <footer className="bg-dark text-center text-lg-start">
          <div className="container p-4 footer-item">
            <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                  <h5 className="text-uppercase">ABOUT</h5>
                  <p>
                      This product tracking application will allow organizations 
                      to digitally create products with information about production such as materials and 
                      time of production. With this 
                      tool, companies will be able to be better organized and take the next step forward with 
                      their manufacturing.
                  </p>
                </div>
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Quote</h5>

                    <Quote />
                </div>
            </div>
            <div className='footer-center'>
              <a href="https://github.com/Fiwafoofa/website"> &bull; GitHub Page</a>
              <NavLink to="login"> &bull; Login</NavLink>
              <NavLink to="employee">  &bull; Employee </NavLink>
              <NavLink to="manager">  &bull; Manager </NavLink>
            </div>
          
          </div>
      </footer>
    </BrowserRouter>
  );
}

function Quote() {
  const [quote, setQuote] = React.useState('');


  const defaultQuote = `“Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, 
    inaccurate, and brilliant. Together they are powerful beyond imagination.”- Albert Einstein`;
  
  React.useEffect(() => {
    fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((data) => {
      setQuote(data.content + " - " + data.author);
      })
    .catch(() => {
        setQuote(defaultQuote);
    });
  }, []); 
  return (
    <p id="quote">{quote}</p>
  );
}

function NotFound() {
  return <main classNameName='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

{/* <NavLink to="employee"> &bull; Employee Dashboard</NavLink>
<NavLink to="manager"> &bull; Manager Dashboard</NavLink> */}
