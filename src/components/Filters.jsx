import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Filter = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    onFilterChange({ category: newCategory, price });
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    onFilterChange({ category, price: newPrice });
  };

  return (
    <div className="glass-effect mb-4">
      <h4>Filter Products</h4>
      <Form>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={handleCategoryChange}
            className="glass-select"
          >
            <option value=""  >All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="price" className="mt-3" >
          <Form.Label>Price Range</Form.Label>
          <Form.Control
            as="select"
            value={price}
            onChange={handlePriceChange}
            className="glass-select"
          >
            <option value="">All Prices</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Filter;
