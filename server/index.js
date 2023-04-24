const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const pool2 = require('./db2')


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


//show data for second database
app.get('/upcoming', async (req, res) => {
    try {
      const allUpcoming = await pool2.query('SELECT * FROM upcoming');
      const formattedEvents = allUpcoming.rows.map(event => ({
        title: event.name,
        image: event.image,
        venue: event.venue,
        date: new Date(event.date), 
      }));
      res.json(formattedEvents);
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ error: 'Failed to retrieve events' });
    }
  });
  
  

//post route for second database
app.post('/upcoming', async (req, res) => {
    try {
      const { name, date, image, venue } = req.body;
      console.log('Received request:', { name, date, image, venue });
      const newEvent = await pool2.query('INSERT INTO upcoming(name, date, image, venue) VALUES($1, $2, $3, $4) RETURNING *', [name, date, image, venue]);
      console.log('Inserted event:', newEvent.rows[0]);
      const insertedEvent = newEvent.rows[0];
      res.json({ 
          success: true, 
          message: 'Event created successfully',
          event: { 
              id: insertedEvent.upcoming_id, 
              name: insertedEvent.name, 
              date: insertedEvent.date,
              image: insertedEvent.image,
              venue: insertedEvent.venue
          }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to create event' });
    }
  });
  
  

app.listen(4000, () => {
    console.log("server is listening on port 4000")
})
