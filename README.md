# 🐾 PawMart Server - Pet Care API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

This is the **Backend Server** for the PawMart application. It is a RESTful API built with Node.js and Express that manages data for pet services, user orders, and dashboard analytics. It connects to a MongoDB database using Mongoose for structured data modeling.

🔗 **Client-Side Repository:** [https://github.com/utsho0002/PetPaw-clientSide](https://github.com/utsho0002/PetPaw-clientSide)  
🔗 **Live API URL:** [Insert Your Vercel/Render Link Here if deployed]

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Node.js** | Runtime environment for executing JavaScript server-side |
| **Express.js** | Web framework for building API routes and middleware |
| **MongoDB** | NoSQL Database for storing services and orders |
| **Mongoose** | ODM (Object Data Modeling) library for MongoDB |
| **Cors** | Middleware to enable Cross-Origin Resource Sharing |
| **Dotenv** | Module to load environment variables from a `.env` file |

---

## 🚀 Features & Functionality

* **Service Management:** Create, Read, Update, and Delete (CRUD) pet services.
* **Booking System:** Handle customer orders and bookings.
* **Filtering:** API supports query parameters to filter services by category or user email.
* **Dashboard Data:** specific endpoints optimized for fetching analytics data.
* **Database Connection:** Robust connection handling with Mongoose.

---

## 🔌 API Endpoints

### 📦 Services

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| **GET** | `/services` | Get all services | `?category=Grooming` `?limit=4` |
| **GET** | `/services/:id` | Get single service details | N/A |
| **GET** | `/my-services` | Get services added by specific user | `?email=user@example.com` |
| **POST** | `/services` | Add a new service | N/A |
| **PUT** | `/update/:id` | Update an existing service | N/A |
| **DELETE**| `/delete/:id` | Remove a service | N/A |

### 🛒 Orders

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| **POST** | `/orders` | Place a new order | N/A |
| **GET** | `/orders` | Get all orders (or filter by user) | `?email=user@example.com` |

---

## ⚙️ Installation & Setup

Follow these steps to run the server locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/utsho0002/](https://github.com/utsho0002/)[Your-Server-Repo-Name].git
cd [Your-Server-Repo-Name]

2. Install Dependencies
npm install

3. Environment Variables
Create a .env file in the root folder. You need to configure your MongoDB credentials here.

Code snippet: 
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
(Note: The database name is configured automatically in the connection string as pet_store).

4. Run the Server

node index.js

or if you have nodemon installed:
nodemon index.js

You should see the message:
Server running on port 3000 Mongoose Connected Successfully!

📂 Folder Structure
server/
├── node_modules/
├── .env                # Environment variables (Do not commit this)
├── index.js            # Main server file (Routes & DB Connection)
├── package.json        # Dependencies list
└── README.md           # Documentation
🤝 Contact
Utsho

GitHub: utsho0002

This project is the backend service for the PawMart Full Stack Application.
