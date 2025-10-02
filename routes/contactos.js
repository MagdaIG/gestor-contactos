const express = require('express');
const router = express.Router();
const contactosManager = require('../data/contactosManager');

// Página principal - Listar todos los contactos
router.get('/', (req, res) => {
    try {
        let contactos;
        let titulo = 'Mi Agenda de Contactos';
        let vistaActiva = 'todos';

        // Verificar qué vista mostrar
        if (req.query.favorites === 'true') {
            contactos = contactosManager.getContactosFavoritos();
            titulo = 'Contactos Favoritos';
            vistaActiva = 'favoritos';
        } else if (req.query.view === 'birthdays') {
            contactos = contactosManager.getProximosCumpleanos();
            titulo = 'Próximos Cumpleaños';
            vistaActiva = 'cumpleanos';
        } else if (req.query.view === 'events') {
            contactos = contactosManager.getEventosContactos();
            titulo = 'Eventos de Contactos';
            vistaActiva = 'eventos';
        } else {
            contactos = contactosManager.getAllContactos();
        }

        const letrasDisponibles = contactosManager.getAvailableLetters();
        res.render('index', {
            title: titulo,
            contactos: contactos,
            letrasDisponibles: letrasDisponibles,
            letraActiva: null,
            vistaActiva: vistaActiva,
            message: req.query.message || null,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Error al cargar contactos:', error);
        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: [],
            letrasDisponibles: [],
            letraActiva: null,
            vistaActiva: 'todos',
            error: 'Error al cargar los contactos'
        });
    }
});

// Mostrar formulario para agregar nuevo contacto
router.get('/nuevo', (req, res) => {
        res.render('formulario', {
            title: 'Agregar Nuevo Contacto',
            contacto: null,
            action: '/contactos/nuevo',
            method: 'POST'
        });
});

// Procesar nuevo contacto
router.post('/nuevo', (req, res) => {
    try {
        const { nombre, telefono, email, color, emoticon, cumpleanos, tipoEvento, fechaEvento } = req.body;

        // Validación básica
        if (!nombre || !telefono || !email) {
            return res.render('formulario', {
                title: 'Agregar Nuevo Contacto',
                contacto: { nombre, telefono, email, color, emoticon, cumpleanos, tipoEvento, fechaEvento },
                action: '/contactos/nuevo',
                method: 'POST',
                error: 'Todos los campos son obligatorios'
            });
        }

        const nuevoContacto = contactosManager.addContacto(nombre, telefono, email, color, emoticon, cumpleanos, false, tipoEvento, fechaEvento);
        res.redirect('/contactos?message=Contacto agregado exitosamente');
    } catch (error) {
        console.error('Error al agregar contacto:', error);
        res.render('formulario', {
            title: 'Agregar Nuevo Contacto',
            contacto: req.body,
            action: '/contactos/nuevo',
            method: 'POST',
            error: 'Error al agregar el contacto'
        });
    }
});

// Mostrar formulario para editar contacto
router.get('/editar/:id', (req, res) => {
    try {
        const contacto = contactosManager.getContactoById(req.params.id);

        if (!contacto) {
            return res.redirect('/contactos?error=Contacto no encontrado');
        }

        res.render('formulario', {
            title: 'Editar Contacto',
            contacto: contacto,
            action: `/contactos/editar/${contacto.id}`,
            method: 'POST'
        });
    } catch (error) {
        console.error('Error al cargar contacto para editar:', error);
        res.redirect('/contactos?error=Error al cargar el contacto');
    }
});

// Procesar edición de contacto
router.post('/editar/:id', (req, res) => {
    try {
        const { nombre, telefono, email, color, emoticon, cumpleanos, tipoEvento, fechaEvento } = req.body;
        const id = req.params.id;

        // Validación básica
        if (!nombre || !telefono || !email) {
            return res.render('formulario', {
                title: 'Editar Contacto',
                contacto: { id, nombre, telefono, email, color, emoticon, cumpleanos, tipoEvento, fechaEvento },
                action: `/contactos/editar/${id}`,
                method: 'POST',
                error: 'Todos los campos son obligatorios'
            });
        }

        const contactoActual = contactosManager.getContactoById(id);
        contactosManager.updateContacto(id, nombre, telefono, email, color, emoticon, cumpleanos, contactoActual.favorito, tipoEvento, fechaEvento);
        res.redirect('/contactos?message=Contacto actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        res.render('formulario', {
            title: 'Editar Contacto',
            contacto: { ...req.body, id: req.params.id },
            action: `/contactos/editar/${req.params.id}`,
            method: 'POST',
            error: 'Error al actualizar el contacto'
        });
    }
});

// Eliminar contacto
router.post('/eliminar/:id', (req, res) => {
    try {
        contactosManager.deleteContacto(req.params.id);
        res.redirect('/contactos?message=Contacto eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        res.redirect('/contactos?error=Error al eliminar el contacto');
    }
});

// Buscar contactos
router.get('/buscar', (req, res) => {
    try {
        const termino = req.query.q || '';
        let contactos = [];

        if (termino.trim()) {
            contactos = contactosManager.searchContactos(termino);
        } else {
            contactos = contactosManager.getAllContactos();
        }

        const letrasDisponibles = contactosManager.getAvailableLetters();

        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: contactos,
            letrasDisponibles: letrasDisponibles,
            letraActiva: null,
            terminoBusqueda: termino,
            message: contactos.length === 0 && termino ? 'No se encontraron contactos' : null
        });
    } catch (error) {
        console.error('Error al buscar contactos:', error);
        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: [],
            letrasDisponibles: [],
            letraActiva: null,
            error: 'Error al buscar contactos'
        });
    }
});

// Filtrar contactos por letra
router.get('/letra/:letter', (req, res) => {
    try {
        const letra = req.params.letter.toUpperCase();
        const contactos = contactosManager.getContactosByLetter(letra);
        const letrasDisponibles = contactosManager.getAvailableLetters();

        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: contactos,
            letrasDisponibles: letrasDisponibles,
            letraActiva: letra,
            message: contactos.length === 0 ? `No hay contactos que comiencen con la letra "${letra}"` : null
        });
    } catch (error) {
        console.error('Error al filtrar contactos por letra:', error);
        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: [],
            letrasDisponibles: [],
            letraActiva: null,
            error: 'Error al filtrar contactos por letra'
        });
    }
});

// Toggle favorito
router.post('/toggle-favorito/:id', (req, res) => {
    try {
        const contacto = contactosManager.toggleFavorito(req.params.id);
        res.json({ success: true, favorito: contacto.favorito });
    } catch (error) {
        console.error('Error al cambiar favorito:', error);
        res.status(500).json({ success: false, error: 'Error al cambiar favorito' });
    }
});

module.exports = router;
