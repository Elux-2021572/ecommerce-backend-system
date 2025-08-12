# 🛒 E-Commerce Backend System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)
![Express](https://img.shields.io/badge/Express-v4.x-lightgrey.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v5+-blue.svg)

A comprehensive web API developed in NodeJS designed to manage sales, online products, and other business operations. The application is structured into two main sections: administrator and client, each with specific functionalities.

## ✨ Features

- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Admin and client role separation
- **Product Management**: Add, update, delete, and list products
- **Category Management**: Organize products in customizable categories
- **Shopping Cart**: Complete shopping cart functionality
- **Sales Reporting**: Track best-selling products and inventory status
- **User Management**: Update profiles, change roles, and manage accounts

## 🛠️ Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for secure authentication
- **Mongoose**: MongoDB object modeling for Node.js

## 🚀 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Elux-2021572/ecommerce-backend-system.git
cd ecommerce-backend-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following content:
```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/ecommerce-backend
JWT_SECRET=your_super_secure_secret
```

> **Note:** Change the values according to your configuration.

### 4. Run the server
```bash
npm start
```

## ⚙️ Default Configuration

### Default Administrator
When running the project for the first time, a default administrator will be created with the following credentials:

- **Name:** Emilio Lux
- **Username:** Kernel
- **Email:** emiliojo.lux@gmail.com
- **Password:** EmLo06.20#
- **Phone:** 12345678
- **Role:** ADMIN_ROLE

> **Note:** It is recommended to change the default administrator password after installation.

### Default Category
When starting the project, a default category will be created:

- **Name:** General Category
- **Description:** This category groups products that do not have a specific classification.

## 📌 Available Endpoints

### 1. Authentication
- **Login:** `POST /storeManagement/v1/auth/login`
- **Admin Registration:** `POST /storeManagement/v1/auth/register/admin`
- **User Registration:** `POST /storeManagement/v1/auth/register`

### 2. Categories
- **Add Category:** `POST /storeManagement/v1/category/addCategory`
- **Get Categories:** `GET /storeManagement/v1/category/`
- **Update Category:** `PATCH /storeManagement/v1/category/updateCategory/:id`
- **Delete Category:** `DELETE /storeManagement/v1/category/deleteCategory/:id`

### 3. Users
- **Update User (ADMIN):** `PUT /storeManagement/v1/user/updateUser/admin/:id`
- **Update User Profile:** `PUT /storeManagement/v1/user/updateProfile/:id`
- **Delete User (ADMIN):** `DELETE /storeManagement/v1/user/deleteUser/admin/:id`
- **Delete User Profile:** `DELETE /storeManagement/v1/user/deleteProfile/:id`
- **Change User Role:** `PATCH /storeManagement/v1/user/updateRol/admin/:id`

### 4. Products
- **Add Product:** `POST /storeManagement/v1/product/addProduct`
- **List Products:** `GET /storeManagement/v1/product`
- **Update Product:** `PUT /storeManagement/v1/product/updateProduct/:id`
- **Delete Product:** `DELETE /storeManagement/v1/product/deleteProduct/:id`
- **Best-Selling Products:** `GET /storeManagement/v1/product/most-sold`
- **Out-of-Stock Products:** `GET /storeManagement/v1/product/out-of-stock`

### 5. Shopping Cart
- **Add Product to Cart:** `POST /storeManagement/v1/shoppingCart/add`
- **List Cart Products:** `GET /storeManagement/v1/shoppingCart/`
- **Remove Product from Cart:** `DELETE /storeManagement/v1/shoppingCart/delete`

## 🔑 Using JWT Tokens
Some routes require authentication via a JWT token. It should be included in the request headers:
```json
{
  "Authorization": "Bearer <your_token_here>"
}
```

## 📖 Documentation

Complete API documentation is available via Postman Collection. Import the provided JSON collection for detailed information on each endpoint.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Elux-2021572** - [GitHub Profile](https://github.com/Elux-2021572)

---

Made with ❤️ by Elux-2021572
