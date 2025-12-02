require('dotenv').config();
const app = require('./src/app');
const { testConnection } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Probar conexión a la base de datos
        await testConnection();


        app.listen(PORT, () => {
            console.log('=================================');
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📝 Entorno: ${process.env.NODE_ENV || 'development'}`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1); // Terminar proceso si hay error
    }
};

startServer();