const fs = require('fs');
const path = require('path');

const CONTACTOS_FILE = path.join(__dirname, 'contactos.txt');

class ContactosManager {
    constructor() {
        this.ensureFileExists();
    }

    // Asegurar que el archivo existe
    ensureFileExists() {
        if (!fs.existsSync(CONTACTOS_FILE)) {
            fs.writeFileSync(CONTACTOS_FILE, '', 'utf8');
        }
    }

    // Leer todos los contactos
    getAllContactos() {
        try {
            const data = fs.readFileSync(CONTACTOS_FILE, 'utf8');
            if (!data.trim()) {
                return [];
            }

            const contactos = data.trim().split('\n').map(line => {
                const parts = line.split('|');
                const [id, nombre, telefono, email, color, emoticon, cumpleanos, favorito, tipoEvento, fechaEvento] = parts;
                return {
                    id: parseInt(id),
                    nombre: nombre || '',
                    telefono: telefono || '',
                    email: email || '',
                    color: color || '#FFB3BA', // Color por defecto
                    emoticon: emoticon || '', // Emoticon por defecto (vacío)
                    cumpleanos: cumpleanos || '', // Fecha de cumpleaños
                    favorito: favorito === 'true', // Favorito (boolean)
                    tipoEvento: tipoEvento || '', // Tipo de evento
                    fechaEvento: fechaEvento || '' // Fecha del evento
                };
            });

            // Ordenar alfabéticamente por nombre
            return contactos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
        } catch (error) {
            console.error('Error al leer contactos:', error);
            return [];
        }
    }

    // Obtener el siguiente ID disponible
    getNextId() {
        const contactos = this.getAllContactos();
        if (contactos.length === 0) {
            return 1;
        }
        return Math.max(...contactos.map(c => c.id)) + 1;
    }

    // Buscar contacto por ID
    getContactoById(id) {
        const contactos = this.getAllContactos();
        return contactos.find(contacto => contacto.id === parseInt(id));
    }

    // Agregar nuevo contacto
    addContacto(nombre, telefono, email, color = '#FFB3BA', emoticon = '', cumpleanos = '', favorito = false, tipoEvento = '', fechaEvento = '') {
        try {
            const contactos = this.getAllContactos();
            const nuevoId = this.getNextId();
            const nuevoContacto = {
                id: nuevoId,
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                email: email.trim(),
                color: color,
                emoticon: emoticon,
                cumpleanos: cumpleanos,
                favorito: favorito,
                tipoEvento: tipoEvento,
                fechaEvento: fechaEvento
            };

            contactos.push(nuevoContacto);
            this.saveContactos(contactos);
            return nuevoContacto;
        } catch (error) {
            console.error('Error al agregar contacto:', error);
            throw error;
        }
    }

    // Actualizar contacto existente
    updateContacto(id, nombre, telefono, email, color = '#FFB3BA', emoticon = '', cumpleanos = '', favorito = false, tipoEvento = '', fechaEvento = '') {
        try {
            const contactos = this.getAllContactos();
            const index = contactos.findIndex(contacto => contacto.id === parseInt(id));

            if (index === -1) {
                throw new Error('Contacto no encontrado');
            }

            contactos[index] = {
                id: parseInt(id),
                nombre: nombre.trim(),
                telefono: telefono.trim(),
                email: email.trim(),
                color: color,
                emoticon: emoticon,
                cumpleanos: cumpleanos,
                favorito: favorito,
                tipoEvento: tipoEvento,
                fechaEvento: fechaEvento
            };

            this.saveContactos(contactos);
            return contactos[index];
        } catch (error) {
            console.error('Error al actualizar contacto:', error);
            throw error;
        }
    }

    // Eliminar contacto
    deleteContacto(id) {
        try {
            const contactos = this.getAllContactos();
            const index = contactos.findIndex(contacto => contacto.id === parseInt(id));

            if (index === -1) {
                throw new Error('Contacto no encontrado');
            }

            const contactoEliminado = contactos.splice(index, 1)[0];
            this.saveContactos(contactos);
            return contactoEliminado;
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
            throw error;
        }
    }

