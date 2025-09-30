const express = require('express');
const path = require('path');
const fs = require('fs');
const contactosRouter = require('./routes/contactos');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/', contactosRouter);

// Middleware para manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Página no encontrada',
        message: 'La página que buscas no existe',
        error: { status: 404 }
    });
});

// Middleware para manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error del servidor',
        message: 'Algo salió mal en el servidor',
        error: { status: 500 }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
