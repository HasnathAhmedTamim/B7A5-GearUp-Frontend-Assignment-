# 🏕️ GearUp – Sports & Outdoor Gear Rental Platform

GearUp is a modern full-stack sports and outdoor equipment rental platform where customers can rent premium gear, providers can manage their inventory, and administrators can manage the entire platform through a powerful dashboard.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **TanStack Query**, **Express.js**, **Prisma ORM**, **PostgreSQL**, and **Stripe**.

---

# 🌐 Live Demo

### 🚀 Frontend

https://b7-a5-gear-up-frontend-assignment.vercel.app/

### ⚙️ Backend API

https://b7a4-gearup-backend-assignment.onrender.com/

### 💻 Frontend Repository

https://github.com/HasnathAhmedTamim/B7A5-GearUp-Frontend-Assignment-

### 🖥 Backend Repository

> https://github.com/HasnathAhmedTamim/B7A4-GearUp-Backend-Assignment


---

# ✨ Key Features

## 🌍 Public Features

- Browse all sports & outdoor gear
- Featured products section
- Gear details page
- Search gear by title
- Filter by category
- Responsive design
- Loading skeletons
- Error handling using Sonner Toast

---

## 👤 Customer Features

- User Registration & Login
- JWT Authentication
- Protected Dashboard
- Rent Sports Gear
- Stripe Checkout Payment
- Payment Success & Cancel Pages
- Rental History
- Payment History
- Profile Management
- Review & Rating System

---

## 🏪 Provider Features

- Provider Dashboard
- Add New Gear
- Update Gear
- Delete Gear
- Manage Inventory
- View Rental Orders
- Update Rental Status
- Manage Profile

Rental Workflow

```
PLACED
   ↓
CONFIRMED
   ↓
PAID
   ↓
PICKED_UP
   ↓
RETURNED
```

---

## ⭐ Review System

- Customers can review only returned rentals.
- One customer can submit only one review per gear.
- Reviews are displayed on the gear details page.
- Average ratings are calculated dynamically.

---

## 👑 Admin Features

- Dashboard Overview
- Platform Statistics
- User Management
- Activate / Suspend Users
- Category CRUD
- View All Gear
- View All Rentals

---

# 💳 Payment

- Stripe Checkout
- Stripe Webhook
- Automatic Payment Status Update
- Success Page
- Cancel Page

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Axios
- Shadcn UI
- Lucide React
- Sonner

---

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Cookie Authentication
- Stripe API

---

# 📂 Project Structure

```
src
│
├── app
├── components
├── services
├── providers
├── hooks
├── types
├── validation
├── utils
├── lib
└── middleware
```

---

# 🔐 Authentication & Authorization

- JWT Authentication
- HTTP Only Cookie Authentication
- Role-Based Access Control

Roles

- Customer
- Provider
- Admin

---

# 📱 Responsive Design

Optimized for

- 📱 Mobile
- 💻 Laptop
- 🖥 Desktop

---

# ⚙️ Installation

Clone the repositories

```bash
git clone https://github.com/HasnathAhmedTamim/B7A5-GearUp-Frontend-Assignment-
```

Install dependencies

```bash
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
```

Run development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

---

# 🔑 Backend Environment Variables

```env
PORT=

DATABASE_URL=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_EXPIRES_IN=

STRIPE_SECRET_KEY=

CLIENT_URL=
```

---

# 📌 Modules

- Authentication
- Users
- Categories
- Gear
- Rentals
- Payments
- Reviews

---

# 📸 Screenshots

- Home Page
- Gear Listing
- Gear Details
- Login
- Register
- Customer Dashboard
- Provider Dashboard
- Admin Dashboard
- Stripe Checkout
- Review System

---

# ✅ Assignment Requirements Covered

- Authentication
- Protected Routes
- Role-Based Dashboard
- CRUD Operations
- Stripe Payment Integration
- Responsive UI
- Form Validation
- TanStack Query
- Loading Skeleton
- Error Handling
- Admin Dashboard
- Provider Dashboard
- Customer Dashboard
- Review & Rating System

---

# 👨‍💻 Developer

**Hasnath Ahmed Tamim**

GitHub

https://github.com/HasnathAhmedTamim

LinkedIn

> Add your LinkedIn profile

---

# 📄 License

This project was developed as **Programming Hero – Assignment 5**.