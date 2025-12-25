import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Container,
  Alert,
  ListGroup,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, clearError } from "./app/slices/productSlice";
import Header from "./components/Header";
import Product from "./components/Product";
import ProductScreen from "./components/ProductScreen";
import CartScreen from "./components/CartScreen";
import LoginScreen from "./components/LoginScreen";
import PrivateRoute from "./components/PrivateRoute";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import ShippingScreen from "./components/ShippingScreen";
import PaymnetScreen from "./components/PaymentScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import OrderScreen from "./components/OrderScreen";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment" element={<PaymnetScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
