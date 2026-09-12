# Food Store - Evaluación 1 (Programación 3)

Proyecto de e-commerce / catálogo de alimentos desarrollado para la **Evaluación 1** de **Programación 3** (Tecnicatura Universitaria en Programación - UTN).

## Descripción del Proyecto

- **Catálogo de Productos**: Visualización dinámica de productos con tarjetas e información detallada.
- **Búsqueda por Nombre**: Filtrado en tiempo real de productos según la coincidencia de texto.
- **Filtrado por Categoría**: Menú lateral/sección de filtrado para explorar productos por categoría y opción para restablecer la vista completa.
- **Carrito de Compras con Persistencia**: Selección de productos, gestión de cantidades e integración con `localStorage` bajo la clave `"cart"`.
- **Vista de Carrito**: Listado detallado de ítems seleccionados, cantidades, precios unitarios, subtotales y cálculo del total acumulado.

## Tecnologías y Herramientas

- **Lenguajes:** HTML5, CSS3, TypeScript, JavaScript (ES6+).
- **Entorno y Bundler:** Node.js, Vite.
- **Gestor de Paquetes:** `pnpm`
- **Persistencia:** `localStorage` (Claves: `"cart"`, `"users"`, `"userData"`).

## Descarga y Ejecución Local

1. Clonar o descargar el proyecto

```bash
git clone git clone https://github.com/FlorR566/FoodStore_prog3.git
cd FoodStore_prog3
```

Si descargaste el archivo ZIP, simplemente descomprimilo y abrí una terminal dentro de esa carpeta

2. Instalar dependencias

```bash
pnpm install
```

Si todavía no tenés pnpm habilitado, ejecutá previamente:

```bash
corepack enable pnpm
```

3. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

Abrí la aplicación en el navegador ingresando a:
http://localhost:5173

4. Compilar para producción (Build)

```bash
pnpm build
```

Este comando genera el paquete de producción en la carpeta `dist/` y verifica la compilación del proyecto.

5. Previsualizar la versión de producción:

```bash
pnpm preview
```

Este comando inicia un servidor local que sirve los archivos generados en la carpeta `dist/`, permitiendo previsualizar la aplicación en una configuración similar a la de producción.

## Estructura del Proyecto

El proyecto respeta la arquitectura modular establecida en las consignas:

```text
src/
├── main.ts              # Punto de entrada JS/TS global
├── style.css            # Estilos globales de la aplicación
├── vite-env.d.ts        # Tipado de entorno de Vite
├── data/                # Datos estáticos (PRODUCTS y getCategories)
│   └── data.ts
├── pages/
│   ├── admin/           # Vistas de administración
│   │   └── home/
│   │       ├── home.html
│   │       └── home.ts
│   ├── auth/            # Vistas de autenticación
│   │   ├── login/
│   │   └── registro/
│   └── client/          # Vistas del cliente desarrolladas para el parcial
│       ├── cart/
│       │   ├── cart.html
│       │   └── cart.ts
│       └── home/
│           ├── home.html
│           └── home.ts
├── types/               # Interfaces y definiciones TypeScript
│   ├── categoria.ts
│   ├── IUser.ts
│   ├── product.ts
│   └── Rol.ts
└── utils/               # Funciones auxiliares y lógica reutilizable
    ├── auth.ts
    ├── cart.ts          # Lógica del carrito (localStorage)
    ├── localStorage.ts
    └── navigate.ts
```
