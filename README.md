# SnapCart

SnapCart is a grocery shopping application built with Next.js. It supports user registration, credential and Google login, role-based dashboards, grocery inventory display, admin grocery uploads, and product analytics backed by MongoDB.

## Features

- User authentication with NextAuth credentials and Google OAuth.
- Protected routes with role checks for `user`, `admin`, and `deliveryBoy`.
- Registration flow with password hashing using bcrypt.
- User onboarding for missing mobile number and role information.
- User dashboard with hero section, category slider, grocery cards, search UI, and cart button UI.
- Admin dashboard with product analytics, category sales breakdown, top products, and store health widgets.
- Admin grocery creation form with image upload to Cloudinary.
- MongoDB models for users and grocery products.
- Responsive UI built with Tailwind CSS, Lucide icons, and Motion animations.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth 5 beta
- MongoDB and Mongoose
- Cloudinary
- Axios
- bcryptjs
- lucide-react
- motion
- embla-carousel-react

## Project Structure

```text
src/
  app/
    api/
      admin/add-grocery/      Admin grocery creation API
      auth/[...nextauth]/      NextAuth route handler
      auth/register/           User registration API
      user/edit-role-mobile/   User role and mobile update API
    admin/add-grocery/         Admin grocery form page
    login/                     Login page
    register/                  Registration page
    unauthorized/              Unauthorized access page
    page.tsx                   Authenticated home dashboard router
  components/                  UI and dashboard components
  lib/
    cloudinary.ts              Cloudinary upload helper
    db.ts                      MongoDB connection helper
  models/
    grocery.model.tsx          Grocery schema
    user.model.ts              User schema
  auth.ts                      NextAuth configuration
  proxy.ts                     Route protection and role middleware
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env.local` in the project root:

```env
MONGODB_URL=your_mongodb_connection_string
AUTH_SECRET=your_nextauth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Main Routes

- `/` - Authenticated dashboard. Shows the user, admin, or delivery dashboard based on the signed-in user's role.
- `/login` - Login with email/password or Google.
- `/register` - New account registration flow.
- `/admin/add-grocery` - Admin-only grocery creation page.
- `/unauthorized` - Shown when a user tries to access a route for another role.

## API Routes

- `POST /api/auth/register` - Creates a user with hashed password.
- `POST /api/admin/add-grocery` - Allows admins to add a grocery product with image upload.
- `POST /api/user/edit-role-mobile` - Updates the signed-in user's role and mobile number.
- `/api/auth/[...nextauth]` - NextAuth authentication routes.

## Data Models

### User

Users include:

- `name`
- `email`
- `password`
- `mobile`
- `role`: `user`, `deliveryBoy`, or `admin`
- `image`

### Grocery

Groceries include:

- `name`
- `category`
- `price`
- `unit`: `kg`, `g`, `litre`, `ml`, `piece`, or `pack`
- `image`

Supported grocery categories include fruits and vegetables, dairy and eggs, grains, snacks, spices, beverages, personal care, household essentials, packaged food, and baby or pet care.

## Authentication and Roles

The app uses JWT sessions through NextAuth. Public routes include login, register, and auth API routes. Other pages require a valid session.

Role protection is handled in `src/proxy.ts`:

- `/admin/*` requires `admin`
- `/user/*` requires `user`
- `/delivery/*` requires `deliveryBoy`

After login, users with incomplete profile details are shown the role and mobile update screen before entering the main dashboard.

## Current Status

The core authentication, user dashboard, admin dashboard, grocery creation, MongoDB connection, and Cloudinary upload flow are implemented. Some navigation targets and product/order features are still placeholders, including cart behavior, order management, view grocery pages, and the delivery dashboard.
