import express from 'express';
import pool from './config/db.js';
import 'dotenv/config';

// Import required modules




// Create an Express app
const app = express();


const puerto = process.env.PORT || 3000;

// Enable JSON parsing for request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('/public'));

// Read all resources
app.get('/productos', async  (req, res) => {
    const sql = `SELECT * FROM productos`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql) ;
        connection.release();
        console.log("Productos",rows)
        res.json(rows);

    } catch (error) {
        res.send(500).send('Internal server error')
    }


});

// Read a specific resource
app.get('/productos/:id', async (req, res) => {
    const id = req.params.id
    console.log("Intentando obtener producto con id :"+id);
    const sql = `  
    SELECT productos.id_producto, productos.descripcion, productos.stock, productos.precio, categorias.nombre AS categoria_nombre
    FROM productos
    JOIN categorias ON productos.id_categoria = categorias.id_categoria
    WHERE productos.id_producto = ?
  `;


    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql,[id]) ;
        connection.release();
        console.log("Un producto -->", rows[0])
        res.json(rows[0]);

    } catch (error) {
        res.status(500).json({message:'Internal server error'});

        
    }

 
});

// Create a new resource
app.post('/productos',  async (req, res) => {

    const producto = req.body;
    const sql = `INSERT INTO productos SET?`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql,[producto]) ;
        connection.release();
        console.log( rows)
        res.send(`
           <h1>Producto creado con id:${rows.insertId}</h1>
            `);

    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }

});

// Update a specific resource
app.put('/productos/:id', async (req, res) => {
    const id = req.params.id;
    const producto = req.body;

    const sql = `UPDATE  productos SET ? WHERE id_producto = ?`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql,[producto,id]) ;
        connection.release();
        console.log( rows)
        res.send(`
            <h1>Producto actualizado id: ${id}</h1>
            `);

    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }


});

// Delete a specific resource
app.delete('/productos/:id', async(req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM productos WHERE id_producto = ?`;

    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql,[id]) ;
        connection.release();
        console.log(rows)
        res.send(`
            <h1>Producto borrado id: ${id}</h1>
            `);;

    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }



});




// Iniciar el servidor

app.listen(puerto, () => {
    console.log(`Servidor escuchando el puerto ${puerto}`);
});