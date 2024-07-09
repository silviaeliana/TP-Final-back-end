import express from 'express';
import pool from './config/db.js';
import 'dotenv/config';

// Import required modules

// Create an Express app
const app = express();

const puerto = process.env.PORT || 3000;

// Enable JSON parsing for request bodies
app.use(express.json());


// Read all resources
app.get('/productos',  (req, res) => {
 

});

// Read a specific resource
app.get('/productos/:id',  (req, res) => {
  

 
});

// Create a new resource
app.post('/productos',  (req, res) => {

});

// Update a specific resource
app.put('/productos/:id',  (req, res) => {


});

// Delete a specific resource
app.delete('/productos/:id',  (req, res) => {

});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});