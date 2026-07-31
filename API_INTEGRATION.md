# API Integration Documentation

This document describes how the GearUp frontend consumes the backend REST API.

---

# Backend API

Base URL

```
https://b7a4-gearup-backend-assignment.onrender.com/api
```

---

# Authentication

## Login

Frontend

```
/login
```

Backend

```
POST /auth/login
```

Purpose

- Authenticate user
- Store HTTP Only Access Token
- Store HTTP Only Refresh Token

Used In

- Login Form

---

## Register

Frontend

```
/register
```

Backend

```
POST /users/register
```

Purpose

- Create new Customer
- Create new Provider
- Create new Admin (Seed)

Used In

- Registration Form

---

## Current User

Backend

```
GET /auth/me
```

Purpose

- Retrieve logged in user
- Restore authentication after refresh
- Determine user role

Used In

- AuthProvider
- Navbar
- Dashboard
- Protected Routes
- Profile

---

## Logout

Backend

```
POST /auth/logout
```

Purpose

- Clear authentication cookies

Used In

- Navbar Logout
- Dashboard Logout

---

# Categories

## Get Categories

Backend

```
GET /categories
```

Purpose

- Load category list

Used In

- Gear Page Filters
- Add Gear Form
- Edit Gear Form

---

## Create Category

Backend

```
POST /categories
```

Used In

- Admin Dashboard

---

## Update Category

Backend

```
PATCH /categories/:id
```

Used In

- Admin Dashboard

---

## Delete Category

Backend

```
DELETE /categories/:id
```

Used In

- Admin Dashboard

---

# Gear

## Get All Gear

Backend

```
GET /gear
```

Used In

- Home Page
- Gear Listing

---

## Featured Gear

Backend

```
GET /gear/featured
```

Used In

- Homepage Featured Section

---

## Gear Details

Backend

```
GET /gear/:id
```

Used In

- Gear Details Page

---

## Provider Gear

Backend

```
GET /gear/my-gear
```

Used In

- Provider Dashboard

---

## Create Gear

Backend

```
POST /gear
```

Used In

- Add Gear

---

## Update Gear

Backend

```
PATCH /gear/:id
```

Used In

- Edit Gear

---

## Delete Gear

Backend

```
DELETE /gear/:id
```

Used In

- My Gear Table

---

# Rentals

## Create Rental

Backend

```
POST /rentals
```

Used In

- Rent Now Form

---

## Customer Rentals

Backend

```
GET /rentals/my-rentals
```

Used In

- Customer Dashboard

---

## Provider Orders

Backend

```
GET /rentals/provider
```

Used In

- Provider Orders

---

## Update Rental Status

Backend

```
PATCH /rentals/:id/status
```

Used In

- Provider Dashboard

---

## Admin Rentals

Backend

```
GET /admin/rentals
```

Used In

- Admin Dashboard

---

# Payments

## Create Stripe Checkout Session

Backend

```
POST /payments/create
```

Purpose

- Redirect customer to Stripe Checkout

Used In

- Payment Button

---

## Get Payment History

Backend

```
GET /payments
```

Used In

- Customer Payment History

---

## Get Single Payment

Backend

```
GET /payments/:id
```

Used In

- Payment Details

---

## Stripe Webhook

Backend

```
POST /payments/webhook
```

Purpose

- Update payment status
- Update rental status after successful payment

---

# Reviews

## Create Review

Backend

```
POST /reviews
```

Used In

- Customer Dashboard

---

## Get Reviews

Backend

```
GET /reviews
```

Used In

- Gear Details Page

---

# Dashboard

## Provider Dashboard

Backend

```
GET /dashboard/provider
```

Used In

- Provider Dashboard

---

## Admin Dashboard

Backend

```
GET /admin/dashboard
```

Used In

- Admin Statistics
- Recent Rentals

---

# Admin

## Get Users

Backend

```
GET /admin/users
```

Used In

- User Management

---

## Update User Status

Backend

```
PATCH /admin/users/:id/status
```

Used In

- Suspend User
- Activate User

---

## Dashboard Statistics

Backend

```
GET /admin/dashboard
```

Used In

- Admin Dashboard Cards

---

# Error Handling

The frontend provides consistent error handling using:

- Sonner Toast Notifications
- React Query Error States
- Form Validation using React Hook Form + Zod
- Loading Skeleton Components
- Empty State Components

---

# Technologies Used

- Next.js (App Router)
- TypeScript
- TanStack Query
- React Hook Form
- Zod
- Tailwind CSS
- Stripe Checkout
- HTTP Only Cookie Authentication
- REST API