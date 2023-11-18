const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require("./dbConfig.json") 

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('PTracker');
const users = db.collection('users');
const futureOrders = db.collection('futureOrders');
const pastOrders = db.collection('pastOrders');
const authTokens = db.collection('authTokens'); // {authtoken, username}

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

async function addAuthToken(authToken) {
  return await authTokens.insertOne(authToken);
}

function getAuthToken(authToken) {
  return authTokens.findOne( {authToken: authToken.authToken});
}

async function addOrder(orderObj) {
  return await futureOrders.insertOne(orderObj);
}

function getAllOrders(groupID) {
  return users.find( { groupID: groupID} ).toArray();
}


async function updateOrder(orderID, orderObj) {
  return await futureOrders.updateOne({ orderID : orderID}, 
    { $set: {productName: orderObj.productName, dueDate: orderObj.dueDate, startTime: orderObj.startTime, endTime: orderObj.endTime, 
      customer: orderObj.customer, otherNotes: orderObj.otherNotes, orderID: orderObj.orderID}});
} 



(async function () {
  // await testConnection();
  // await addUser("bob5", '123', "Employee", '32132dasd');
  
  // findAllUsers()
  //   .then(users => console.log(users))
  //   .catch(error => console.error(error))
  // console.log(isValidGroup("62974d9f-2c3f-456c3b-78298b441e53"))
     
    
})();

// client.close()
module.exports = { addUser, findAllUsers, getUser, addAuthToken, getAuthToken, addOrder, getAllOrders, updateOrder };