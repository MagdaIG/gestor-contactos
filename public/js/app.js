// Funcionalidades del frontend para la agenda de contactos moderna

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initAnimations();
    initSearch();
    initAlerts();
    initContactCards();
});

// Función para inicializar animaciones
function initAnimations() {
    // Animación de entrada para las tarjetas de contacto
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Animación de entrada para la tarjeta de estadísticas
    const statCard = document.querySelector('.stat-card');
    if (statCard) {
        statCard.style.opacity = '0';
        statCard.style.transform = 'translateY(20px)';

        setTimeout(() => {
            statCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            statCard.style.opacity = '1';
            statCard.style.transform = 'translateY(0)';
        }, 200);
    }
}

// Función para mejorar la búsqueda
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Agregar funcionalidad de búsqueda con Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const form = this.closest('form');
            if (form) {
                form.submit();
            }
        }
    });

    // Búsqueda en tiempo real (opcional)
    searchInput.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const cards = document.querySelectorAll('.contact-card');

        cards.forEach(card => {
            const name = card.querySelector('.contact-name').textContent.toLowerCase();
            const phone = card.querySelector('.contact-detail:nth-child(1) .detail-value').textContent;
            const email = card.querySelector('.contact-detail:nth-child(2) .detail-value').textContent.toLowerCase();

            if (name.includes(term) || phone.includes(term) || email.includes(term)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Función para manejar alertas
function initAlerts() {
    const alerts = document.querySelectorAll('.alert');

    alerts.forEach(alert => {
        // Auto-ocultar alertas después de 5 segundos
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
}

// Función para inicializar tarjetas de contacto
function initContactCards() {
    const cards = document.querySelectorAll('.contact-card');

    cards.forEach(card => {
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';

            // Animación del avatar
            const avatar = this.querySelector('.contact-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';

            // Reset del avatar
            const avatar = this.querySelector('.contact-avatar');
            if (avatar) {
                avatar.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// Función para alternar búsqueda
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    const searchInput = searchBar.querySelector('.search-input');

    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
        setTimeout(() => {
            searchInput.focus();
        }, 100);
    } else {
        searchBar.style.display = 'none';
    }
}

// Función para editar contacto
function editContact(id) {
    // Animación de transición
    const card = document.querySelector(`[data-contact-id="${id}"]`);
    if (card) {
        card.style.transform = 'scale(0.95)';
        card.style.opacity = '0.7';
    }

    setTimeout(() => {
        window.location.href = `/editar/${id}`;
    }, 200);
}

// Función para eliminar contacto
function deleteContact(id, name) {
    // Crear modal de confirmación personalizado
    const modal = createConfirmModal(name);
    document.body.appendChild(modal);

    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);

    // Manejar confirmación
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        // Animación de eliminación
        const card = document.querySelector(`[data-contact-id="${id}"]`);
        if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.3s ease';
        }

        setTimeout(() => {
            const form = document.getElementById('deleteForm');
            form.action = `/eliminar/${id}`;
            form.submit();
        }, 300);
    });

    // Manejar cancelación
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}

// Función para crear modal de confirmación
function createConfirmModal(name) {
    const modal = document.createElement('div');
    modal.className = 'confirm-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #ff9a9e, #fecfef);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1rem;
                font-size: 24px;
            ">⚠️</div>
            <h3 style="
                font-size: 1.3rem;
                font-weight: 600;
                color: #333;
                margin-bottom: 1rem;
            ">¿Eliminar contacto?</h3>
            <p style="
                color: #666;
                margin-bottom: 2rem;
                line-height: 1.5;
            ">¿Estás seguro de que quieres eliminar el contacto <strong>"${name}"</strong>? Esta acción no se puede deshacer.</p>
            <div style="
                display: flex;
                gap: 1rem;
                justify-content: center;
            ">
                <button class="cancel-btn" style="
                    padding: 0.75rem 1.5rem;
                    border: 2px solid #667eea;
                    background: white;
                    color: #667eea;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Cancelar</button>
                <button class="confirm-btn" style="
                    padding: 0.75rem 1.5rem;
                    border: none;
                    background: linear-gradient(135deg, #ff9a9e, #fecfef);
                    color: white;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Eliminar</button>
            </div>
        </div>
    `;

    return modal;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'linear-gradient(135deg, #f87171, #ef4444)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para copiar información de contacto
function copyToClipboard(text, type) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification(`${type} copiado al portapapeles`);
    }).catch(err => {
        console.error('Error al copiar:', err);
        showNotification('Error al copiar', 'error');
    });
}

// Función para formatear teléfono mientras se escribe
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '$1-$2');
    }

    input.value = value;
}

// Función para validar formulario
function validateForm(form) {
    const nombre = form.querySelector('#nombre').value.trim();
    const telefono = form.querySelector('#telefono').value.trim();
    const email = form.querySelector('#email').value.trim();

    if (!nombre || !telefono || !email) {
        showNotification('Todos los campos son obligatorios', 'error');
        return false;
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return false;
    }

    // Validar formato de teléfono básico
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(telefono)) {
        showNotification('Por favor, ingresa un teléfono válido', 'error');
        return false;
    }

    return true;
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .contact-avatar {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .contact-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .action-btn:hover,
    .action-icon:hover {
        transform: scale(1.05);
    }

    .cancel-btn:hover {
        background: #667eea;
        color: white;
    }

    .confirm-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(255, 154, 158, 0.4);
    }
`;
document.head.appendChild(style);

// Función para manejar errores de red
window.addEventListener('online', () => {
    showNotification('Conexión restaurada');
});

window.addEventListener('offline', () => {
    showNotification('Sin conexión a internet', 'error');
});

// Función para mejorar la accesibilidad
document.addEventListener('keydown', function(e) {
    // ESC para cerrar modales
    if (e.key === 'Escape') {
        const modal = document.querySelector('.confirm-modal');
        if (modal) {
            modal.querySelector('.cancel-btn').click();
        }
    }

    // Ctrl+K para buscar
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});
