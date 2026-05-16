# 🚀 Blogy - Full Stack Blog Platform

A complete blog platform built with **React + Node.js + MongoDB**.

---

## 📁 Project Structure

```
blogy/
├── backend/          # Node.js + Express API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── middleware/   # Auth middleware
│   ├── server.js     # Main server
│   ├── seedAdmin.js  # Create admin user
│   └── .env          # Environment variables
└── frontend/         # React + Vite + Tailwind
    └── src/
        ├── pages/        # All pages
        ├── components/   # Reusable components
        ├── context/      # Auth context
        └── utils/        # API utilities
```

---

## ⚡ Quick Setup (Step by Step)

### 1. Prerequisites
- Node.js v18+ installed
- MongoDB running locally OR MongoDB Atlas account
- (Optional) Cloudinary account for image uploads

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogy    # or your Atlas URI
JWT_SECRET=your_secret_key_here
ADMIN_EMAIL=admin@blogy.com
ADMIN_PASSWORD=admin123

# Cloudinary (get free account at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Create Admin User

```bash
cd backend
node seedAdmin.js
```

This creates: `admin@blogy.com` / `admin123`

### 5. Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

---

## 🌐 URLs

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Main website / blog |
| `http://localhost:5173/blog` | All blog posts |
| `http://localhost:5173/admin` | Admin dashboard |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5000/api/health` | API health check |

---

## 🔑 Admin Panel Features

- **Dashboard** — Stats (total blogs, views, drafts)
- **Blog List** — View, search, filter, delete all blogs
- **Blog Editor** — Create/edit blogs with HTML content, cover image
- **Categories** — Manage blog categories with colors
- **Image Upload** — Upload via Cloudinary or paste URL
- **Featured Posts** — Mark posts as featured (shown on homepage)
- **Status** — Publish or save as draft

---

## 📡 API Endpoints

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/auth/me` | Get current user |

### Blogs (Public)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/blogs` | Get all published blogs |
| GET | `/api/blogs/featured` | Get featured blogs |
| GET | `/api/blogs/:slug` | Get single blog + increment views |

### Blogs (Admin - requires token)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/blogs/admin/all` | Get all blogs including drafts |
| GET | `/api/blogs/stats` | Dashboard statistics |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

### Categories
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category (admin) |
| PUT | `/api/categories/:id` | Update category (admin) |
| DELETE | `/api/categories/:id` | Delete category (admin) |

### Upload
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/upload/image` | Upload image to Cloudinary |

---

## 🖼️ Image Upload Setup

1. Go to [cloudinary.com](https://cloudinary.com) and create a **free account**
2. Get your `Cloud Name`, `API Key`, `API Secret` from dashboard
3. Add them to `backend/.env`
4. Restart backend

Without Cloudinary, you can still paste direct image URLs in the blog editor.

---

## 🗄️ MongoDB Atlas (Cloud DB)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/blogy`
4. Replace `MONGO_URI` in `.env`

---

## 🚀 Production Build

```bash
# Build frontend
cd frontend
npm run build

# Set in backend/.env:
NODE_ENV=production

# Start backend (serves frontend too)
cd backend
npm start
```

Access everything at `http://localhost:5000`

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Images**: Cloudinary
- **Styling**: Tailwind CSS with custom components
