import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Row, Spinner, Col } from "react-bootstrap";
import { fetchProducts } from "../app/slices/productSlice";
import Product from "./Product";
const HomeScreen = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //display loading , error and data
  return (
    <>
      <h1 className="text-center mb-4">Latest products</h1>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">
          {error} <button onClick={() => dispatch(clearError())}>❌</button>
        </Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
