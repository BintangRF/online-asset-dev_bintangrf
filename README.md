# Online Asset Devtest - Bintang Ramadhana Faturizky

## **Description**

This project is a simple full-stack dashboard with **User** and **Product** management.
The frontend uses **Vue 3 + TailwindCSS + DaisyUI + TanStack Query + Form Handling (VeeValidate + Yup)**, while the backend uses **Node.js + Express + Sequelize + PostgreSQL**.
The database is automatically seeded when the server starts for the first time.

---

## **Libraries Used**

### **Client**

- Vue 3 (core framework)
- Vue Router (page routing)
- TailwindCSS (utility-first CSS)
- DaisyUI (Tailwind-based UI components)
- Axios (HTTP client)
- TanStack Query (data fetching and state management)
- Vee-Validate + Yup (form validation)

**Dev Dependencies:**

- Vite (build tool and dev server)
- @vitejs/plugin-vue (Vue plugin for Vite)
- @tailwindcss/vite (Tailwind integration for Vite)

---

### **Server**

- Express (web framework)
- Sequelize (ORM for PostgreSQL)
- pg (PostgreSQL driver)
- dotenv (load environment variables)
- cors (allows client requests)
- nodemon (auto reload dev server)

---

## **Environment Variables**

### **Client (.env)**

```
VITE_API_BASE_URL=http://localhost:3000/api
```

### **Server (.env)**

```
DB_HOST=db
DB_USER=postgres
DB_PASS=postgres
DB_NAME=dashboard
PORT=3000
NODE_ENV=development
```

---

## **How to Run the Project**

1. **Clone the repository**

```bash
git clone <repo-url>
cd <project-root>
```

2. **Start all containers using Docker**

```bash
docker-compose up --build
```

- The PostgreSQL **database** starts automatically.
- The **server** seeds the database and runs the API on port 3000.
- The **client** Vite dev server runs on port 5173 with hot reload.

3. **Access the application**

- Dashboard: `http://localhost:5173`
- API server: `http://localhost:3000/api/users` or `/api/products`

---

## **Screenshot**

**Home Page:**
![Home Page](image.png)

**User Page:**

#### User Table

![User Page](image-1.png)

#### Create User

![Create User](image-2.png)

#### Edit User

![Edit User](image-3.png)

#### Delete User

![Delete User](image-4.png)

#### Search User

![Search User](image-5.png)

#### Sort User

![Sort User](image-6.png)

**Product Page:**

#### Product Table

![Product Table](image-7.png)

#### Create Product

![Create Product](image-8.png)

#### Edit Product

![Edit Product](image-9.png)

#### Delete Product

![Delete Product](image-10.png)

#### Search Product

![Search Product](image-11.png)

#### Sort Product

![Sort Product](image-12.png)
