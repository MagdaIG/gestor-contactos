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

// ===== SISTEMA DE TOAST NOTIFICATIONS =====

// Crear contenedor de toasts si no existe
function createToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

// Función para mostrar toast
function showToast(message, type = 'info', duration = 4000) {
    const container = createToastContainer();

    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Iconos para cada tipo
    const icons = {
        success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>`,
        error: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                </svg>`,
        warning: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" stroke-width="2"/>
                    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" stroke-width="2"/>
                    <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" stroke-width="2"/>
                  </svg>`,
        info: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                 <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                 <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" stroke-width="2"/>
               </svg>`
    };

    const titles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };

    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-title">
                ${icons[type]}
                ${titles[type]}
            </div>
            <button class="toast-close" onclick="removeToast(this)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        </div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Mostrar toast con animación
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Auto-remover después del tiempo especificado
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast.querySelector('.toast-close'));
        }, duration);
    }

    return toast;
}

// Función para remover toast
function removeToast(closeBtn) {
    const toast = closeBtn.closest('.toast');
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ===== SISTEMA DE LOADING STATES =====

// Función para mostrar loading overlay
function showLoading(message = 'Cargando...') {
    let overlay = document.querySelector('.loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p style="margin-top: 1rem; color: var(--text-color);">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    overlay.classList.add('active');
    return overlay;
}

// Función para ocultar loading overlay
function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// ===== BÚSQUEDA EN TIEMPO REAL =====

// Función para búsqueda en tiempo real
function initRealTimeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let searchTimeout;
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchInput.parentNode.appendChild(searchResults);

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }

        searchTimeout = setTimeout(() => {
            performRealTimeSearch(query, searchResults);
        }, 300);
    });

    // Ocultar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

// Función para realizar búsqueda en tiempo real
function performRealTimeSearch(query, resultsContainer) {
    // Simular búsqueda (en una app real, esto sería una llamada AJAX)
    const contacts = Array.from(document.querySelectorAll('.contact-card'));
    const matches = contacts.filter(card => {
        const name = card.querySelector('.contact-value')?.textContent.toLowerCase() || '';
        const phone = card.querySelector('.detail-value')?.textContent.toLowerCase() || '';
        const email = card.querySelectorAll('.detail-value')[1]?.textContent.toLowerCase() || '';

        return name.includes(query.toLowerCase()) ||
               phone.includes(query.toLowerCase()) ||
               email.includes(query.toLowerCase());
    });

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
    } else {
        resultsContainer.innerHTML = matches.slice(0, 5).map(card => {
            const name = card.querySelector('.contact-value')?.textContent || '';
            const phone = card.querySelector('.detail-value')?.textContent || '';
            return `
                <div class="search-result-item" onclick="scrollToContact('${name}')">
                    <strong>${name}</strong><br>
                    <small>${phone}</small>
                </div>
            `;
        }).join('');
    }

    resultsContainer.classList.add('show');
}

// Función para hacer scroll a un contacto específico
function scrollToContact(contactName) {
    const contactCard = Array.from(document.querySelectorAll('.contact-card'))
        .find(card => card.querySelector('.contact-value')?.textContent === contactName);

    if (contactCard) {
        contactCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        contactCard.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            contactCard.style.animation = '';
        }, 600);
    }

    // Ocultar resultados de búsqueda
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        searchResults.classList.remove('show');
    }
}

// ===== MEJORAS DE MOBILE =====

// Función para mejorar experiencia móvil
function initMobileImprovements() {
    // Touch gestures para eliminar contactos
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        card.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        card.addEventListener('touchmove', function(e) {
            if (!isDragging) return;

            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;

            if (diffX > 50) {
                this.style.transform = `translateX(-${Math.min(diffX, 100)}px)`;
            }
        });

        card.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;

            const diffX = startX - currentX;

            if (diffX > 100) {
                // Mostrar opción de eliminar
                showToast('Desliza hacia la derecha para cancelar o mantén presionado para eliminar', 'info', 3000);
            } else {
                // Volver a posición original
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

// ===== INICIALIZACIÓN MEJORADA =====

// Actualizar función de inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades existentes
    initAnimations();
    initSearch();
    initAlerts();
    initContactCards();

    // Inicializar nuevas funcionalidades
    initRealTimeSearch();
    initMobileImprovements();

    // Mostrar toast de bienvenida
    setTimeout(() => {
        showToast('¡Bienvenido al Gestor de Contactos!', 'success', 3000);
    }, 1000);

    // Inicializar navegación por teclado
    initKeyboardNavigation();
});

