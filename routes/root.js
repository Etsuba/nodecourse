const express = require('express')
const router = express.Router() //interms of app
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new-page.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get('/old-page.html', (req, res) => {
  res.redirect(301, '/new-page.html');//its ok for the redirect if we dont go back to the folder like we didi for the above
});

module.exports = router