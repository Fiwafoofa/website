const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());

app.use(express.static('public'));


let pastTasks = [
  {orderID : "safe#ab12", productName : "Stainless Steel Safe", dueDate : "10/25/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "chair#cd34", productName : "Stainless Steel Chair", dueDate : "10/11/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "plate#ef45", productName : "Stainless Steel Plate", dueDate : "10/12/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "bowl#gh67", productName : "Stainless Steel Bowl", dueDate : "8/10/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "safe3#ab34", productName : "Stainless Steel Safe", dueDate : "8/7/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "chair3#cd56", productName : "Stainless Steel Chair", dueDate : "10/2/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "plate3#ef710", productName : "Stainless Steel Plate", dueDate : "2/12/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
  {orderID : "bowl3#gh90   ", productName : "Stainless Steel Bowl", dueDate : "10/2/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"}
];

let upcomingTasks = [
  {orderID : "safe2#ab12", productName : "Stainless Steel Safe", dueDate : "11/01/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "safe2#ab100", productName : "Stainless Steel Safe", dueDate : "11/03/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "chair2#cd34", productName : "Stainless Steel Chair", dueDate : "12/11/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "plate2#ef45", productName : "Stainless Steel Plate", dueDate : "12/12/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "bowl2#gh67", productName : "Stainless Steel Bowl", dueDate : "11/12/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "safe4#ab34", productName : "Stainless Steel Safe", dueDate : "11/17/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "chair4#cd56", productName : "Stainless Steel Chair", dueDate : "12/2/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "plate4#ef710", productName : "Stainless Steel Plate", dueDate : "11/13/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
  {orderID : "bowl4#gh90   ", productName : "Stainless Steel Bowl", dueDate : "12/3/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"}
];

let registeredUsers = [
  {email : "test" , password : "test", role : "Manager"},
  {email : "test2" , password : "test2", role : "Employee"}
]

app.post(`/registerUser`, (req, res) => {
  registeredUsers.push(req.body);
  res.send();
});

app.get(`/getUsers`, (req, res) => {
  res.send(registeredUsers)
});

app.post(`/addTask`, (req, res) => {
  let taskDate = new Date(req.body.dueDate);
  let todayDate = new Date();
  if (taskDate < todayDate) {
    pastTasks.push(req.body)
  } else {
    upcomingTasks.push(req.body)
  }
  res.send()
});

app.get(`/getPastTasks`, (req, res) => {
  res.send(pastTasks);
});

app.get(`/getFutureTasks`, (req, res) => {
  res.send(upcomingTasks);
});

app.put(`/updateTask`, (req, res) => {
  let orderID = req.body.orderID;
  upcomingTasks = upcomingTasks.filter((obj) => {
    return obj.orderID != orderID;
  })
  upcomingTasks.push(req.body);
  res.send();
});

app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