    // Guardar contactos en archivo
    saveContactos(contactos) {
        try {
            const data = contactos.map(contacto =>
                `${contacto.id}|${contacto.nombre}|${contacto.telefono}|${contacto.email}|${contacto.color || '#FFB3BA'}|${contacto.emoticon || ''}|${contacto.cumpleanos || ''}|${contacto.favorito || false}|${contacto.tipoEvento || ''}|${contacto.fechaEvento || ''}`
            ).join('\n');

            fs.writeFileSync(CONTACTOS_FILE, data, 'utf8');
        } catch (error) {
            console.error('Error al guardar contactos:', error);
            throw error;
        }
    }

    // Buscar contactos por término
    searchContactos(term) {
        const contactos = this.getAllContactos();
        const termino = term.toLowerCase();

        const resultados = contactos.filter(contacto =>
            contacto.nombre.toLowerCase().includes(termino) ||
            contacto.telefono.includes(termino) ||
            contacto.email.toLowerCase().includes(termino)
        );

        // Mantener orden alfabético en los resultados
        return resultados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
    }

    // Filtrar contactos por letra inicial
    getContactosByLetter(letter) {
        const contactos = this.getAllContactos();
        const letra = letter.toLowerCase();

        return contactos.filter(contacto =>
            contacto.nombre.toLowerCase().charAt(0) === letra
        );
    }

    // Obtener todas las letras disponibles
    getAvailableLetters() {
        const contactos = this.getAllContactos();
        const letras = new Set();

        contactos.forEach(contacto => {
            const primeraLetra = contacto.nombre.charAt(0).toUpperCase();
            letras.add(primeraLetra);
        });

        return Array.from(letras).sort();
    }

    // Obtener contactos favoritos
    getContactosFavoritos() {
        const contactos = this.getAllContactos();
        return contactos.filter(contacto => contacto.favorito);
    }

    // Obtener próximos cumpleaños (próximos 30 días)
    getProximosCumpleanos() {
        const contactos = this.getAllContactos();
        const hoy = new Date();
        const proximosCumpleanos = [];

        contactos.forEach(contacto => {
            if (contacto.cumpleanos) {
                const [dia, mes] = contacto.cumpleanos.split('/');
                const cumpleanos = new Date(hoy.getFullYear(), mes - 1, dia);

                // Si ya pasó este año, calcular para el próximo año
                if (cumpleanos < hoy) {
                    cumpleanos.setFullYear(hoy.getFullYear() + 1);
                }

                const diasRestantes = Math.ceil((cumpleanos - hoy) / (1000 * 60 * 60 * 24));

                if (diasRestantes <= 30) {
                    proximosCumpleanos.push({
                        ...contacto,
                        diasRestantes,
                        fechaCumpleanos: cumpleanos
                    });
                }
            }
        });

        return proximosCumpleanos.sort((a, b) => a.diasRestantes - b.diasRestantes);
    }

    // Obtener eventos de contactos
    getEventosContactos() {
        const contactos = this.getAllContactos();
        const contactosConEventos = [];

        contactos.forEach((contacto) => {
            if (contacto.tipoEvento && contacto.fechaEvento) {
                const fecha = new Date(contacto.fechaEvento);
                contactosConEventos.push({
                    ...contacto,
                    tipo: contacto.tipoEvento,
                    fecha: fecha
                });
            }
        });

        return contactosConEventos.sort((a, b) => a.fecha - b.fecha);
    }

    // Toggle favorito
    toggleFavorito(id) {
        try {
            const contactos = this.getAllContactos();
            const index = contactos.findIndex(contacto => contacto.id === parseInt(id));

            if (index === -1) {
                throw new Error('Contacto no encontrado');
            }

            contactos[index].favorito = !contactos[index].favorito;
            this.saveContactos(contactos);
            return contactos[index];
        } catch (error) {
            console.error('Error al cambiar favorito:', error);
            throw error;
        }
    }
}

module.exports = new ContactosManager();
