const express = require('express');

//Initiate server port
const app = express();
const PORT = 3001;

app.use(express.static('public'));

// Get index.html 
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../index.html'))
);

//Get notes.html after button click or /notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../../notes.html'))
);

//Initiate server port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);