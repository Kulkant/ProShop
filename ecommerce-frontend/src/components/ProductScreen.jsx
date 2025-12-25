import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/slices/cartSlice";

const ProductScreen = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5001/api/products/${id}`
      );
      setProduct(data);
    } catch (error) {
      console.error(
        "Error fetching single product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // frontend/src/screens/ProductScreen.jsx (Corrected addToCartHandler)

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        stock: Number(product.stock),
        qty,
      })
    );
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <>
      <Link to={"/"} className="btn btn-light my-3">
        Go back
      </Link>

      {product.name && (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col>
            <ListGroup variant="flush">
              {/* Product Details (Name, Description) */}
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={product.numReviews}
                ></Rating>
              </ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            {/* Price and Status Card */}
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.stock > 0 ? `In stock` : `Out of stock`}</Col>
                  </Row>
                </ListGroup.Item>

                {product.stock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        {/* 5. Form.Control for the Dropdown */}
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {/* Loop to create options from 1 up to the stock count */}
                          {[...Array(product.stock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{product.price.toLocaleString(`en-IN`)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="d-grid">
                  <Button
                    variant="dark"
                    disabled={product.stock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
