# 🛒 Smartmart - Full-Stack Grocery Delivery Platform

Smartmart is a modern, high-performance, full-stack grocery delivery application designed to provide a buttery-smooth user experience. Built with a React frontend and an Express/Prisma backend, it offers seamless animations, a modern UI, real-time map tracking, and a comprehensive admin panel.

## ✨ Key Features

- **Modern & Responsive UI**: Beautifully designed interfaces using Tailwind CSS and Framer Motion, with responsive layouts for mobile, tablet, and desktop.
- **Interactive Authentications**: A highly customized "Animated Panda" login screen that covers its eyes when typing passwords.
- **Real-Time Order Tracking**: Interactive maps powered by MapLibre GL for tracking delivery partners in real-time.
- **Admin Dashboard**: A secure, role-protected admin panel for managing products, orders, and delivery partners.
- **Advanced Animations**: Smooth page transitions, sliding panels, and reverse parallax effects.

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: MapLibre GL JS & `react-map-gl`
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Backend (Server)
- **Framework**: Node.js & Express
- **Database ORM**: Prisma
- **Database**: PostgreSQL (Hosted on Neon.tech)
- **Authentication**: JWT (JSON Web Tokens)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Ronak-webdev/smartmart.git
cd smartmart
```

### 2. Setup the Backend
```bash
cd server
npm install

# The DATABASE_URL is already pre-configured to use a cloud-hosted Neon PostgreSQL database.
# You can run Prisma migrations or studio if needed:
npx prisma generate
npx prisma studio

# Start the backend server
npm run dev
```

### 3. Setup the Frontend
```bash
# Open a new terminal
cd client
npm install

# Start the Vite development server
npm run dev
```

## 🔐 Security Features

- **Route Protection**: Sensitive routes (like `/admin`) are protected by an `AdminRoute` wrapper, ensuring only users with `isAdmin: true` can access the dashboard.
- **Environment Variables**: All `.env` files are strictly added to `.gitignore` to prevent secret leaks to the repository.

## 📦 Deployment

This project is fully ready to be deployed:
- **Frontend**: Can be hosted seamlessly on Cloudflare Pages or Vercel.
- **Backend**: Can be hosted on Render.com or Railway.app.
- **Database**: Already hosted on Neon.tech serverless PostgreSQL.

---

*Developed by Ronak Webdev*
