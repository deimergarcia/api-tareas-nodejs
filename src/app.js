const express = require('express');
const cors = require('cors');

const app = express();

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

// CORS: Permitir peticiones desde el frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'localhost:4300',
    credentials: true
}));

// Parser de JSON: Permite leer req.body como JSON
app.use(express.json());

// Parser de URL: Permite leer datos de formularios
app.use(express.urlencoded({ extended: true }));

// ============================================
// RUTAS
// ============================================

// Ruta de prueba
app.get('', (req, res) => {
    res.json({
        message: '🚀 API de Tareas - Node.js + MySQL',
        version: '1.0.0',
        status: 'active'
    })
})

// Ruta de health check (para verificar que el servidor esté vivo)
app.get('/health',(req,res)=>{
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// ============================================
// MANEJO DE RUTAS NO ENCONTRADAS
// ============================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    path: req.path
  });
});

module.exports = app;