// ===== NAVEGACIÓN POR TECLADO =====

// Función para inicializar navegación por teclado
function initKeyboardNavigation() {
    // Navegación con flechas en las tarjetas de contacto
    const contactCards = document.querySelectorAll('.contact-card');
    let currentIndex = -1;

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();

            if (e.key === 'ArrowDown') {
                currentIndex = Math.min(currentIndex + 1, contactCards.length - 1);
            } else {
                currentIndex = Math.max(currentIndex - 1, 0);
            }

            // Remover foco anterior
            contactCards.forEach(card => card.classList.remove('keyboard-focused'));

            // Agregar foco al elemento actual
            if (contactCards[currentIndex]) {
                contactCards[currentIndex].classList.add('keyboard-focused');
                contactCards[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Enter para activar el elemento enfocado
        if (e.key === 'Enter' && currentIndex >= 0) {
            const focusedCard = contactCards[currentIndex];
            if (focusedCard) {
                const editBtn = focusedCard.querySelector('.edit-btn');
                if (editBtn) {
                    editBtn.click();
                }
            }
        }

        // Escape para limpiar foco
        if (e.key === 'Escape') {
            contactCards.forEach(card => card.classList.remove('keyboard-focused'));
            currentIndex = -1;
        }
    });
}

// ===== MEJORAS DE ACCESIBILIDAD =====

// Función para agregar etiquetas ARIA
function initAccessibility() {
    // Agregar roles ARIA a elementos interactivos
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Contacto ${index + 1}`);

        // Agregar eventos de teclado
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const editBtn = this.querySelector('.edit-btn');
                if (editBtn) {
                    editBtn.click();
                }
            }
        });
    });

    // Mejorar etiquetas de formularios
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                input.setAttribute('aria-label', label.textContent.trim());
            }
        }
    });

    // Agregar anuncios para lectores de pantalla
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);

    // Función para anunciar cambios
    window.announceToScreenReader = function(message) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    };
}

// ===== MEJORAS DE PERFORMANCE =====

// Función para lazy loading de imágenes
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// ===== INICIALIZACIÓN COMPLETA =====

// Actualizar función de inicialización principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades existentes
    initAnimations();
    initSearch();
    initAlerts();
    initContactCards();

    // Inicializar nuevas funcionalidades
    initRealTimeSearch();
    initMobileImprovements();
    initKeyboardNavigation();
    initAccessibility();
    initLazyLoading();

    // Inicializar modo oscuro

    // Inicializar drag and drop
    initDragAndDrop();

    // Mostrar toast de bienvenida
    setTimeout(() => {
        showToast('¡Bienvenido al Gestor de Contactos!', 'success', 3000);
        announceToScreenReader('Página cargada correctamente. Usa las flechas del teclado para navegar entre contactos.');
    }, 1000);
});

// ===== MODO OSCURO =====

// Función para inicializar el modo oscuro
function initDarkMode() {
    // Detectar preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Obtener preferencia guardada o usar la del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

    // Aplicar tema inicial
    setTheme(prefersDark ? 'dark' : 'light');

    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Función para cambiar tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Guardar preferencia
    localStorage.setItem('theme', newTheme);

    // Mostrar notificación
    showToast(`Modo ${newTheme === 'dark' ? 'oscuro' : 'claro'} activado`, 'info', 2000);

    // Anunciar cambio para lectores de pantalla
    announceToScreenReader(`Tema cambiado a modo ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
}

// Función para establecer tema
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    // Actualizar iconos del botón
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    // Agregar clase de transición temporal
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

// ===== DRAG & DROP =====

let isReorderMode = false;
let draggedElement = null;
let draggedIndex = -1;

