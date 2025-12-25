import { Form, Button } from "react-bootstrap";

import { savePaymentMethod } from "../app/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymnetScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod: savedPaymentMethod } = cart;

  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const [paymentMethod, setPaymentMethod] = useState(
    savePaymentMethod || `Paypal`
  );

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };
  return (
    <Form onSubmit={submitHandler}>
      <div key="payment-options" className="mb-3">
        <h2>Choose payment method:</h2>
        <Form.Check // prettier-ignore
          type="radio"
          id="PayPal"
          name="paymentMethod"
          label="Paypal or Credit Card"
          value="PayPal"
          checked={paymentMethod === "Paypal"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Form.Check // prettier-ignore
          type="radio"
          id="Stripe"
          name="paymentMethod"
          label="Stripe"
          value="Stripe"
          checked={paymentMethod === "Stripe"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </div>
      <Button type="submit"> Continue to Place Order</Button>
    </Form>
  );
};

export default PaymnetScreen;
