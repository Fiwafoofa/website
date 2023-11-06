let registeredUsers = [
    {email : "test" , password : "test", role : "Manager"},
    {email : "test2" , password : "test2", role : "Employee"}
]

const loginEmailID = "login-email-input";
const loginPasswordID = "login-password-input";

const registerEmailID = "register-email-input";
const registerPasswordID = "register-password-input";
const registerRoleEmpID = "registerRoleEmp";
const registerRoleManagerID = "registerRoleMan";

function login() {
    let emailInput = document.getElementById(loginEmailID).value;
    let passwordInput = document.getElementById(loginPasswordID).value;
    if (emailInput == "" || passwordInput == "") {
        alert("Missing Email Address or Password");
        return;
    }

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
}

function register() {
    console.log(registeredUsers);

    let emailInput = document.getElementById(registerEmailID).value;
    let passwordInput = document.getElementById(registerPasswordID).value;
    let roleInputEmp = document.getElementById(registerRoleEmpID);
    let roleInputMan = document.getElementById(registerRoleManagerID);
    let roleInputChecked = (roleInputEmp.checked != false) ? roleInputEmp.checked : roleInputMan.checked;
    let roleInputValue = (roleInputEmp.checked != false) ? roleInputEmp.value : roleInputMan.value;

    if (emailInput == "" || passwordInput == "" || roleInputChecked == false) {
        alert("Missing Email Address, Password, or Role");
        return;
    }

    let user = {email : emailInput, password : passwordInput, role : roleInputValue}

    registeredUsers.push(user);
    localStorage.setItem(emailInput, user);

    if (roleInput1 == true) {
        window.location.href = "employee.html";
    } else {
        window.location.href = "dashboard.html"
    }
}

