const loginEmailID = "login-email-input";
const loginPasswordID = "login-password-input";
const registerEmailID = "register-email-input";
const registerPasswordID = "register-password-input";
const registerRoleEmpID = "registerRoleEmp";
const registerRoleManagerID = "registerRoleMan";
const groupIDTag = "group-id-input";

async function login() {
    let emailInput = document.getElementById(loginEmailID).value;
    let passwordInput = document.getElementById(loginPasswordID).value;
    if (emailInput == "" || passwordInput == "") {
        alert("Missing Email Address or Password");
        return;
    }

    try {
        const user = {email: emailInput, password: passwordInput};
        let response = await fetch('/login', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        let body = await response.json();
        if (response.status === 401) {
            alert("Error in Registering. Try again");
            return;
        }

        if (body.role == "Employee") {
            window.location.href = `/employee.html?groupID=${body.groupID}&authToken=${body.authToken}`;
        } else {
            window.location.href = `/dashboard.html?groupID=${body.groupID}&authToken=${body.authToken}`;
        }
    } catch {
        alert("Failure to Login. Try Again");
    }

}

async function register() {

    let emailInput = document.getElementById(registerEmailID).value;
    let passwordInput = document.getElementById(registerPasswordID).value;
    let roleInputEmp = document.getElementById(registerRoleEmpID);
    let roleInputMan = document.getElementById(registerRoleManagerID);
    let groupIDInput = document.getElementById(groupIDTag).value;

    let roleInputChecked = (roleInputEmp.checked != false) ? roleInputEmp.checked : roleInputMan.checked;
    let roleInputValue = (roleInputEmp.checked != false) ? roleInputEmp.value : roleInputMan.value;

    if (emailInput == "" || passwordInput == "" || roleInputChecked == false) {
        alert("Missing Email Address, Password, or Role");
        return;
    }

    let user = {email : emailInput, password : passwordInput, role : roleInputValue, groupID: groupIDInput};
    try {
        let response = await fetch('/registerUser', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        let body = await response.json();
        if (response.status === 400) {
            alert("Error in Registering. Try again");
            return;
        }

        if (user.role == "Employee") {
            window.location.href = `/employee.html?groupID=${body.groupID}&authToken=${body.authToken}`;
        } else {
            window.location.href = `/dashboard.html?groupID=${body.groupID}&authToken=${body.authToken}`;
        }
    } catch {
        alert("Error in Registering. Try again");
        return;
    }

    
}

function displayQuote() {
    const defaultQuote = `“Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, 
    inaccurate, and brilliant. Together they are powerful beyond imagination.”- Albert Einstein`;
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const quoteParagraph = document.getElementById("quote");
        quoteParagraph.innerText = data.content + " -" + data.author;
        })
    .catch(() => {
        const quoteParagraph = document.getElementById("quote");
        quoteParagraph.innerText = defaultQuote;
    })
}

displayQuote();
