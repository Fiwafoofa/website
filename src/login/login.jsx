import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export function Login(props) {
//   const [authState, setAuthState] = React.useState(false);
  const [groupID, setGroupID] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");  
  const [role, setRole] = React.useState(); 
  const navigate = useNavigate();

  async function loginUser() {
    if (username === "" || password === "") {
        alert("Missing Email Address or Password");
        return;
    }
    try {
        const user = {email: username, password: password};
        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        let body = await response.json();
        if (response.status === 401) {
            alert("Error in Registering. Try again");
            return;
        }
        
        props.setGroupIDFunc(body.groupID);
        // console.log(body);
        // console.log(`${user.email} ${user.password} ${body.groupID}`)
        if (body.role == "Employee") {
            navigate("/employee");
        } else {
            navigate("/manager");
        }
    } catch (err) {
        alert("Failure to Login. Try Again. " + err.message);
    }
  }

  async function registerUser() {
    console.log(`${username} ${password} ${role} ${groupID}`);

    if (username == "" || password == "" || role == undefined) {
        alert("Missing Email Address, Password, Role, or Group ID");
        return;
    }

    let user = {email : username, password : password, role : role, groupID: groupID};

    if (role == "Employee" && groupID == undefined) {
        alert("Missing Group ID");
        return;
    }

    try {
        let response = await fetch('/api/registerUser', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        let body = await response.json();
        if (response.status === 400) {
            alert("Error in Registering. Try again");
            return;
        }

        props.setGroupIDFunc(body.groupID);
        if (user.role == "Employee") {
            navigate('/employee')
        } else {
            navigate('/manager')
        }
    } catch {
        alert("Error in Registering. Try again");
        return;
    }
  }

  return (
    <main>
      <div className="container login-register">
            <h2>Login</h2>                
            <div className="form-outline mb-4">
                <input type="email" id="login-email-input" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                <label className="form-label" htmlFor="login-email-input">Email address</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="login-password-input" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="login-password-input">Password</label>
            </div>
            <div className="d-grid gap-2">
                <button onClick={loginUser} type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>    
            </div>
        </div>

        <div className="container login-register">
            <h2>Register</h2>                
            <div className="form-outline mb-4">
                <input type="email" id="register-email-input" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                <label className="form-label" htmlFor="register-email-input">Email address</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" id="register-password-input" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label" htmlFor="register-password-input">Password</label>
            </div>

            <div className="form-check form-check-inline radio">
                <input id="registerRoleEmp" className="form-check-input" type="radio" name="inlineRadioOptions" value="Employee" onChange={(e) => setRole(e.target.value)} />
                <label className="form-check-label" htmlFor="registerRoleEmp">Employee</label>
                </div>
                <div className="form-check form-check-inline">
                <input id="registerRoleMan" className="form-check-input" type="radio" name="inlineRadioOptions" value="Manager" onChange={(e) => setRole(e.target.value)}/>
                <label className="form-check-label" htmlFor="registerRoleMan">Manager</label>
                </div>

            <div className="form-outline mb-4">
                <input type="text" id="group-id-input" className="form-control" onChange={(e) => setGroupID(e.target.value)}/>
                <label className="form-label" htmlFor="group-id-input">Group ID if Employee (you must specify a group ID provided by
                    your manager).
                </label>
            </div>
            <div className="d-grid gap-2">
                <button onClick={registerUser} type="submit" className="btn btn-primary btn-block mb-4">Register</button>    
            </div>
        </div>
    </main>
  );
}