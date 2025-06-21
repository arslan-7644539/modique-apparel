# Modique Apparel

Modique Apparel is a modern e-commerce web application for fashion and apparel shopping, built with [Next.js](https://nextjs.org). It features a clean UI, product collections, detailed product pages, and a smooth checkout experience.

## Features

- Browse collections of apparel products
- View detailed product information
- Add products to cart
- Filter and search products
- Responsive design for all devices
- Secure and user-friendly checkout

## Folder Structure

- `src/app/` - Main application pages and routes
  - `productCollection/[title]/` - Product collection pages by category
  - `productDetail/[id]/` - Individual product detail pages
  - `billingInfo/[id]/` - Billing and checkout pages
- `src/components/` - Reusable UI components (e.g., ProductCard, FilterSidebar, Footer)
- `public/` - Static assets and images

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Customization
- Edit `src/app/page.js` for the homepage.
- Add or update products in your data source (e.g., `db.json`).
- Update styles in `src/app/globals.css`.

## Technologies Used
- Next.js (App Router)
- React
- CSS Modules / Tailwind CSS (if used)

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.

## License

This project is for educational and demonstration purposes.
