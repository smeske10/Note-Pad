const express = require('express');
const fs = require('fs');
const path = require('path');
let notes = require('./db/db.json');

//Initiate server port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET request for index 
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

//GET request for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//GET request for saved notes
app.get('/api/notes', (req, res) =>
    res.json(notes)
);

// POST request for save note
app.post('/api/notes', (req, res) => {
    req.body.id = Math.floor(Math.random() * 1000);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    notes.push(req.body);
    res.json(notes);
});

// Delete request for notes
app.delete('/api/notes/:id', (req, res) => {
    let array = [];
    for (let i = 0; i < notes.length; i++) {
        if (req.params.id != notes[i].id) {
            array.push(notes[i])
        }
    }
    fs.writeFileSync('./db/db.json', JSON.stringify(array));
    notes = array;
    res.json(notes);
});

//Initiate server port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);