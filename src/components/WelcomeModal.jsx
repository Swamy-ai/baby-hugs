import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
    if (!hasSeenPopup) {
      setShow(true);
      localStorage.setItem("hasSeenWelcomePopup", "true");
    }
  }, []);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Welcome to BabyHugs!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Welcome to our BabyHugs website. We care for your
          children as our own. <br />
          <em>From peaceful naps to playful giggles — comfort lives here.</em>
        </p>
        <p>
          हमारे बेबीहग्स वेबसाइट में आपका स्वागत है। हम
          आपके बच्चों की देखभाल अपने बच्चों की तरह करते हैं। <br />
          <em>शांत नींद से लेकर हँसी-खुशी तक — आराम यहाँ बसता है।</em>
        </p>
        <p>
          మా బేబీహగ్స్ వెబ్‌సైట్‌కు స్వాగతం. మీ పిల్లలను
          మేము మా పిల్లలవలే ప్రేమగా చూసుకుంటాము. <br />
          <em>ప్రశాంతమైన నిద్రల నుండి ఆనందకరమైన నవ్వుల వరకు — కంఫర్ట్ ఇక్కడే ఉంది.</em>
        </p>
        <p className="mt-3">
          📲 For orders, please contact us on <strong>WhatsApp</strong>.
        </p>
        <p className="text-end mb-0">🙏 Thank you & welcome!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setShow(false)}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WelcomePopup;
