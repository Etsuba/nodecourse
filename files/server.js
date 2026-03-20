const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('../middleware/logEvents.js');
const cors = require('cors');

// custom middleware
app.use(logger);

// CORS setup
const whitelist = ['http://localhost:3000', 'https://myapp.com'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// built-in middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

app.get('/new-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

app.get('/old-page.html', (req, res) => {
  res.redirect(301, '/new-page.html');
});

app.get('/hello.html', (req, res, next) => {
  console.log('attempted to load hello.html');
  next();
}, (req, res) => {
  res.send("hello world");
});

const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res) => {
  console.log('two');
  res.send('finished');
};

app.get('/chain.html', [one, two]);

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

// error handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});