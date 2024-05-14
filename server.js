const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

db.serialize(() => {
    db.run("CREATE TABLE expenses (description TEXT, amount REAL)");
});

app.post('/add-expense', (req, res) => {
    const { description, amount } = req.body;
    db.run("INSERT INTO expenses (description, amount) VALUES (?, ?)", [description, amount], (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).send('Expense added successfully');
    });
});

app.get('/expenses', (req, res) => {
    db.all("SELECT * FROM expenses", [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).json(rows);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
