'use strict';
const express = require('express');
require('dotenv').config()
const path = require('path');
const app = express();
const port = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const cors = require('cors');
const multipart = require('connect-multiparty');
require('./server/database/mongo');
const { decryptApiKey } = require('./server/utils/tools');

app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(multipart());
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

 app.use('/v0.1/', decryptApiKey);
 require('./server/version/v1')(app);
 // Serve static files....
app.use(express.static(__dirname + '/dist/assignmentFront'));
//   })
// Send all requests to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/assignmentFront/index.html'));
});

// added this to debug maxListener Event error
process.on('warning', e => consoleHelpers.warn(e.stack));
app.listen(port, () => {
  console.log(`Server on port: ${port}`); // eslint-disable-line
});

module.exports = app;
