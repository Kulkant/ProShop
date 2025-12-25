// frontend/src/screens/CartScreen.jsx (CORRECTED)

import React from "react"; // Removed unnecessary useState, useEffect
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../app/slices/cartSlice";
import {
  Alert,
  ListGroup,
  Image,
  Form,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Corrected typo havigate -> navigate

  const { cartItems } = useSelector((state) => state.cart);

  // FIX 3a: Correct payload structure for quantity update
  const updateQtyHandler = (item, qty) => {
    dispatch(addToCart({ ...item, qty: Number(qty) }));
  };

  // FIX 3b: Corrected removeFromCart handler logic
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate(`/shipping`);
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant="info">
            Your cart is empty. <Link to="/">Go back</Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                {/* FIX 1: Wrap ALL content columns inside this single Row */}
                <Row className="align-items-center">
                  {/* Image */}
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  {/* Name */}
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                  </Col>
                  {/* Price */}
                  <Col md={2}>₹{item.price.toLocaleString(`en-IN`)}</Col>
                  {/* Qty selector */}
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => updateQtyHandler(item, e.target.value)}
                    >
                      {Array.from(
                        // ✅ FIX 2: Explicitly cast item.stock to Number
                        { length: Number(item.stock) || 0 },
                        (_, x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  {/* Remove Button */}
                  <Col md={1}>
                    {" "}
                    {/* Changed md={2} to md={1} for spacing */}
                    <Button
                      type="button"
                      variant="light"
                      // FIX 3b: Use anonymous function to prevent immediate call
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {/* FIX 2: Correct Price Calculation */}
              <h2>
                Subtotal ({cartItems.reduce((sum, item) => sum + item.qty, 0)})
                items
              </h2>
              <h3>
                ₹
                {cartItems
                  // FIX 2: Calculate sum + (price * quantity)
                  .reduce(
                    (sum, item) => sum + Number(item.price) * Number(item.qty),
                    0
                  )
                  .toFixed(2)
                  .toLocaleString(`en-IN`)}
              </h3>
            </ListGroup.Item>

            <ListGroup.Item className="d-grid">
              <Button
                type="button"
                className="btn-block"
                variant="dark"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