// Función para inicializar drag and drop
function initDragAndDrop() {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach((card, index) => {
        // Eventos de drag and drop
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('drop', handleDrop);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);

        // Prevenir drag por defecto en elementos interactivos
        const interactiveElements = card.querySelectorAll('button, a, input');
        interactiveElements.forEach(el => {
            el.addEventListener('dragstart', (e) => e.preventDefault());
        });
    });
}

// Función para activar/desactivar modo de reordenamiento
function toggleReorderMode() {
    isReorderMode = !isReorderMode;
    const container = document.querySelector('.contacts-container');
    const reorderBtn = document.querySelector('.reorder-toggle');

    if (isReorderMode) {
        container.classList.add('reorder-mode');
        reorderBtn.style.background = 'var(--primary-color)';
        reorderBtn.style.color = 'var(--white)';
        showToast('Modo de reordenamiento activado. Arrastra los contactos para cambiar su orden.', 'info', 4000);
        announceToScreenReader('Modo de reordenamiento activado. Puedes arrastrar los contactos para cambiar su orden.');
    } else {
        container.classList.remove('reorder-mode');
        reorderBtn.style.background = '';
        reorderBtn.style.color = '';
        showToast('Modo de reordenamiento desactivado.', 'info', 2000);
        announceToScreenReader('Modo de reordenamiento desactivado.');
    }
}

// Eventos de drag and drop
function handleDragStart(e) {
    if (!isReorderMode) {
        e.preventDefault();
        return;
    }

    draggedElement = this;
    draggedIndex = Array.from(this.parentNode.children).indexOf(this);

    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    // Crear placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'contact-card drag-placeholder';
    placeholder.style.height = this.offsetHeight + 'px';
    this.parentNode.insertBefore(placeholder, this.nextSibling);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');

    // Remover placeholder
    const placeholder = document.querySelector('.drag-placeholder');
    if (placeholder) {
        placeholder.remove();
    }

    // Remover clases de drag over
    document.querySelectorAll('.contact-card').forEach(card => {
        card.classList.remove('drag-over');
    });

    draggedElement = null;
    draggedIndex = -1;
}

function handleDragOver(e) {
    if (!isReorderMode) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    if (!isReorderMode) return;

    e.preventDefault();
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (!isReorderMode) return;

    // Solo remover si realmente salimos del elemento
    if (!this.contains(e.relatedTarget)) {
        this.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (!isReorderMode) return;

    e.preventDefault();
    this.classList.remove('drag-over');

    if (this !== draggedElement) {
        const dropIndex = Array.from(this.parentNode.children).indexOf(this);

        // Reordenar elementos
        if (draggedIndex < dropIndex) {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        } else {
            this.parentNode.insertBefore(draggedElement, this);
        }

        // Guardar nuevo orden
        saveNewOrder();

        // Mostrar feedback
        draggedElement.classList.add('drag-success');
        setTimeout(() => {
            draggedElement.classList.remove('drag-success');
        }, 600);

        showToast('Orden de contactos actualizado', 'success', 2000);
        announceToScreenReader('Orden de contactos actualizado');
    }
}

// Función para guardar el nuevo orden
function saveNewOrder() {
    const contactCards = document.querySelectorAll('.contact-card');
    const newOrder = Array.from(contactCards).map(card => {
        return parseInt(card.getAttribute('data-contact-id'));
    });

    // En una aplicación real, aquí enviarías el nuevo orden al servidor
    localStorage.setItem('contactOrder', JSON.stringify(newOrder));

    // Simular actualización del orden
    console.log('Nuevo orden de contactos:', newOrder);
}

// Función para restaurar orden guardado
function restoreOrder() {
    const savedOrder = localStorage.getItem('contactOrder');
    if (savedOrder) {
        const order = JSON.parse(savedOrder);
        const container = document.querySelector('.contacts-container');

        // Reordenar elementos según el orden guardado
        order.forEach(contactId => {
            const card = document.querySelector(`[data-contact-id="${contactId}"]`);
            if (card) {
                container.appendChild(card);
            }
        });
    }
}
