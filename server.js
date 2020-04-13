// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", (req, res) => {
  let d = new Date();
  return res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let date = req.params.date_string;
  if (date !== null) {
    let d = new Date(date);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {
           if(isNaN(date)){
             return res.json({error : "Invalid Date" });
           }else{
             d = new Date(parseInt(date));
             return res.json({ unix: d.getTime(), utc: d.toUTCString() });
           }  
      } else {

        return res.json({ unix: d.getTime(), utc: d.toUTCString() });
      }
    } else {
      return res.json({error : "Invalid Date" });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
