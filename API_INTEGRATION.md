# 🔌 API Integration Documentation

This document describes how the **GearUp Frontend** communicates with the backend REST API.

---

# 🌐 Backend API

**Base URL**

```text
https://b7a4-gearup-backend-assignment.onrender.com/api
```

---

# 🔐 Authentication

## Login

**Frontend**

```text
/login
```

**Backend**

```http
POST /auth/login
```

### Purpose

- Authenticate user
- Store HTTP-only Access Token
- Store HTTP-only Refresh Token
- Redirect user based on authentication state

### Used In

- Login Form

---

## Register

**Frontend**

```text
/register
```

**Backend**

```http
POST /users/register
```

### Purpose

- Register a new user (Customer or Provider)

### Used In

- Registration Form

---

## Get Current User

**Backend**

```http
GET /auth/me
```

### Purpose

- Restore user session
- Retrieve authenticated user information
- Determine user role

### Used In

- AuthProvider
- Navbar
- Dashboard
- Protected Pages
- Profile

---

## Logout

**Backend**

```http
POST /auth/logout
```

### Purpose

- Clear authentication cookies
- End current session

### Used In

- Navbar
- Dashboard Sidebar

---

# 📂 Categories

## Get All Categories

```http
GET /categories
```

Used In

- Gear Filters
- Add Gear Form
- Edit Gear Form

---

## Create Category

```http
POST /categories
```

Used In

- Admin Dashboard

---

## Update Category

```http
PATCH /categories/:id
```

Used In

- Admin Dashboard

---

## Delete Category

```http
DELETE /categories/:id
```

Used In

- Admin Dashboard

---

# 🏕️ Gear

## Get All Gear

```http
GET /gear
```

Used In

- Gear Listing
- Browse Gear

---

## Get Featured Gear

```http
GET /gear/featured
```

Used In

- Home Page

---

## Get Single Gear

```http
GET /gear/:id
```

Used In

- Gear Details Page

---

## Get Provider Gear

```http
GET /gear/my-gear
```

Used In

- Provider Dashboard

---

## Create Gear

```http
POST /gear
```

Used In

- Add Gear

---

## Update Gear

```http
PATCH /gear/:id
```

Used In

- Edit Gear

---

## Delete Gear

```http
DELETE /gear/:id
```

Used In

- Provider Dashboard

---

# 📅 Rentals

## Create Rental

```http
POST /rentals
```

Used In

- Rental Form

---

## Get Customer Rentals

```http
GET /rentals/my-rentals
```

Used In

- Customer Dashboard

---

## Get Provider Rental Orders

```http
GET /rentals/provider
```

Used In

- Provider Dashboard

---

## Update Rental Status

```http
PATCH /rentals/:id/status
```

Used In

- Provider Dashboard

---

## Get All Rentals

```http
GET /admin/rentals
```

Used In

- Admin Dashboard

---

# 💳 Payments

## Create Checkout Session

```http
POST /payments/create
```

### Purpose

- Create Stripe Checkout Session

Used In

- Customer Payment

---

## Get Payment History

```http
GET /payments
```

Used In

- Customer Dashboard

---

## Get Payment Details

```http
GET /payments/:id
```

Used In

- Payment Details

---

## Stripe Webhook

```http
POST /payments/webhook
```

### Purpose

- Verify Stripe payment
- Update payment status
- Update rental status automatically

---

# ⭐ Reviews

## Create Review

```http
POST /reviews
```

### Purpose

- Submit a review for a completed rental

Used In

- Customer Dashboard

---

## Get Gear Reviews

```http
GET /reviews?gearId=:gearId
```

### Purpose

- Retrieve reviews for a specific gear

Used In

- Gear Details Page

---

# 📊 Dashboard

## Provider Dashboard

```http
GET /dashboard/provider
```

Used In

- Provider Dashboard

---

## Admin Dashboard

```http
GET /admin/dashboard
```

Used In

- Dashboard Statistics
- Recent Rentals
- Revenue Overview

---

# 👑 Admin

## Get All Users

```http
GET /admin/users
```

Used In

- User Management

---

## Update User Status

```http
PATCH /admin/users/:id/status
```

Used In

- Suspend User
- Activate User

---

# ⚠️ Error Handling

The frontend provides a consistent user experience using:

- Sonner Toast Notifications
- TanStack Query Error States
- React Hook Form Validation
- Zod Schema Validation
- Loading Skeleton Components
- Empty State Components
- Axios Error Handling

---

# 🛠️ Frontend Technologies

- Next.js 16 (App Router)
- React 19
- TypeScript
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner
- Axios

---

# ⚙️ Backend Technologies

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- HTTP-only Cookie Authentication
- Stripe Checkout