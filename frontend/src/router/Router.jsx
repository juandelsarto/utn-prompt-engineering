import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import { Cart } from "../pages/Cart.jsx";
import { Checkout } from "../pages/Checkout.jsx";
import { CheckoutSuccess } from "../pages/CheckoutSuccess.jsx";
import { Dashboard } from "../pages/Dashboard.jsx";
import { Login } from "../pages/Login.jsx";
import { Orders } from "../pages/Orders.jsx";
import { Products } from "../pages/Products.jsx";
import routes from "./routes.js";

function Router() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Products />} />
        <Route
          path={routes.dashboard}
          element={user ? <Dashboard /> : <Navigate to={routes.login} />}
        />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.checkout} element={<Checkout />} />
        <Route path={routes.checkoutSuccess} element={<CheckoutSuccess />} />
        <Route path={routes.login} element={<Login />} />
        <Route
          path={routes.orders}
          element={user ? <Orders /> : <Navigate to={routes.login} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
