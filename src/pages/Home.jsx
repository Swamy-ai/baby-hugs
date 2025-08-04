import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/NavbarComponent';
import Filter from '../components/Filters';
import Product from '../components/Product';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import SVGBackground from '../components/SVGBackground/SVGBackground';
import Loader from '../components/Loader/Loader'; 
import { db } from "../firestore";
import WhatsAppButton from "../components/Whatsapp/WhatsappComponent"
import WelcomeModal from '../components/WelcomeModal';
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
} from "firebase/firestore";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Add loading state
  const [categories, setCategories] = useState(["All Categories"]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        const uniqueCats = [...new Set(fetchedProducts.map((p) => p.category))];
        setCategories(["All Categories", ...uniqueCats]);
      } catch (error) {
        toast.error("Error fetching products, try refresh")
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // 🔹 Done loading
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filter) => {
  let filtered = [...products]; // create a shallow copy

  if (filter.category) {
    filtered = filtered.filter(product => product.category.toLowerCase() === filter.category);
  }

  if (filter.price === 'low') {
    filtered = [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (filter.price === 'high') {
    filtered = [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
  }

  setFilteredProducts(filtered);
};


  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Loader />
      </Container>
    );
  }

  return (
    <div>
      <SVGBackground />
      <NavbarComponent />
      <Container className="mt-2" fluid>
        <Row>
          <Col xs={12} md={3}>
            <Filter onFilterChange={handleFilterChange} categories={categories}/>
          </Col>
          <Col xs={12} md={9} className="scrollable-products">
            <Row>
              {filteredProducts.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
       <WhatsAppButton />
       <WelcomeModal/>
    </div>
  );
};

export default Home;

