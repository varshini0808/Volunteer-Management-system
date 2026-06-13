# Volunteer Management System Backend

## Overview

A RESTful API built using Node.js, Express.js, MongoDB, and JWT Authentication for managing volunteers.

## Features

- Volunteer Registration
- Volunteer Login
- JWT Authentication
- Profile Management
- Admin Authorization
- Approve Volunteers
- Delete Volunteers
- Dashboard Statistics

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/volunteerDB
JWT_SECRET=mysecretkey
```

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### Volunteer

- GET /api/volunteers/profile
- PUT /api/volunteers/profile

### Admin

- GET /api/volunteers
- PUT /api/volunteers/:id/approve
- DELETE /api/volunteers/:id
- GET /api/volunteers/dashboard