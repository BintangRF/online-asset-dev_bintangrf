# Online Asset Devtest - Bintang Ramadhana Faturizky

## **Deskripsi**

Project ini adalah dashboard full-stack sederhana dengan manajemen **Users** dan **Products**. Frontend menggunakan **Vue 3 + TailwindCSS + DaisyUI + TanStack Query + Form Handling (VeeValidate + Yup)**, sedangkan backend menggunakan **Node.js + Express + Sequelize + PostgreSQL**. Database otomatis di-seed saat server pertama kali dijalankan.

---

## **Library yang digunakan**

### **Client**

- Vue 3 (core framework)
- Vue Router (routing halaman)
- TailwindCSS (utility-first CSS)
- DaisyUI (UI components berbasis Tailwind)
- Axios (HTTP client)
- TanStack Query (data fetching dan state management)
- Vee-Validate + Yup (form validation)

**Dev Dependencies:**

- Vite (build tool dan dev server)
- @vitejs/plugin-vue (plugin Vue untuk Vite)
- @tailwindcss/vite (integrasi Tailwind dengan Vite)

---

### **Server**

- Express (web framework)
- Sequelize (ORM untuk PostgreSQL)
- pg (PostgreSQL driver)
- dotenv (load environment variables)
- cors (mengizinkan request dari client)
- nodemon (dev server reload otomatis)

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

## **Cara Menjalankan Project**

1. **Clone repository**

```bash
git clone <repo-url>
cd <project-root>
```

2. **Jalankan semua container dengan Docker**

```bash
docker-compose up --build
```

- **Database** PostgreSQL otomatis berjalan.
- **Server** akan melakukan seed database otomatis dan menjalankan API di port 3000.
- **Client** Vite dev server berjalan di port 5173 dengan hot reload.

3. **Akses aplikasi**

- Dashboard: `http://localhost:5173`
- API server: `http://localhost:3000/api/users` atau `/api/products`

---

## **Screenshot**

![Dashboard Screenshot](assets/dashboard.png)
