const express = require('express');
const path = require('path');
const app = express();

const fs = require('fs');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    const database = fs.readFileSync('./db/db.json')
    const dataParse = JSON.parse(database);
    res.json(dataParse);
})
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
})

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
})