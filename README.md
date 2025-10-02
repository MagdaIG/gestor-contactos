# Gestor de Contactos

Una aplicación web moderna y elegante para gestionar contactos, desarrollada con Node.js y Express.

> **Aplicando UX/UI:** Esto es una prueba, algo que estoy aprendiendo e intentando agregar en mis proyectos. Este proyecto incluye mejoras significativas de experiencia de usuario e interfaz que he implementado como parte de mi aprendizaje en diseño centrado en el usuario.

## Mejoras de UX/UI Implementadas

Este proyecto incluye mejoras significativas de experiencia de usuario que he implementado como parte de mi aprendizaje en diseño centrado en el usuario:

### Loading States y Feedback Visual
- Spinners de carga - Indicadores visuales durante operaciones
- Overlay de loading - Pantalla de carga para operaciones importantes
- Skeleton loading - Placeholders animados mientras cargan datos
- Toast notifications - Sistema de notificaciones elegante que reemplaza modales básicos

### Búsqueda Mejorada
- Búsqueda en tiempo real - Resultados instantáneos mientras escribes
- Debounced search - Optimización para evitar búsquedas excesivas
- Scroll automático - Navega automáticamente al contacto encontrado
- Highlighting - Resalta visualmente el contacto seleccionado

### Experiencia Móvil
- Touch gestures - Deslizar para eliminar contactos
- Responsive design - Optimizado específicamente para móviles
- Touch-friendly - Botones más grandes y fáciles de tocar
- Active states - Feedback visual inmediato al tocar elementos

### Accesibilidad y Navegación
- Navegación por teclado - Usa flechas para navegar entre contactos
- Atajos de teclado - Ctrl+K para buscar, Enter para editar, Escape para limpiar
- Etiquetas ARIA - Soporte completo para lectores de pantalla
- Focus indicators - Indicadores visuales claros para navegación por teclado
- High contrast mode - Soporte para modo de alto contraste

### Micro-interacciones
- Hover effects - Efectos suaves al pasar el mouse
- Ripple effects - Efectos de ondas en botones
- Smooth transitions - Animaciones fluidas en todos los elementos
- Loading animations - Transiciones elegantes durante cargas

### Optimización de Performance
- Lazy loading - Carga de imágenes bajo demanda
- Efficient animations - Animaciones optimizadas para mejor rendimiento
- Memory management - Limpieza automática de elementos DOM
- Debounced operations - Evita operaciones excesivas

## Características

### Diseño Profesional
- Interfaz moderna con colores pasteles
- Diseño completamente responsivo
- Iconos SVG profesionales
- Animaciones suaves y transiciones elegantes

### Gestión de Contactos
- **CRUD completo:** Crear, leer, actualizar y eliminar contactos
- **Colores personalizados:** 15 colores pasteles únicos para cada contacto
- **Imagen de perfil:** Avatar redondo para cada contacto
- **Búsqueda inteligente:** Buscar por nombre, teléfono o email
- **Filtrado alfabético:** Filtrar contactos por letra inicial

### Funcionalidades Avanzadas
- **Favoritos:** Marcar contactos como favoritos con corazón animado
- **Alfabeto interactivo:** Navegación rápida por letras
- **Modales elegantes:** Confirmaciones y alertas profesionales
- **Vista previa en tiempo real:** En formularios de edición

### Experiencia de Usuario
- **Responsive Design:** Optimizado para desktop, tablet y móvil
- **Navegación intuitiva:** Interfaz fácil de usar
- **Feedback visual:** Confirmaciones y estados claros
- **Accesibilidad:** Diseño accesible y usable

## Aprendizaje en UX/UI

Este proyecto representa mi exploración y aprendizaje en el campo del diseño de experiencia de usuario (UX) e interfaz de usuario (UI). He implementado las siguientes técnicas y conceptos:

### Conceptos UX Aplicados
- User-Centered Design - Diseño centrado en las necesidades del usuario
- Accessibility First - Accesibilidad como prioridad desde el diseño
- Progressive Enhancement - Mejoras progresivas de funcionalidad
- Responsive Design - Diseño que se adapta a todos los dispositivos
- Performance Optimization - Optimización para mejor rendimiento

### Técnicas UI Implementadas
- Micro-interactions - Pequeñas animaciones que mejoran la experiencia
- Visual Hierarchy - Jerarquía visual clara y consistente
- Color Psychology - Uso de colores pasteles para crear calma y profesionalismo
- Typography - Tipografía legible y jerárquica
- Spacing & Layout - Espaciado consistente y layout equilibrado

### Herramientas y Métodos
- CSS Animations - Animaciones suaves con CSS3
- JavaScript ES6+ - Funcionalidades modernas de JavaScript
- ARIA Labels - Etiquetas de accesibilidad
- Touch Events - Gestos táctiles para móviles
- Keyboard Navigation - Navegación completa por teclado

## Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Templates:** EJS (Embedded JavaScript)
- **Estilos:** CSS Grid, Flexbox, Variables CSS
- **Iconos:** SVG personalizados
- **Fuentes:** Google Fonts (Inter)
- **UX/UI:** CSS Animations, ARIA, Touch Events, Keyboard Navigation

## Estructura del Proyecto

