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

app.post(`/registerUser`, async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);
  const registeredUsers = await DB.findAllUsers();
  let authTokenID = uuid.v4();
  if (req.body.role === "Employee") {
    for (userObj of registeredUsers) {
      if (userObj.role !== "Manager") {
        continue;
      }
      if (userObj.groupID === req.body.groupID) {
        for (groupUserObj of registeredUsers) {
          if (groupUserObj.email === req.body.email) {
            res.sendStatus(400);
            return;
          }
        }
        await DB.addAuthToken({authToken: authTokenID});
        await DB.addUser(req.body);
        res.json({groupID: req.body.groupID, authToken: authTokenID});
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
    await DB.addAuthToken({authToken: authTokenID});
    await DB.addUser(req.body);
    res.json({groupID: req.body.groupID, authToken: authTokenID});
    
    return;
  }
});

app.post(`/login`,async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      let authTokenID = uuid.v4();
      await DB.addAuthToken({authToken: authTokenID});
      res.json({groupID: user.groupID, role: user.role, authToken: authTokenID});
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

app.post(`/logout`, async (req, res) => {
  const authTokenID = req.body.authToken;
  console.log(req.body);
  await DB.deleteAuthToken(authTokenID);
  res.send();
});

app.post(`/validateAuthToken`, async (req, res) => {
  let authToken = req.body.authToken;
  authToken = await DB.getAuthToken(authToken)
  if (authToken) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.post(`/validateGroup`, async (req, res) => {
  let groupID = req.body.groupID;
  groupID = await DB.getGroupID(groupID);
  if (groupID) {
    res.sendStatus(200);
    return;
  }
  res.sendStatus(400);
});

app.post(`/addTask`, async (req, res) => {
  let order = req.body;
  let dbOrder = await DB.getOrder(order.orderID, order.groupID);
  if (dbOrder) {
    res.sendStatus(400);
    return;
  }
  return await DB.addOrder(order);
});

app.post(`/getPastTasks`, async (req, res) => {
  let groupID = req.body.groupID;
  const tasks = await DB.getAllOrders(groupID); 
  let todayDate = new Date();
  let taskDate = null;
  let pastTasks = [];
  for (let task of tasks) {
    taskDate = new Date(task.dueDate);
    if (taskDate < todayDate && task.groupID === groupID) {
      pastTasks.push(task);
    }
  }
  res.send({pastTasks: pastTasks});
});

app.post(`/getFutureTasks`, async (req, res) => {
  let groupID = req.body.groupID;
  const tasks = await DB.getAllOrders(groupID); 
  let todayDate = new Date();
  let taskDate = null;
  let futureTasks = [];
  for (let task of tasks) {
    taskDate = new Date(task.dueDate);
    if (taskDate >= todayDate && task.groupID === groupID) {
      futureTasks.push(task);
    }
  }
  res.send({futureTasks: futureTasks});
});

app.put(`/updateTask`, async (req, res) => {
  let orderID = req.body.orderID;
  let orderObj = req.body;
  await DB.updateOrder(orderID, orderObj);

  res.send();
});

app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

