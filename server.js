'use strict';
import express from 'express';
import morgan from 'morgan';
import encryptRouter from './encrypt/router';
import decryptRouter from './decrypt/router';
import bodyParser from 'body-parser'
const jsonParser = bodyParser.json();
const {
  PORT,
  DATABASE_URL
} = require('./config');

const app = express();

app.use(morgan('common'));
app.use(jsonParser);
 
app.use('/api/encrypt/', encryptRouter); 
app.use('/api/decrypt/', decryptRouter); 


app.use('*', (req, res) => {
  return res.status(404).json({
    message: 'Not Found'
  });
}); 

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer(port = PORT) {

  return new Promise((resolve, reject) => {

      server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
         
          reject(err);
        });
    });

}

function closeServer() {

    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {
  app,
  runServer,
  closeServer
};