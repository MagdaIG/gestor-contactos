# Gestor de Contactos

Una aplicación web moderna y elegante para gestionar contactos, desarrollada con Node.js y Express.

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

## Tecnologías Utilizadas

- **Backend:** Node.js + Express.js
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Templates:** EJS (Embedded JavaScript)
- **Estilos:** CSS Grid, Flexbox, Variables CSS
- **Iconos:** SVG personalizados
- **Fuentes:** Google Fonts (Inter)

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

Si te gusta este proyecto, no olvides darle una estrella!
