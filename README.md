# 🛒 Gestor de Productos FakeStore - Node.js CLI

Este proyecto es una **aplicación de línea de comandos** en Node.js para gestionar productos utilizando la [FakeStore API](https://fakestoreapi.com/).
Permite consultar, crear y eliminar productos desde la terminal de manera sencilla.

## ⚙️ Requerimientos

- **Node.js 18** o superior
- **npm**

## 🚀 Uso

Ejecutar los siguientes comandos desde la terminal:

### 📦 Consultar todos los productos
```sh
npm run start GET products
```

### 🔍 Consultar un producto específico
```sh
npm run start GET products/<productId>
# Ejemplo:
npm run start GET products/15
```

### 🆕 Crear un producto nuevo
```sh
npm run start POST products "<titulo>" <precio> "<categoria>"
# Ejemplo:
npm run start POST products "Remera Node" 3500 "remeras"
```

### 🗑️ Eliminar un producto
```sh
npm run start DELETE products/<productId>
# Ejemplo:
npm run start DELETE products/7
```

## 📁 Estructura del Proyecto

```
pre_entrega/
│
├── README.md
├── index.js
└── package.json
```
