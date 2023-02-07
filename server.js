const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const initDb = require("./src/helpers/connections").initDb;
const apiRouter = require('./src/routes/routes');
const cron = require("node-cron");
// const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);
// mongoose.connect('mongodb+srv://vatan:123456Admin@cluster0.zdzky.mongodb.net/v1?retryWrites=true&w=majority')
//   .then(() =>{ 
//     console.log('Connected!');
//     app.listen(3000);
// });

// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb+srv://vatan:123456Admin@cluster0.zdzky.mongodb.net/v1?retryWrites=true&w=majority';
// const client = new MongoClient(url);

// // // Database Name
// const dbName = 'v1';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection =  db.collection('logins');
//     let response = await collection.insertOne({email:"vatan@gmail.com", password:"Admin"});
//     console.log('ss', response);
//     // the following code examples can be pasted here...
//     // app.listen(3000);
//   }
// main();



// Add headers before the routes are defined
cron.schedule("30 11 23 3 * *", function() {
  console.log("running a task every 10 second");
});


const cors = require('cors');
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.use('/api', apiRouter);

initDb(function (err) {
    console.log("yes");
    //app.listen(3000);
    app.listen(process.env.PORT);
});

