import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../app/slices/orderSlice.js";
import { useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, success, error } = useSelector((state) => state.order);
  const { cartItems } = useSelector((state) => state.cart);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const items = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const shipping = items < 1000 ? 100 : 0;
    const tax = Number((0.18 * items).toFixed(2));
    const total = items + shipping + tax;

    setItemsPrice(items);
    setShippingPrice(shipping);
    setTaxPrice(tax);
    setTotalPrice(total);
  }, [cartItems]);

  useEffect(() => {
    if (success && order && order._id) {
      navigate(`/order/${order._id}`);
    }
    // Dependency array mein sirf order rakho, order._id nahi
  }, [navigate, success, order]);

  const placeOrderHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod || `PayPal`,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          {" "}
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Items List</Card.Title>
              <Card.Text as="div">
                <ListGroup>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Container>
                        <Row>
                          <Col className="fw-medium">{item.name}</Col>
                          <Col>{item.price}</Col>
                        </Row>
                      </Container>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text as="div">
                <Container fluid="md">
                  <Row>
                    <Col className="fw-medium">Items Price:</Col>
                    <Col>{itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col className="fw-medium">Shipping Price:</Col>
                    <Col>{shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col className="fw-medium">Tax Price:</Col>
                    <Col>{taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col className="fw-medium">Total Price:</Col>
                    <Col>{totalPrice}</Col>
                  </Row>
                </Container>
              </Card.Text>
              <Button
                variant="primary"
                className="mt-3"
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
