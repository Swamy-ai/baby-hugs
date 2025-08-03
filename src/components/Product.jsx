import React, { useState } from "react";
import { Card, Button, Carousel, Modal } from "react-bootstrap";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const Product = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card className="mb-4 glass-effect-product">
        <Carousel interval={5000} fade indicators={false} data-bs-theme="dark">
          {product.images.map((img, idx) => (
            <Carousel.Item key={idx} className="carousel-item-center">
              <img
                className="d-block mx-auto product-carousel-image"
                src={img}
                alt={`Slide ${idx}`}
                onClick={() => handleImageClick(idx)}
                style={{ cursor: "zoom-in" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body className="text-center">
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>&#8377;{product.price}</Card.Text>
          <Button variant="outline-dark">{product.productId}</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Body style={{ backgroundColor: "#000" }}>
          <Carousel
            activeIndex={activeIndex}
            onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
            interval={null}
            indicators={false}
            controls={product.images.length > 1}
          >
            {product.images.map((img, idx) => (
              <Carousel.Item key={idx}>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "60vh" }}
                >
                  <Zoom>
                    <img
                      src={img}
                      alt={`Zoom ${idx}`}
                      className="img-fluid"
                      style={{ maxHeight: "80vh", maxWidth: "100%" }}
                    />
                  </Zoom>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Product;
