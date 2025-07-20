// 3. Routing (jika tidak menggunakan variabel lingkungan atau tipe aman)
export const PATHS = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/profile",
  SETTINGS: "/dashboard/settings",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
};

// 4. API Endpoints
export const API_ENDPOINTS = {
  USERS: `/api/users`,
  PRODUCTS: `/api/products`,
  ORDERS: `/api/orders`,
  LOGIN: `/api/auth/login`,
  REFRESH_TOKEN: `/api/auth/refresh-token`,
}; 