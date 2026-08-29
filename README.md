# ShopFav E-Commerce Store

ShopFav is a clean, responsive e-commerce web app built with React, React Router, and standard CSS. It lets users browse items from a store catalog, look up product descriptions, filter by categories, and manage a fully functional shopping cart that saves their choices even if they refresh the browser page.

### 🔗 Links
- **Live Demo:** [View Live Application]()

---

## Key Features

- **Multi-Page Routing**: Instant page transitions between Home, Shop, and Cart views using React Router.
- **Smart Catalog Filters**: Live search bar combined with instant sorting options (Featured, Price: Low to High, Price: High to Low, Name, and Top Ratings).
- **Persistent Shopping Cart**: A fully responsive cart built with global React context that saves items to the browser's local storage so you don't lose your data on page refresh.
- **Pop-up Alert System**: Centered notification toasts slide down smoothly from the top of the screen to confirm user actions and automatically disappear after three seconds.

## Tech Stack

- **React** (Component framework)
- **React Router DOM** (Multi-page routing layout engine)
- **HTML5 & CSS3** (Mobile-friendly media queries and pure CSS hover zoom logic)
- **Vite** (Local build tool and compiler)
- **GitHub** (Version control)


## Project Structure

src/
├── Components/
│   ├── cart/         # CartItem, OrderSummary
│   ├── layout/       # NavBar, Footer components
│   └── product/      # ProductGrid, ProductCard, SkeletonCard, NotificationToast
├── Context/          # CartContext, cartReducer, NotificationContext
├── Hooks/            # useCart, useNotification, useProductActions, useProducts and other hooks
├── Pages/            # Home, Shop, ProductDetail, Cart, NotFound
├── styles/           # Cart.css, Layout.css, ProductDetail.css, Home.css and other styles
├── App.jsx           # Application Router and route definitions
└── main.jsx          # Entry point and global Context wrappers


## Getting Started Locally

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your computer.

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahlet-1/Shopping-Cart-Web
   cd Shopping-Cart
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Boot up the local development server:**
   ```bash
   npm run dev
   ```

4. **Build the app for final production deployment:**
   ```bash
   npm run build
   ```

