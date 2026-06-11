# SnapCart

SnapCart is a grocery delivery web app built with Next.js App Router. It includes email/password and Google authentication, role-based routing, a customer grocery dashboard, admin product management, MongoDB data storage, and Cloudinary image uploads.

## Features

- User registration with hashed passwords using `bcryptjs`.
- Login with credentials or Google OAuth through NextAuth.
- JWT sessions with custom user fields for `id`, `email`, `name`, and `role`.
- Protected pages with role checks for `user`, `admin`, and `deliveryBoy`.
- Onboarding screen for users who need to add their mobile number or role.
- Customer dashboard with hero section, category slider, and grocery product cards loaded from MongoDB.
- Redux-powered user profile state and cart item count.
- Admin dashboard with quick actions and product analytics.
- Admin add-grocery form with category, unit, price, and image upload.
- Admin product listing page with inventory stats, search, and category filtering.
- `/api/me` endpoint for fetching the authenticated user's profile.
- Redux Toolkit store with `user` and `cart` slices.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth 5 beta
- MongoDB with Mongoose
- Cloudinary
- Redux Toolkit and React Redux
- Axios
- bcryptjs
- lucide-react
- Motion
- embla-carousel-react

## Project Structure

```text
src/
  app/
    admin/
      add-grocery/          Admin page for creating grocery products
      products/             Admin product inventory page
    api/
      admin/add-grocery/    Admin-only grocery creation API
      auth/[...nextauth]/    NextAuth route handler
      auth/register/         User registration API
      me/                    Current authenticated user API
      user/edit-role-mobile/ User role and mobile update API
    login/                   Login page
    register/                Registration flow
    unauthorized/            Unauthorized access page
    layout.tsx               App providers and global layout
    page.tsx                 Role-based home dashboard
  components/                Dashboard, auth, product, and navigation UI
  Hooks/
    useGetMe.tsx             Client hook for `/api/me`
  lib/
    cloudinary.ts            Cloudinary upload helper
    db.ts                    MongoDB connection helper
  models/
    grocery.model.tsx        Grocery Mongoose schema
    user.model.ts            User Mongoose schema
  redux/
    cartSlice.ts             Cart state slice
    store.ts                 Redux store
    userSlice.ts             User state slice
    StoreProvider.tsx        Redux provider wrapper
  auth.ts                    NextAuth configuration
  proxy.ts                   Route protection middleware
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root:

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

## Routes

- `/` - Authenticated home page. Shows the customer, admin, or delivery dashboard based on the user's role.
- `/login` - Login page for credentials and Google OAuth.
- `/register` - Registration flow.
- `/admin/add-grocery` - Admin-only page for adding grocery products.
- `/admin/products` - Admin-only inventory page with search and category filtering.
- `/unauthorized` - Access denied page for users without the required role.

## API Routes

- `POST /api/auth/register` - Creates a new user after checking duplicate email and password length.
- `/api/auth/[...nextauth]` - NextAuth authentication endpoints.
- `GET /api/me` - Returns the authenticated user's profile without the password field.
- `POST /api/user/edit-role-mobile` - Updates the signed-in user's role and mobile number.
- `POST /api/admin/add-grocery` - Allows admins to create grocery products and upload product images to Cloudinary.

## Redux Toolkit Functionality

Redux is configured in `src/redux/store.ts` with two reducers:

```ts
reducer: {
  user: userSlice,
  cart: cartSlice,
}
```

The store also exports shared TypeScript helper types:

- `RootState` - used with `useSelector` to type global state reads.
- `AppDispatch` - used with `useDispatch` to type dispatched actions.

### Store Provider

`src/redux/StoreProvider.tsx` wraps the app with React Redux's `Provider`.

It is used in `src/app/layout.tsx`, so all client components inside the app can access Redux state:

```tsx
<Provider>
  <StoreProvider>
    <InitUser />
    {children}
  </StoreProvider>
</Provider>
```

### User Slice

`src/redux/userSlice.ts` stores the signed-in user's profile data.

State shape:

```ts
{
  userdata: IUser | null
}
```

The `setUserData` reducer updates `userdata` with the authenticated user's profile.

Current flow:

- `src/InitUser.tsx` runs the `useGetMe` hook when the app loads.
- `src/Hooks/useGetMe.tsx` calls `GET /api/me` with Axios.
- The API response is dispatched with `setUserData(result.data)`.
- Components such as `HeroSection` read `state.user.userdata` using `useSelector`.

### Cart Slice

`src/redux/cartSlice.ts` stores grocery products added to the cart.

State shape:

```ts
{
  cartData: IGrocery[]
}
```

Each cart item includes grocery details plus a `quantity` field:

```ts
{
  id?: ObjectId,
  name: string,
  category: string,
  price: string,
  unit: string,
  quantity: number,
  image: string
}
```

The `addToCart` reducer pushes a grocery item into `cartData`.

Current flow:

- `GroceryItemCard` reads `state.cart.cartData`.
- If the product is not already in the cart, it shows the `Add to Cart` button.
- Clicking `Add to Cart` dispatches `addToCart({ ...item, quantity: 1 })`.
- `Nav` reads `cartData.length` and displays it as the cart badge count.

Current cart limitations:

- Cart data is stored only in client-side Redux memory.
- Cart data is lost on page refresh.
- Quantity increase/decrease, remove-from-cart, checkout, and order persistence are not implemented yet.

## Data Models

### User

```text
name      string, required
email     string, required, unique
password  string, optional
mobile    string, optional
role      "user" | "deliveryBoy" | "admin", default "user"
image     string, optional
```

### Grocery

```text
name      string, required
category  supported grocery category, required
price     string, required
unit      "kg" | "g" | "litre" | "ml" | "piece" | "pack"
image     string, required
```

Supported categories:

- Fruits & Vegetables
- Dairy & Eggs
- Rice, Atta & Grains
- Snacks & Biscuits
- Spices & Masalas
- Beverages & Drinks
- Personal Care
- Household Essentials
- Instant & Packaged Food
- Baby & Pet Care

## Authentication and Authorization

The app uses NextAuth with JWT sessions. Credentials login checks the MongoDB user record and compares the password hash. Google login creates a user record when the email does not already exist.

Public routes:

- `/login`
- `/register`
- `/api/auth/*`

Protected role rules in `src/proxy.ts`:

- `/admin/*` requires `admin`
- `/user/*` requires `user`
- `/delivery/*` requires `deliveryBoy`

After login, users missing profile details are sent to the role and mobile update screen before their dashboard is shown.

## Current Status

Implemented:

- Authentication and registration.
- MongoDB connection and Mongoose models.
- Customer grocery dashboard.
- Admin dashboard, analytics, add-grocery flow, and product listing.
- Cloudinary upload support for grocery images.
- User profile API with Redux user-state hydration.
- Redux cart slice with add-to-cart behavior and navbar cart count.

Still incomplete or placeholder:

- Persistent cart behavior.
- Cart quantity updates and item removal.
- Checkout and order management.
- Delivery dashboard content.
- Admin order management.
- Product edit/delete actions.
