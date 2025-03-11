# Proyecto Bimestre
Este proyecto se centra en el desarrollo de una API web implementada en NodeJS, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa. La aplicación se estructura en dos secciones principales: administrador y cliente, cada uno con funcionalidades específicas.

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/management-store.git
cd management-store
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/management-store
JWT_SECRET=tu_secreto_super_seguro
```

> **Nota:** Cambia los valores según tu configuración.

### 4. Ejecutar el servidor
```bash
npm start
```

### 5. Configuración por defecto

## 👤 Administrador por defecto
Al ejecutar el proyecto, se creará un administrador por defecto con las siguientes credenciales:

- **Nombre:** Emilio Lux
- **Usuario:** Kernel
- **Email:** emiliojo.lux@gmail.com
- **Contraseña:** EmLo06.20#
- **Teléfono:** 12345678
- **Rol:** ADMIN_ROLE

> **Nota:** Es recomendable cambiar la contraseña del administrador por defecto después de la instalación.

## 📂 Categoría por defecto
Al iniciar el proyecto, se creará una categoría por defecto:

- **Nombre:** General Category
- **Descripción:** Esta categoría agrupa productos que no tienen una clasificación específica.


## 📌 Rutas disponibles

### 1. Autenticación
- **Login:** `POST /storeManagement/v1/auth/login`
- **Registro de admin:** `POST /storeManagement/v1/auth/register/admin`
- **Registro de usuario:** `POST /storeManagement/v1/auth/register`

### 2. Categorías
- **Agregar categoría:** `POST /storeManagement/v1/category/addCategory`
- **Obtener categorías:** `GET /storeManagement/v1/category/`
- **Actualizar categoría:** `PATCH /storeManagement/v1/category/updateCategory/:id`
- **Eliminar categoría:** `DELETE /storeManagement/v1/category/deleteCategory/:id`

### 3. Usuarios
- **Actualizar usuario (ADMIN):** `PUT /storeManagement/v1/user/updateUser/admin/:id`
- **Actualizar perfil usuario:** `PUT /storeManagement/v1/user/updateProfile/:id`
- **Eliminar usuario (ADMIN):** `DELETE /storeManagement/v1/user/deleteUser/admin/:id`
- **Eliminar perfil de usuario:** `DELETE /storeManagement/v1/user/deleteProfile/:id`
- **Cambiar rol usuario:** `PATCH /storeManagement/v1/user/updateRol/admin/:id`

### 4. Productos
- **Agregar producto:** `POST /storeManagement/v1/product/addProduct`
- **Listar productos:** `GET /storeManagement/v1/product`
- **Actualizar producto:** `PUT /storeManagement/v1/product/updateProduct/:id`
- **Eliminar producto:** `DELETE /storeManagement/v1/product/deleteProduct/:id`
- **Productos más vendidos:** `GET /storeManagement/v1/product/most-sold`
- **Productos agotados:** `GET /storeManagement/v1/product/out-of-stock`

###  5. Carrito de Compras
-**Agregar producto al carrito:** `POST /storeManagement/v1/shoppingCart/add`

-**Listar productos del carrito:** `GET /storeManagement/v1/shoppingCart/`

-**Eliminar producto del carrito:** `DELETE /storeManagement/v1/shoppingCart/delete`



## 🔑 Uso de Tokens JWT
Algunas rutas requieren autenticación mediante un token JWT. Se debe incluir en los headers de la petición:
```json
{
  "Authorization": "Bearer <tu_token_aquí>"
}
```

## 🛠 Tecnologías usadas
- Node.js
- Express
- MongoDB
- JWT (JSON Web Token)

## 📝 Notas adicionales
- Asegúrate de tener MongoDB corriendo en `localhost` o configura `MONGO_URI`.
- Para pruebas en **Postman**, importa la colección JSON proporcionada.

📌 **¡Listo! Ahora puedes probar la API y personalizarla según tus necesidades.**

