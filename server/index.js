const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const dotenv = require('dotenv')

//middleware
app.use(cors())
app.use(express.json())
dotenv.config()

//routes:
//create a band
app.post('/bands', async(req, res) => {
    try {
        const {name, date} = req.body;
        console.log('Received request:', { name, date });
        const newBands = await pool.query('INSERT INTO bands(name, date) VALUES($1, $2)', [name, date]);
        console.log('Inserted band:', newBands.rows[0]);
        res.json(newBands);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create band' });
    }
});


//get all bands

//get a band

//update a band

//delete a band

app.listen(4000, () => {
    console.log("server is listening on port 4000")
})
