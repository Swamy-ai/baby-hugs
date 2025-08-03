import React, { useState } from "react";
import { Nav, Modal, Button } from "react-bootstrap";
import { Cart, BagFill } from 'react-bootstrap-icons';

const OrdersPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <>
      <Nav.Link onClick={openPopup} className="custom-link">
        <Cart size={20} className="me-1 mb-1" />
        How to Order
      </Nav.Link>

      <Modal show={showPopup} onHide={closePopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order via WhatsApp <b>(+91 7286031435)</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can order products by sending their product IDs to our WhatsApp number.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrdersPopup;
