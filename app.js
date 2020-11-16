// require("newrelic");
var dotenv = require('dotenv');
dotenv.load();
var express = require('express');
var app = express();
var http = require('http');

// setting 
app.use('*',(req,res,next)=>{
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate');
  next();
  })
    

app.use(express.static('dist'));
var server = http.createServer(app);
app.get('/health', (req, res) => { 
  res.json( { "status": "success", "message": "service is healthy" });
});
app.get('*', (req, res) => { 
  res.sendFile('index.html', { root: "dist"});
});
app.post('*', (req, res) => { 
  console.log(req)
  console.log(req.body)
  res.json( { "status": "success", "message": "reviced" });
});

app.post('/', (req, res) => { 
  console.log(req)
  console.log(req.body)
  res.json( { "status": "success", "message": "reviced" });
});

server.listen(process.env.PORT, function(){
    console.log('info', 'Express server listening on port ' + process.env.PORT);
  });
