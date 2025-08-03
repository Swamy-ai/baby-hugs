import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Title from './Title/Title';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import OrdersPopup from "./OrderPopUp"

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  return (
    <Navbar expand="lg" className="glass-effect-navbar">
      <Container>
        <Navbar.Brand><Title /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="custom-link">Home</Nav.Link>
            {user && (
              <Nav.Link href="/admin" className="custom-link">Admin</Nav.Link>
            )}
            {!user && (
              <Nav.Link href="/login" className="custom-link">Login</Nav.Link>
            )}
            {user && (
              <Nav.Link onClick={handleLogout} className="custom-link">Logout</Nav.Link>
            )}
            <OrdersPopup/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
