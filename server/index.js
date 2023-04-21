const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')


//middleware
app.use(cors())
app.use(express.json())


//routes:
//create a band
app.post('/bands', async(req, res) => {
    try {
        const {name, date} = req.body;
        console.log('Received request:', { name, date });
        const newBands = await pool.query('INSERT INTO bands(name, date) VALUES($1, $2) RETURNING *', [name, date]);
        console.log('Inserted band:', newBands.rows[0]);
        const insertedBand = newBands.rows[0];
        res.json({ 
            success: true, 
            message: 'Band created successfully',
            band: { 
                id: insertedBand.id, 
                name: insertedBand.name, 
                date: insertedBand.date 
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create band' });
    }
});

//get all bands
app.get('/bands', async(req, res) => {
    try {
        const allBands = await pool.query('SELECT * FROM bands');
        res.json(allBands.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//get a band
app.get('/bands/:id', async(req, res) => {
    try {
       const {id} = req.params;
       const bands = await pool.query('SELECT * FROM bands WHERE bands_id = $1', [id])

       res.json(bands.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//update a band
app.put('/bands/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {name, date} = req.body; // Add "date" here
        const bands_id = parseInt(id);
        const updateBands = await pool.query('UPDATE bands SET name = $1, date = $2 WHERE bands_id = $3', [name, date, id]);
        res.json('Bands were updated')
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Error updating bands'});
    }
})

//delete a band
app.delete('/bands/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const deleteBands = await pool.query('DELETE FROM bands WHERE bands_id = $1', [id])
        res.json("Band was deleted")
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(4000, () => {
    console.log("server is listening on port 4000")
})
