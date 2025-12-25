import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveShippingAddress } from "../app/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));

    navigate("/payment");
  };
  return (
    <div>
      <h2>Shipping Address</h2>

      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label className="fw-medium">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label className="fw-medium">City</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCity(e.target.value)}
          >
            <option>Open this select menu</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="goa">Goa</option>
          </Form.Select>{" "}
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label className="fw-medium">PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter PostalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="county">
          <Form.Label className="fw-medium">County</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Open this select menu</option>
            <option value="india">India</option>
            <option value="usa">USA</option>
          </Form.Select>{" "}
        </Form.Group>

        <Button variant="primary" type="submit">
          Continue to payment
        </Button>
      </Form>
    </div>
  );
};

export default ShippingScreen;
