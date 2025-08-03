import React from "react";
import { Whatsapp } from "react-bootstrap-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "7286031435"; // Replace with actual number
  const message = "Hello, I need some help!";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="whatsapp-tooltip">To place orders please contact on WhatsApp</Tooltip>}
    >
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-button"
      >
        <Whatsapp size={28} />
      </a>
    </OverlayTrigger>
  );
};

export default WhatsAppButton;