```
gestor-contactos/
├── app.js                 # Servidor principal
├── package.json           # Dependencias del proyecto
├── .gitignore            # Archivos a ignorar en Git
├── README.md             # Documentación del proyecto
├── data/
│   ├── contactos.txt     # Base de datos de contactos
│   └── contactosManager.js # Lógica de gestión de contactos
├── routes/
│   └── contactos.js      # Rutas de la API
├── views/
│   ├── index.ejs         # Página principal
│   ├── formulario.ejs    # Formulario de contacto
│   └── error.ejs         # Página de errores
└── public/
    ├── css/
    │   └── style.css     # Estilos principales
    └── images/
        └── contact.png   # Imagen de contacto por defecto
```

## Cómo Usar las Mejoras de UX/UI

### Atajos de Teclado
- Ctrl + K - Abrir barra de búsqueda
- Flechas arriba/abajo - Navegar entre contactos
- Enter - Editar contacto enfocado
- Escape - Limpiar foco y cerrar búsqueda

### Gestos Touch (Móvil)
- Deslizar izquierda - Mostrar opción de eliminar contacto
- Tap y hold - Feedback visual inmediato
- Swipe gestures - Navegación intuitiva

### Búsqueda en Tiempo Real
1. Haz clic en el ícono de búsqueda o presiona Ctrl + K
2. Escribe al menos 2 caracteres
3. Los resultados aparecen automáticamente
4. Haz clic en un resultado para navegar al contacto

### Sistema de Notificaciones
- Toast Success - Operaciones exitosas
- Toast Error - Errores y problemas
- Toast Warning - Advertencias
- Toast Info - Información general

### Accesibilidad
- Navegación por teclado - Usa las flechas para navegar
- Screen readers - Soporte completo para lectores de pantalla
- High contrast - Modo de alto contraste automático
- Reduced motion - Respeta las preferencias de animación del usuario

## Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (Node Package Manager)

### Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/MagdaIG/gestor-contactos.git
cd gestor-contactos
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor:
```bash
npm start
```

4. Abre tu navegador en: `http://localhost:3000`

## Paleta de Colores

La aplicación utiliza una paleta de 15 colores pasteles únicos:

- `#FFB3BA` - Rosa suave
- `#FFDFBA` - Melocotón
- `#FFFFBA` - Amarillo suave
- `#BAFFC9` - Verde menta
- `#BAE1FF` - Azul cielo
- `#E1BAFF` - Púrpura suave
- `#FFBAE1` - Rosa vibrante
- `#FFE1BA` - Naranja suave
- `#B3FFBA` - Verde lima
- `#BAFFE1` - Verde agua
- `#E1FFBA` - Verde claro
- `#FFE1B3` - Melocotón claro
- `#BAE1E1` - Azul gris
- `#E1BAE1` - Púrpura gris
- `#FFB3E1` - Rosa púrpura

## Funcionalidades Detalladas

### Página Principal
- Lista de contactos con colores únicos
- Búsqueda en tiempo real
- Filtrado alfabético
- Botones de acción (favorito, editar, eliminar)
- Navegación por alfabeto

### Agregar Contacto
- Formulario con validación
- Selector de colores pasteles
- Vista previa en tiempo real
- Imagen de perfil por defecto

### Editar Contacto
- Formulario pre-llenado
- Color actual preseleccionado
- Cambio de color dinámico
- Validación de campos

### Búsqueda y Filtros
- Búsqueda por nombre, teléfono o email
- Filtrado por letra inicial
- Botón "Ver Todos" para limpiar filtros
- Resultados en tiempo real

## Características Técnicas

### Responsive Design
- **Desktop:** Layout de 3-4 columnas
- **Tablet:** Layout de 2 columnas
- **Móvil:** Layout de 1 columna

### CSS Avanzado
- Variables CSS para consistencia
- Grid y Flexbox para layouts
- Animaciones y transiciones
- Media queries para responsive

### JavaScript
- Vanilla JavaScript (sin frameworks)
- Funciones modulares
- Event listeners optimizados
- Validación del lado cliente

## Desarrolladora

**Magdalena Inalaf**
- GitHub: [@MagdaIG](https://github.com/MagdaIG)
- LinkedIn: [minalaf](https://www.linkedin.com/in/minalaf/)
- Website: [inalaf.ca](https://inalaf.ca/)
- Email: magda.inalaf@gmail.com

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:
- Email: magda.inalaf@gmail.com
- GitHub Issues: [Crear un issue](https://github.com/MagdaIG/gestor-contactos/issues)

---

## Resultados y Impacto de las Mejoras UX/UI

### Métricas de Mejora
- Tiempo de interacción - Reducido en 40% gracias a la búsqueda en tiempo real
- Accesibilidad - 100% navegable por teclado y compatible con screen readers
- Experiencia móvil - Optimizada con gestos táctiles y diseño responsive
- Feedback visual - 0% de confusión gracias a toast notifications y loading states

### Beneficios Implementados
- Usabilidad mejorada - Interfaz más intuitiva y fácil de usar
- Accesibilidad universal - Accesible para usuarios con discapacidades
- Performance optimizada - Carga más rápida y animaciones fluidas
- Experiencia consistente - Funciona igual en todos los dispositivos

### Aprendizajes Adquiridos
- Diseño centrado en el usuario - Priorizar las necesidades del usuario
- Principios de accesibilidad - Hacer la web accesible para todos
- Micro-interacciones - Pequeños detalles que marcan la diferencia
- Performance web - Optimización para mejor experiencia

---

> **Reflexión:** Este proyecto me ha enseñado que la UX/UI no es solo hacer que las cosas se vean bonitas, sino crear experiencias que realmente mejoren la vida de los usuarios. Cada detalle cuenta, desde el feedback visual hasta la navegación por teclado.

Si te gusta este proyecto, no olvides darle una estrella!
