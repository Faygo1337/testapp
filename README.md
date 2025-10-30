# ProductHub - Product Management SPA

A modern single-page application built with Next.js, TypeScript, Redux, and Tailwind CSS for managing products with features like favorites, filtering, and product creation.

## Features Implemented

### ✅ Task 1: Products List Page
- **Route**: `/products`
- Display all products in a responsive grid layout
- Like/favorite functionality with visual feedback
- Delete products with confirmation
- **Search**: Real-time search by product title and description
- **Filter**: Toggle between all products and favorites only
- **Pagination**: Navigate through products (12 items per page)
- Card design with consistent height, truncated description
- Click anywhere on the card (except buttons) to view details

### ✅ Task 2: Product Detail Page
- **Route**: `/products/:id`
- Full product information display
- Like/unlike functionality
- Delete product with confirmation
- Back button to products list
- Responsive layout with product image and details

### ✅ Task 3: Product Creation
- **Route**: `/create-product`
- Form with validation using React Hook Form + Zod
- **Required Fields**:
  - Product Title (min 3, max 100 chars)
  - Description (min 10, max 1000 chars)
  - Price (positive number)
  - Image URL (valid URL)
- Image preview
- Form submission saves to Redux store
- Redirects to products list on success
- Cancel button to go back

### ✅ Bonus Features
- **Pagination**: 12 items per page with navigation
- **Favorites Filter**: Show all or only liked products
- **Search**: Real-time search without submit button
- **Local Data**: User-created products stored in Redux store
- **API Integration**: Products loaded from JSONPlaceholder API
- **Responsive Design**: Mobile, tablet, and desktop support

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **State Management**: Redux Toolkit + React-Redux
- **Forms**: React Hook Form + Zod validation
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **API**: Axios + JSONPlaceholder

## Project Structure

\`\`\`
traineeTest/
├── app/
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Home page
│   ├── providers.tsx              # Redux provider wrapper
│   ├── globals.css                # Global styles
│   ├── products/
│   │   ├── page.tsx               # Products list page
│   │   └── [id]/
│   │       └── page.tsx           # Product detail page
│   └── create-product/
│       └── page.tsx               # Create product page
├── components/
│   ├── Navigation.tsx             # Top navigation bar
│   ├── ProductCard.tsx            # Product card component
│   ├── ProductsGrid.tsx           # Grid layout for products
│   ├── ProductDetail.tsx          # Detail view component
│   ├── ProductForm.tsx            # Create/edit form
│   ├── FilterBar.tsx              # Search and filter controls
│   ├── Pagination.tsx             # Pagination controls
│   └── EmptyState.tsx             # Empty state component
├── store/
│   ├── store.ts                   # Redux store configuration
│   ├── hooks.ts                   # Custom Redux hooks
│   └── slices/
│       ├── productsSlice.ts       # Products state management
│       └── filterSlice.ts         # Filter state management
├── lib/
│   ├── api.ts                     # API service (JSONPlaceholder)
│   └── utils.ts                   # Utility functions
├── types/
│   └── product.ts                 # TypeScript types and interfaces
└── public/                        # Static assets
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage Guide

### Viewing Products
1. Navigate to `/products` to see all products
2. Products are loaded from JSONPlaceholder API on first visit
3. Use the search bar to find products by title or description
4. Toggle "Show All Products" / "Showing Favorites" to filter

### Liking Products
- Click the heart icon on any card
- Filled heart indicates the product is favorited
- Works on both list and detail views

### Deleting Products
- Click the trash icon on any card
- Confirm the deletion in the dialog
- Product is immediately removed from the store

### Creating Products
1. Navigate to `/create-product`
2. Fill in all required fields:
   - Title (3-100 characters)
   - Description (10-1000 characters)
   - Price (positive number)
   - Image URL (must be valid)
3. Image preview updates as you type
4. Click "Create Product" to save
5. Automatically redirected to products list

### Pagination
- Use Previous/Next buttons to navigate pages
- Shows current page indicator
- 12 products per page

## State Management (Redux)

### Products Slice (`store/slices/productsSlice.ts`)
- **State**: Array of products with metadata
- **Actions**:
  - `setProducts`: Set initial products from API
  - `addProduct`: Add new user-created product
  - `deleteProduct`: Remove product by ID
  - `updateProduct`: Update product details
  - `toggleFavorite`: Toggle favorite status

### Filter Slice (`store/slices/filterSlice.ts`)
- **State**: Search term, favorites filter, pagination
- **Actions**:
  - `setSearchTerm`: Update search query
  - `setShowFavoritesOnly`: Toggle favorites filter
  - `setCurrentPage`: Update pagination page
  - `resetFilters`: Clear all filters

## Form Validation (React Hook Form + Zod)

All form inputs are validated using Zod schema:

\`\`\`typescript
const productSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.coerce.number().positive(),
  image: z.string().url(),
})
\`\`\`

Real-time validation with error messages displayed below each field.

## Styling

The project uses **Tailwind CSS v4** for styling with:
- Responsive grid layout (responsive from 1-4 columns)
- Consistent color scheme (blue primary, red accents)
- Smooth transitions and hover states
- Mobile-first approach

## API Integration

Products are fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com):
- Endpoint: `/posts`
- Maps posts to product objects with generated random images and prices
- Cached on first load in Redux store
- User-created products are stored locally in Redux

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Static Pages**: Home, /create-product, /products (prerendered)
- **Dynamic Pages**: /products/[id] (rendered on demand)
- **Lazy Loading**: Images with error fallback
- **Code Splitting**: Automatic by Next.js

## Future Enhancements

- Edit product functionality (route: `/products/[id]/edit`)
- Advanced filtering (price range, date sorting)
- Local storage persistence for favorites
- User authentication
- API calls for product operations (CRUD)
- Image upload instead of URL
- Product ratings and reviews

## Scripts

\`\`\`bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run TypeScript type checking
\`\`\`

## Development Notes

- All components are client components (`'use client'`) for interactive features
- Redux store is initialized on app startup
- API calls use async/await pattern
- Error handling with user-friendly messages
- TypeScript strict mode enabled for type safety

## License

MIT
