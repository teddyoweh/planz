require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Import Morgan for traffic monitoring
const AuthRouter = require('./routes/auth.routes');
const CONFIG = require('./configs/config');
const cors = require('cors');
const mongoose = require('mongoose');
const expressListEndpoints = require('express-list-endpoints');
const UtilRouter = require('./routes/utils.routes');
const ip = require('./ip');
const EventRouter = require('./routes/event.routes');

const app = express();
const port = process.env.PORT || 9900;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

app.use(morgan((tokens, req, res) => {
    return [
    '---------------------------------------',
      `Method: ${req.method}`,
      `Path: ${req.originalUrl}`,
      `Request Body: ${JSON.stringify(req.body)}`,
      `Status Code: ${res.statusCode}`,
      `Response Message: ${res.statusMessage}`,
  
      '---------------------------------------'

    ].join(' | ');
  }));

mongoose.connect(CONFIG.DB, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database' + err);
    }
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', AuthRouter);
app.use('/api/utils', UtilRouter);
app.use('/api/events', EventRouter);

const endpoints = expressListEndpoints(app);
console.log('List of Endpoints:');
endpoints.forEach((endpoint) => {
  console.log(`Path: ${endpoint.path}, Methods: ${endpoint.methods.join(', ')}`);
});

app.listen(port, () => {
    console.log(` Server running on ${JSON.stringify(ip)}:${port}`);
});
