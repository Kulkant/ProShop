import { findNonSerializableValue } from "@reduxjs/toolkit";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductScreen from "./ProductScreen.jsx";
import Rating from "./Rating.jsx";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img
          src={product.image}
          alt={product.name}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        ></Card.Img>
      </Link>

      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div" className="product-title text-black">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>

        <Link to={`/products/${product._id}`}>
          <Card.Text as="h3" className="text-black">
            ₹{product.price.toLocaleString("en-IN")}
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
