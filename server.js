const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const fs = require('fs');

var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    parseData();
    res.json(parseData());
})
app.post('/api/notes', (req, res) => {
    addNotetoJson(req.body);
    res.json(parseData());
})

function parseData(){
    const database = fs.readFileSync('./db/db.json')
    const parseData = JSON.parse(database);
    return parseData;
}

function createNoteObject(data) {
    const obj = {
        title: data.title,
        text: data.text
    }
    return obj
}

function addNotetoJson(note){
    const json = parseData();
    const newNote = createNoteObject(note);
    json.push(newNote);
    updateDB(json);
}

function updateDB(jsonData) {
    const data = JSON.stringify(jsonData);
    fs.writeFileSync(__dirname + '/db/db.json', data);
}

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
})