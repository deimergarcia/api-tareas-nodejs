const mysql = require('mysql2/promise');

//configuracion de la conexion
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'api_tareas_db',
    waitForConnections: true,
    connectionLimit: 10,      // Máximo 10 conexiones simultáneas
    queueLimit: 0,            // Sin límite de cola
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

//verificar conexion
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Conexión a MySQL establecida correctamente');
        console.log(`📊 Base de datos: ${dbConfig.database}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con MySQL:');
        console.error(`   Host: ${dbConfig.host}`);
        console.error(`   Usuario: ${dbConfig.user}`);
        console.error(`   Base de datos: ${dbConfig.database}`);
        console.error(`   Error: ${error.message}`);
        return false;
    }
};

//hacer queries
const query = async (sql, params)=>{
    try{
      const [results] = await pool.execute(sql, params); 
      return results; 
    }catch(error){
        console.error('Error en query: ', error);
        throw error;
    }  
};

module.exports={
    pool,
    query,
    testConnection
};