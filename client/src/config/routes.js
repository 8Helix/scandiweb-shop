import CartPage from "../pages/CartPage";
import CategoryPage from "../pages/CategoryPage";
import ProductPage from "../pages/ProductPage";

const ROUTES = {
  ALL: "/",
  CLOTHES: "/clothes",
  TECH: "/tech",
  PRODUCT: "/product/:id",
  CART: "/cart",
};

const ROUTES_CONFIG = [
  { path: ROUTES.ALL, page: CategoryPage },
  { path: ROUTES.CLOTHES, page: CategoryPage },
  { path: ROUTES.TECH, page: CategoryPage },
  { path: ROUTES.PRODUCT, page: ProductPage },
  { path: ROUTES.CART, page: CartPage },
];

export { ROUTES, ROUTES_CONFIG };
