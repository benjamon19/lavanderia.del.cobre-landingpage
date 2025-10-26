# Lavandería el Cobre - Sistema Web Completo

**Sitio web profesional y sistema de intranet** para lavandería industrial con landing page moderna, sistema de seguimiento de pedidos y panel administrativo completo.

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [Instalación y Uso](#-instalación-y-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Sistema de Intranet](#-sistema-de-intranet)
- [Página de Seguimiento](#-página-de-seguimiento)
- [Licencia](#-licencia)

---

## 🎯 Descripción del Proyecto

Sistema web completo desarrollado para **Lavandería el Cobre** que incluye:

### 🌐 Landing Page
Sitio web moderno y profesional con:
- Página de inicio con hero section atractivo
- Sección de servicios (lavado, planchado, secado, etc.)
- Galería de maquinaria industrial
- Información sobre recepción y horarios
- Formulario de contacto
- Footer completo con enlaces y redes sociales
- **Diseño 100% responsive** para todos los dispositivos

### 🔐 Sistema de Intranet
Panel administrativo con autenticación y dashboards diferenciados:
- **Dashboard Administrativo**: Estadísticas, ingresos, alertas de inventario
- **Dashboard de Trabajador**: Tareas diarias, pedidos pendientes, reportes de stock
- **Dashboard de Cliente**: Historial de pedidos y seguimiento
- Navegación dinámica según rol de usuario
- Módulos de gestión (Seguimiento, Comandas, Inventarios)

### 📦 Sistema de Seguimiento
Página dedicada para rastrear pedidos en tiempo real:
- Ingreso mediante código de seguimiento
- Timeline visual con 5 etapas (Recepción, Lavado, Secado, Planchado, Listo)
- Barra de progreso animada
- Estados con colores diferenciados
- Información detallada de cada etapa

---

## ✨ Características Principales

### Landing Page
- ✅ Hero section con call-to-action
- ✅ Navbar sticky con scroll smooth
- ✅ Animaciones y transiciones suaves
- ✅ Cards de servicios con hover effects
- ✅ Galería de maquinaria con imágenes
- ✅ Formulario de contacto funcional
- ✅ Diseño modular y componentizado
- ✅ SEO optimizado

### Sistema de Intranet
- ✅ Autenticación simulada por roles (Admin, Trabajador, Cliente)
- ✅ Persistencia de sesión con localStorage
- ✅ Sidebar flotante y responsive
- ✅ Dashboards con datos en tiempo real
- ✅ Sistema de reportes de stock con modal interactivo
- ✅ Notificaciones y alertas
- ✅ Navegación protegida por rutas

### Sistema de Seguimiento
- ✅ Ingreso por código único
- ✅ Estados visuales diferenciados por color
- ✅ Timeline interactivo con iconos
- ✅ Progreso calculado automáticamente
- ✅ Información de timestamps
- ✅ Botón de retorno a home

---

## 🛠️ Tecnologías Utilizadas

### Frontend Framework
- **React 19.1.1** - Biblioteca para construir interfaces de usuario
- **TypeScript 5.9.3** - Superset de JavaScript con tipado estático
- **Vite 7.1.7** - Build tool y dev server ultrarrápido

### Routing
- **React Router DOM 6.x** - Navegación y enrutamiento de la aplicación

### Estilos
- **TailwindCSS 4.1.14** - Framework CSS utility-first
- **@tailwindcss/vite** - Plugin de Vite para TailwindCSS

### Iconos
- **React Icons 5.5.0** - Biblioteca de iconos (FontAwesome, Game Icons)

### Desarrollo
- **ESLint 9.36.0** - Linter para JavaScript/TypeScript
- **TypeScript ESLint** - Reglas de ESLint para TypeScript

---

## 🚀 Instalación y Uso

### Prerrequisitos
- **Node.js** v18 o superior
- **npm** v9 o superior

### Pasos de Instalación

1. **Clonar el repositorio**:
```bash
git clone <url-del-repositorio>
cd lavanderia.del.cobre-landingpage
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**:
```bash
npm run dev
```

4. **Abrir en el navegador**:
   - El proyecto se abrirá automáticamente en `http://localhost:5173`
   - Si no se abre automáticamente, copia la URL que aparece en la terminal

### Comandos Disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Compila el proyecto para producción
npm run preview  # Previsualiza la versión de producción
npm run lint     # Ejecuta el linter para revisar el código
```

---

## 📁 Estructura del Proyecto

```
lavanderia.del.cobre-landingpage/
├── public/
│   └── placeholder.svg
├── src/
│   ├── components/              # Componentes de la landing page
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Machinery.tsx
│   │   ├── Reception.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Login.tsx
│   │   └── TrackingModal.tsx
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page principal
│   │   ├── tracking/            # Sistema de seguimiento
│   │   │   ├── TrackingPage.tsx
│   │   │   └── components/
│   │   │       ├── TrackingHeader.tsx
│   │   │       ├── TrackingStatus.tsx
│   │   │       └── TrackingTimeline.tsx
│   │   └── intranet/            # Sistema de intranet
│   │       ├── IntranetLayout.tsx
│   │       ├── components/
│   │       │   ├── IntranetNavbar.tsx
│   │       │   └── Sidebar.tsx
│   │       └── modules/
│   │           ├── AdminDashboard.tsx
│   │           ├── WorkerDashboard.tsx
│   │           ├── ClientDashboard.tsx
│   │           ├── TrackingModule.tsx
│   │           ├── OrdersModule.tsx
│   │           ├── ManagementModule.tsx
│   │           └── MyOrdersModule.tsx
│   ├── context/
│   │   └── AuthContext.tsx      # Contexto de autenticación
│   ├── App.tsx                  # Configuración de rutas
│   ├── main.tsx                 # Punto de entrada
│   └── index.css                # Estilos globales
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🔐 Sistema de Intranet

### Acceso al Sistema

El sistema de autenticación funciona mediante simulación basada en el **número** contenido en el email:

#### Credenciales de Prueba:

| Rol | Email de Ejemplo | Número Identificador |
|-----|-----------------|---------------------|
| **Administrador** | `admin1@elcobre.cl` | Contiene `1` |
| **Trabajador** | `trabajador2@elcobre.cl` | Contiene `2` |
| **Cliente** | `cliente3@gmail.com` | Contiene `3` |

### Funcionalidades por Rol

#### 👨‍💼 Administrador
- **Dashboard**: Estadísticas generales, ingresos, alertas
- **Módulos disponibles**:
  - Seguimiento de Órdenes de Trabajo
  - Sistema de Comandas
  - Gestión Interna (Inventarios y Reportes)
- **Acceso**: Completo a todas las funcionalidades

#### 👷 Trabajador
- **Dashboard**: Panel de tareas diarias
- **Funcionalidades**:
  - Ver pedidos pendientes y listos
  - Generar reportes de stock (modal con checklist)
  - Marcar pedidos como empacados
- **Módulos disponibles**:
  - Seguimiento de Órdenes
  - Sistema de Comandas
- **Reporte de Stock**: Modal interactivo para reportar:
  - Detergentes especializados
  - Productos químicos
  - Materiales de empaque

#### 👤 Cliente
- **Vista única**: "Mis Pedidos"
- **Funcionalidades**:
  - Ver historial completo de pedidos
  - Seguimiento de estado en tiempo real
  - Barras de progreso por pedido
  - Información de fechas estimadas

### Flujo de Autenticación

1. Usuario hace clic en **"Login"** en el navbar
2. Ingresa email con número `1`, `2` o `3`
3. El sistema detecta el rol basado en el número
4. Redirige a `/intranet/dashboard`
5. Muestra dashboard y navegación según el rol
6. Sesión se guarda en **localStorage** para persistencia

---

## 📦 Página de Seguimiento

### Acceso

1. Hacer clic en **"Seguimiento"** (botón naranja en navbar)
2. Ingresar código de seguimiento (cualquier texto)
3. El sistema redirige a `/tracking/{CODIGO}`

### Funcionalidades

- **5 Etapas de Proceso**:
  1. 📋 Recepcionado
  2. 👕 Lavado
  3. 💨 Secado
  4. 🔨 Planchado
  5. ✅ Listo

- **Estados Visuales**:
  - **Completado**: Verde con check
  - **En Proceso**: Naranja con animación de pulso
  - **Pendiente**: Gris

- **Información Mostrada**:
  - Código de seguimiento
  - Barra de progreso general
  - Timeline detallado con timestamps
  - Descripción de cada etapa
  - Botón para contactar

### Simulación de Estados

El estado actual se genera automáticamente mediante un hash del código ingresado, resultando en uno de los 5 estados posibles.

---

## 🎨 Diseño y UX

### Paleta de Colores
- **Principal**: Naranja `#ff6b35` / `#e85d2e`
- **Texto oscuro**: `#1a1a2e` / `#2c2c3e`
- **Texto claro**: `#6b6b7e`
- **Fondos**: Blanco / `#f8f9fa`

### Características de Diseño
- Componentes con bordes redondeados (`rounded-xl`, `rounded-2xl`)
- Sombras suaves para profundidad
- Degradados en botones principales
- Hover effects en todos los elementos interactivos
- Animaciones de fadeIn y slideUp
- Iconos de React Icons para consistencia

### Responsive Design
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Navbar**: Hamburger menu en móvil, menú completo en desktop
- **Sidebar**: Overlay en móvil, sticky flotante en desktop
- **Grids**: Se adaptan automáticamente según tamaño de pantalla

---

## 🔄 Rutas de la Aplicación

```
/                          → Landing Page (HomePage)
/tracking/:code            → Página de seguimiento de pedido
/intranet/dashboard        → Panel de intranet (protegido)
```

---

## 💡 Notas Importantes

### Prototipo vs Producción

Este es un **prototipo funcional** con las siguientes características:

- ✅ Autenticación simulada (no requiere backend)
- ✅ Datos estáticos de ejemplo
- ✅ Módulos de intranet como placeholders
- ✅ Persistencia local con localStorage
- ⚠️ No valida contraseñas (solo para demostración)
- ⚠️ No conecta con bases de datos reales

### Para Implementación en Producción

Se requeriría:
- Backend con API REST o GraphQL
- Base de datos (PostgreSQL, MongoDB, etc.)
- Autenticación real con JWT o similar
- Sistema de roles y permisos
- Integración con servicios de email/SMS
- CDN para assets estáticos

---

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo [LICENSE](LICENSE).

---

## 👥 Contacto

Para más información sobre el proyecto, contacta a través de los canales proporcionados en la landing page.

---

**Desarrollado con ❤️ usando React + TypeScript + Vite**