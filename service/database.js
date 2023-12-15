const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./dbConfig.json") 

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('PTracker');
const users = db.collection('users');
const futureOrders = db.collection('futureOrders');
const pastOrders = db.collection('pastOrders');
const authTokens = db.collection('authTokens'); 

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addUser(user) {
  // const user = {username: username, password: password, role: role, groupID: groupID};
  const result = await users.insertOne(user);
  return result;
}

function findAllUsers() {
  return users.find().toArray();
}

function getUser(email) {
  return users.findOne({ email: email });
}

function getGroupID(groupID) {
  return users.findOne({ groupID: groupID });
}

async function addAuthToken(authToken) {
  return await authTokens.insertOne(authToken);
}

function getAuthToken(authTokenID) {
  return authTokens.findOne( {authToken: authTokenID});
}

function deleteAuthToken(authTokenID) {
  return authTokens.deleteOne( {authToken: authTokenID})  
}

async function addOrder(orderObj) {
  return await futureOrders.insertOne(orderObj);
}

async function getAllOrders(groupID) {
  let futureTasks = await futureOrders.find( { groupID: groupID} ).toArray();
  let pastTasks = await pastOrders.find( {groupID: groupID});
  return futureTasks.concat(pastTasks);
  // return (futureOrders.find( { groupID: groupID} ).toArray() + pastOrders.find( {groupID: groupID}));
}

function getOrder(orderID, groupID) {
  return futureOrders.findOne( {orderID: orderID, groupID: groupID} );
}


async function updateOrder(orderID, orderObj) {
  return await futureOrders.updateOne({ orderID : orderID}, 
    { $set: {productName: orderObj.productName, dueDate: orderObj.dueDate, startTime: orderObj.startTime, endTime: orderObj.endTime, 
      customer: orderObj.customer, otherNotes: orderObj.otherNotes, orderID: orderObj.orderID}});
} 

module.exports = { addUser, findAllUsers, getUser, addAuthToken, getAuthToken, addOrder, getAllOrders, updateOrder, getOrder, deleteAuthToken, getGroupID };