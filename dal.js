const MongoClient = require('mongodb').MongoClient;
// update url to connect to your DB
const url = '';
var db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err,client){
  console.log("connected to mongoDB");

  //connect to database named BankApp
  const dbName = 'BankApp';
  db = client.db(dbName);
});

//function to create new user and write to DB
function create(name, email){
  return new Promise((resolve, reject)=>{
    const collection = db.collection('users');
    const doc = {name, email, balance:0};
    //var user = collection.findOne({email: email});
    collection.insertOne(doc, {w:1}, function(err, result){
      err ? reject(err) : resolve(doc);
    });
  });
}

//function to create new user and write to DB
function find(email){
  return new Promise((resolve, reject)=>{
    const customers = db
      .collection('users')
      .find({email: email})
      .toArray(function(err,doc) {
        err ? reject(err) : resolve(doc);
      });
  });
}

// all users
function all(){
  return new Promise((resolve, reject) => {    
      const customers = db
          .collection('users')
          .find({})
          .toArray(function(err, docs) {
              err ? reject(err) : resolve(docs);
      });    
  })
}

//function to create new user and write to DB
function update(email, funds){
  return new Promise((resolve, reject)=>{
    db.collection('users')
      .findOneAndUpdate(
        {"email":email},
        {
          $inc: {balance: funds}
        },
        {returnOriginal: false},
        function(err, doc) {
          err ? reject(err) : resolve(doc);
        }
      );
  });
}

//function to delete all users 
function deleteAll(){
  return new Promise((resolve, reject) => {    
      db.collection('users').deleteMany({}, (err, docs)=>{
        err ? reject(err) : resolve(docs);
      });  
  });
}

module.exports = {create, find, update, all, deleteAll}