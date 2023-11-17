function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


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
        const response = await fetch('/getUsers');
        registeredUsers = await response.json();
        let user = registeredUsers.find((obj) => {
            return obj.email == emailInput;
        });

        if (user == null) {
            alert("Invalid Email Address or Password");
            return;
        }

        if (passwordInput != user.password) {
            alert("Invalid Email Address or Password");
            return;
        }

        if (user.role == "Employee") {
            window.location.href = "employee.html";
        } else {
            window.location.href = "dashboard.html"
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
    if (roleInputValue == "Manager") {
        groupIDInput = generateUUID();
    }

    let user = {email : emailInput, password : passwordInput, role : roleInputValue, groupID: groupIDInput};
    try {
        let response = await fetch('/registerUser', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        console.log(response);
        if (response.status === 400) {
            alert("Error in Registering. Try again");
            return;
        }


        // if (roleInputValue == "Employee") {
        //     window.location.href = "employee.html";
        // } else {
        //     window.location.href = "dashboard.html"
        // }
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

