import { createPool } from 'mysql2/promise';

// Create a connection pool
const pool = createPool({
    host: 'bu4ymuelpn1ukg8hprfe-mysql.services.clever-cloud.com',
    user: 'ulazpbm18bjpnbnp',
    password: 'SFeuhaZLbL4bnbpk6mmQ',
    database: 'bu4ymuelpn1ukg8hprfe',
    connectionLimit: 5 // Adjust the connection limit as per your requirements
});

// test connection
pool.getConnection()
    .then(connection => {
        console.log('Conexion con la base de datos');
        connection.release();
    })
    .catch(error => {
        console.log('Error de conexion a la base de datos', error);
    });


export default pool;