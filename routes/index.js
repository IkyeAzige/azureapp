var express = require('express');
var { MongoClient } = require('mongodb');

var router = express.Router();

const title = process.env.TITLE;

/* GET home page. */
router.get('/', function (req, res, next) {
  /*
 const url = process.env.URL;
 const password = process.env.PASSWORD;
 const user = process.env.USER;
 */
  const url = 'mongodb://@librarydb.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';
  const password = '6AfFq1ilYPEOlujAMb8EPXTbPGJvqlh7PSotiVvCilWTsXzjBVjF1cAma5keeIhoLNnRbAybJqkn68CNcf1Q2Q==';
  const user = 'librarydb';
  const dbName = 'librarydb';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url, {
       auth: {
          user,
          password
        },
        useNewUrlParser: true
      }
      );

      const db = client.db(dbName);
      const response = await db.collection('books').find().toArray();
      res.json(response);
    } catch (err) {
      console.log(err);
    }
  }())
});

module.exports = router;
