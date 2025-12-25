import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Image, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../app/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error, successPay, loadingPay } = useSelector(
    (state) => state.order
  );
  const [{ isPending }, payalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch(resetOrder());
      dispatch(getOrderDetails(orderId));
    } else if (!window.paypal) {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(
          `http://localhost:5001/api/config/paypal`
        );
        payalDispatch({
          type: "resetOptions",
          value: { "client-id": clientId, currency: "INR" },
        });
        payalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      loadPaypalScript();
    }
  }, [dispatch, orderId, order?._id, successPay, payalDispatch]);

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }],
    });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      dispatch(payOrder({ orderId, paymentResult: details }));
    });
  }

  if (loading) return <h2>Loading...</h2>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!order || !order.orderItems) return null;

  console.log(order);

  return (
    <div>
      <h1>Order Id : {orderId}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {`${order?.shippingAddress?.address} ${order?.shippingAddress?.city} ${order?.shippingAddress?.postalCode} ${order?.shippingAddress?.country}`}
              </p>
              {/* order is paid or not status*/}
              {order.isPaid ? (
                <Alert key="success" variant="success">
                  Paid on {order.paidAt}
                </Alert>
              ) : (
                <Alert key="danger" variant="danger">
                  Not paid
                </Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems?.length === 0 ? (
                <p>Order is empty</p>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>{item.name}</Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Sipping</Col>
                      <Col>{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax Price</Col>
                      <Col>{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <h5>Loading payment...</h5>}
                  {isPending ? (
                    <h5>Loadin paypal</h5>
                  ) : (
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
