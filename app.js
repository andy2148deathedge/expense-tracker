// import library
const express = require('express');


// import self made library

// DB connect
require('./config/mongoose');

// express setting
const app = express();
const PORT = 3000;

// setting & middleware




// routing
app.get('/', (req, res) => {
  res.send('Morning.');
});

// Server listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});