const express = require('express');
const app = express();
const DB = require('./database.js');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

const path = require('path');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));


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


// app.get('/dashboard', (req, res) => {
//   const data = {
//     email: "TEST",
//     password: "ALSO TEST"
//   };

//   res.render('dashboard', { data });
// });


app.post(`/registerUser`, async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const registeredUsers = await DB.findAllUsers();
  if (req.body.role === "Employee") {
    for (userObj of registeredUsers) {
      if (userObj.role !== "Manager") {
        continue;
      }
      if (userObj.groupID === req.body.groupID) {

        for (groupUserObj of registeredUsers) {
          if (groupUserObj.email === req.body.email) {
            console.log("SCUCESffff");
            res.sendStatus(400);
            return;
          }
        }
        console.log("SCUCES");
        await DB.addUser(req.body);
        res.json({groupID: req.body.groupID})
        return;
      }
    }
  
  } else {
    for (groupUserObj of registeredUsers) {
      if (groupUserObj.email === req.body.email) {
        res.sendStatus(400);
        return;
      }
    }

    req.body.groupID = uuid.v4();
    await DB.addUser(req.body);
    res.json({groupID: req.body.groupID})
    // res.send( {authToken: authTokenID, email: req.body.email} );
    // res.sendFile(path.join('./public/dashboard.html'), { authTokenID });
    
    return;
  }
});

function setAuthCookie(res, authToken) {
  res.cookie('token', authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.post(`/login`,async (req, res) => {
  const user = await DB.getUser(req.body.email);
  let authTokenID = uuid.v4();
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, authTokenID);
      res.json({groupID: user.groupID, role: user.role});
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});



app.post(`/addTask`, async (req, res) => {
  let order = req.body;
  return await DB.addOrder(order);
});

app.get(`/getPastTasks`, async (req, res) => {
  let groupID = req.body.groupID;
  const tasks = await DB.getAllOrders(); 
  let todayDate = new Date();
  let taskDate = null;
  let pastTasks = [];
  for (let task of tasks) {
    taskDate = new Date(task.dueDate);
    if (taskDate < todayDate && task.groupID === groupID) {
      pastTasks.push(task);
    }
  }
  res.send(pastTasks);
});

app.get(`/getFutureTasks`, async (req, res) => {
  let groupID = req.body.groupID;
  const tasks = await DB.getAllOrders(); 
  let todayDate = new Date();
  let taskDate = null;
  let futureTasks = [];
  for (let task of tasks) {
    taskDate = new Date(task.dueDate);
    if (taskDate >= todayDate && task.groupID === groupID) {
      pastTasks.push(task);
    }
  }
  res.send(futureTasks);
});

app.put(`/updateTask`, async (req, res) => {
  let orderID = req.body.orderID;
  let orderObj = req.body;
  await DB.updateOrder(orderID, orderObj);
  // upcomingTasks = upcomingTasks.filter((obj) => {
  //   return obj.orderID != orderID;
  // })
  // upcomingTasks.push(req.body);

  res.send();
});

app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

