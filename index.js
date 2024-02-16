// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api", function (_, res) {
  const time = new Date();
  res.json({
    unix: time.getTime(),
    utc: time.toUTCString()
  });
});

app.get('/api/:time', (req, res) => {
  const timeNumber = req.params.time - 0;
  const time = new Date(
    isNaN(timeNumber)
      ? req.params.time
      : timeNumber
  );
  const utc = time.toUTCString();
  res.json(utc === 'Invalid Date' ? {
    error: utc
  } : {
    unix: time.getTime(),
    utc: time.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
