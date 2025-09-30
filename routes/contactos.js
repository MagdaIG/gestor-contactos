const express = require('express');
const router = express.Router();
const contactosManager = require('../data/contactosManager');

// Página principal - Listar todos los contactos
router.get('/', (req, res) => {
    try {
        const contactos = contactosManager.getAllContactos();
        const letrasDisponibles = contactosManager.getAvailableLetters();
        res.render('index', {
            title: 'Mi Agenda de Contactos',
            contactos: contactos,
            letrasDisponibles: letrasDisponibles,
            letraActiva: null,
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
            error: 'Error al cargar los contactos'
        });
    }
});

// Mostrar formulario para agregar nuevo contacto
router.get('/nuevo', (req, res) => {
    res.render('formulario', {
        title: 'Agregar Nuevo Contacto',
        contacto: null,
        action: '/nuevo',
        method: 'POST'
    });
});

    // Procesar nuevo contacto
    router.post('/nuevo', (req, res) => {
        try {
            const { nombre, telefono, email, color } = req.body;

            // Validación básica
            if (!nombre || !telefono || !email) {
                return res.render('formulario', {
                    title: 'Agregar Nuevo Contacto',
                    contacto: { nombre, telefono, email, color },
                    action: '/nuevo',
                    method: 'POST',
                    error: 'Todos los campos son obligatorios'
                });
            }

            const nuevoContacto = contactosManager.addContacto(nombre, telefono, email, color);
            res.redirect('/?message=Contacto agregado exitosamente');
        } catch (error) {
            console.error('Error al agregar contacto:', error);
            res.render('formulario', {
                title: 'Agregar Nuevo Contacto',
                contacto: req.body,
                action: '/nuevo',
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
            return res.redirect('/?error=Contacto no encontrado');
        }

        res.render('formulario', {
            title: 'Editar Contacto',
            contacto: contacto,
            action: `/editar/${contacto.id}`,
            method: 'POST'
        });
    } catch (error) {
        console.error('Error al cargar contacto para editar:', error);
        res.redirect('/?error=Error al cargar el contacto');
    }
});

    // Procesar edición de contacto
    router.post('/editar/:id', (req, res) => {
        try {
            const { nombre, telefono, email, color } = req.body;
            const id = req.params.id;

            // Validación básica
            if (!nombre || !telefono || !email) {
                return res.render('formulario', {
                    title: 'Editar Contacto',
                    contacto: { id, nombre, telefono, email, color },
                    action: `/editar/${id}`,
                    method: 'POST',
                    error: 'Todos los campos son obligatorios'
                });
            }

            contactosManager.updateContacto(id, nombre, telefono, email, color);
            res.redirect('/?message=Contacto actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
            res.render('formulario', {
                title: 'Editar Contacto',
                contacto: { ...req.body, id: req.params.id },
                action: `/editar/${req.params.id}`,
                method: 'POST',
                error: 'Error al actualizar el contacto'
            });
        }
    });

// Eliminar contacto
router.post('/eliminar/:id', (req, res) => {
    try {
        contactosManager.deleteContacto(req.params.id);
        res.redirect('/?message=Contacto eliminado exitosamente');
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        res.redirect('/?error=Error al eliminar el contacto');
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

module.exports = router;
