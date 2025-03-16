// Import the express module
const express = require('express');
const app = express();

// Enable CORS for all routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the current directory
app.use(express.static('.'));

// Start the server
app.listen(8080, function() {
  console.log('App listening on port 8080!');
});

// Phase 1.2: Implement /test/* route
app.get('/test/*', function(req, res) {
  // Extract the part after /test/
  const message = req.url.split('/test/')[1];
  res.json({"msg": message});
});

// Phase 1.3: Implement /cpt/inc and /cpt/query routes
// Initialize counter
let counter = 0;

// Route to query the counter
app.get('/cpt/query', function(req, res) {
  res.json(counter);
});

// Route to increment the counter
app.get('/cpt/inc', function(req, res) {
  // Check if there's a value parameter
  if (req.query.v) {
    // Try to parse the value as an integer
    const increment = parseInt(req.query.v);
    
    // Check if the parsed value is a valid integer
    if (!isNaN(increment)) {
      counter += increment;
      res.json({"code": 0});
    } else {
      // Not a valid integer
      res.json({"code": -1});
    }
  } else {
    // No value parameter, increment by 1
    counter += 1;
    res.json({"code": 0});
  }
});

// Phase 1.4: Implement message management routes
// Initialize messages array with some sample messages with metadata
var allMsgs = [
  { 
    "msg": "Hello World", 
    "pseudo": "System", 
    "date": new Date().toISOString() 
  },
  { 
    "msg": "foobar", 
    "pseudo": "System", 
    "date": new Date().toISOString() 
  },
  { 
    "msg": "CentraleSupelec Forever", 
    "pseudo": "System", 
    "date": new Date().toISOString() 
  }
];

// Route to get a specific message by index
app.get('/msg/get/*', function(req, res) {
  // Extract the index from the URL
  const indexStr = req.url.split('/msg/get/')[1];
  const index = parseInt(indexStr);
  
  // Check if the index is valid
  if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
    res.json({"code": 1, "msg": allMsgs[index]});
  } else {
    res.json({"code": 0});
  }
});

// Route to get all messages
app.get('/msg/getAll', function(req, res) {
  res.json(allMsgs);
});

// Route to get the number of messages
app.get('/msg/nber', function(req, res) {
  res.json(allMsgs.length);
});

// Route to post a new message
app.get('/msg/post/*', function(req, res) {
  // Extract the message from the URL
  const messagePath = req.url.split('/msg/post/')[1];
  
  // Check if there are query parameters for pseudo
  const pseudo = req.query.pseudo || "Anonymous";
  
  // Create a message object with metadata
  const messageObj = {
    "msg": unescape(messagePath),
    "pseudo": pseudo,
    "date": new Date().toISOString()
  };
  
  // Add the message to the array
  allMsgs.push(messageObj);
  
  // Return the index of the new message
  res.json(allMsgs.length - 1);
});

// Enhanced route to post a message with JSON payload
app.post('/msg/post', express.json(), function(req, res) {
  // Extract message data from request body
  const { msg, pseudo } = req.body;
  
  if (!msg) {
    return res.status(400).json({ "code": -1, "error": "Message content is required" });
  }
  
  // Create a message object with metadata
  const messageObj = {
    "msg": msg,
    "pseudo": pseudo || "Anonymous",
    "date": new Date().toISOString()
  };
  
  // Add the message to the array
  allMsgs.push(messageObj);
  
  // Return the index of the new message
  res.json({ "code": 0, "index": allMsgs.length - 1 });
});

// Route to delete a message
app.get('/msg/del/*', function(req, res) {
  // Extract the index from the URL
  const indexStr = req.url.split('/msg/del/')[1];
  const index = parseInt(indexStr);
  
  // Check if the index is valid
  if (!isNaN(index) && index >= 0 && index < allMsgs.length) {
    // Remove the message at the specified index
    allMsgs.splice(index, 1);
    res.json({"code": 1});
  } else {
    res.json({"code": 0});
  }
});
