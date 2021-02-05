const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const fs = require('fs');

var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    const data = parseData();
    res.json(data);
})
app.post('/api/notes', (req, res) => {
    newNote(req.body);
    res.json(parseData());
})

function parseData(){
    const database = fs.readFileSync('./db/db.json')
    const parseData = JSON.parse(database);
    console.log(parseData);
    return parseData;
}

function noteObject(data) {
    let dbArray = parseData();
    let i = dbArray.length;
    
    const obj = {
        title: data.title,
        text: data.text,
        id: i++
    }
    return obj;
}

function newNote(note){
    const json = parseData();
    const newNote = noteObject(note);
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