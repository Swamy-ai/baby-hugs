import React, { useState, useEffect, useRef } from "react";
import { db } from "../firestore";
import Loader from "../components/Loader/Loader";
import NavbarComponent from "../components/NavbarComponent";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Image,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanel = () => {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
    productId: "", // 🆕 Added productId field
    images: [],
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState({});
const [deleting, setDeleting] = useState({});
  const [globalLoading, setGlobalLoading] = useState(false);
  const fileInputRefs = useRef({});

  const fetchProducts = async () => {
    setGlobalLoading(true);
    const snapshot = await getDocs(collection(db, "products"));
    const productList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productList);
    setGlobalLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setGlobalLoading(true);

    try {
      const uploadedImages = await Promise.all(
        product.images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "imageupload");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/lakshmiswamy/image/upload",
            formData
          );

          return res.data.secure_url;
        })
      );

      await addDoc(collection(db, "products"), {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        category: product.category,
        productId: product.productId, // 🆕 Save productId
        images: uploadedImages,
      });

      toast.success("Product uploaded!");
      setProduct({
        name: "",
        quantity: "",
        price: "",
        category: "",
        productId: "", // 🆕 Reset productId
        images: [],
      });
      await fetchProducts();
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }

    setLoading(false);
    // setGlobalLoading(false);
  };

  const handleDelete = async (id) => {
    setDeleting((prev) => ({ ...prev, [id]: true }));
    await deleteDoc(doc(db, "products", id));
    toast.info("Product deleted");
    await fetchProducts();
    setDeleting((prev) => ({ ...prev, [id]: false }));
  };

  const handleProductFieldChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImageRemove = (productId, imageIndex) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              images: p.images.filter((_, i) => i !== imageIndex),
            }
          : p
      )
    );
  };

  const handleAdditionalImageUpload = async (e, productId) => {
    const newFiles = Array.from(e.target.files);

    try {
      const uploadedImages = await Promise.all(
        newFiles.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "imageupload");

          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/lakshmiswamy/image/upload",
            formData
          );

          return res.data.secure_url;
        })
      );

      const productToUpdate = products.find((p) => p.id === productId);
      if (!productToUpdate) {
        toast.error("Product not found.");
        return;
      }

      const updatedImages = [...productToUpdate.images, ...uploadedImages];

      await updateDoc(doc(db, "products", productId), {
        images: updatedImages,
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, images: updatedImages } : p
        )
      );

      toast.success("Images added successfully!");
      if (fileInputRefs.current[productId]) {
        fileInputRefs.current[productId].value = "";
      }
      await fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload images.");
    }
  };

  const handleSave = async (product) => {
    
    const { id, name, price, quantity, category, productId: pid, images } = product;
    setSaving((prev) => ({ ...prev, [id]: true }));
    try {
      await updateDoc(doc(db, "products", id), {
        name,
        price,
        quantity,
        category,
        productId: pid,
        images,
      });
      toast.success("Product updated!");
      await fetchProducts();
    } catch (err) {
      toast.error("Failed to save product");
    }
    setSaving((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <><NavbarComponent />
  <Container className="my-4 text-center">
      {globalLoading && <Loader/>}

      <ToastContainer position="top-left" />
      <h2 className="mb-4">Admin Panel</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          name="productId"
          placeholder="Product ID"
          value={product.productId}
          onChange={handleChange}
          className="mb-2"
        />
        <Form.Control
          type="file"
          multiple
          onChange={handleImageChange}
          className="mb-3"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Upload Product"}
        </Button>
      </Form>

      <hr className="my-5" />

      <h4>Product List</h4>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price (₹)</th>
              <th>Category</th>
              <th>Product ID</th>
              <th>Upload</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td className="image-cell">
                  {prod.images?.map((img, index) => (
                    <div key={index} className="image-hover-container">
                      <Image src={img} className="thumb-image" rounded />
                      <span
                        className="image-hover-overlay"
                        onClick={() => handleImageRemove(prod.id, index)}
                      >
                        ×
                      </span>
                    </div>
                  ))}
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={prod.name}
                    onChange={(e) =>
                      handleProductFieldChange(prod.id, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={prod.quantity}
                    onChange={(e) =>
                      handleProductFieldChange(prod.id, "quantity", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={prod.price}
                    onChange={(e) =>
                      handleProductFieldChange(prod.id, "price", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={prod.category || ""}
                    onChange={(e) =>
                      handleProductFieldChange(prod.id, "category", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={prod.productId || ""}
                    onChange={(e) =>
                      handleProductFieldChange(prod.id, "productId", e.target.value)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="file"
                    multiple
                    ref={(el) => (fileInputRefs.current[prod.id] = el)}
                    onChange={(e) => handleAdditionalImageUpload(e, prod.id)}
                  />
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    className="me-2 mb-2"
                    onClick={() => handleSave(prod)}
                    disabled={saving[prod.id]}
                  >
                     {saving[prod.id] ? <Spinner animation="border" size="sm" /> : "Save"}
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(prod.id)}
                    disabled={deleting[prod.id]}
                  >
                     {deleting[prod.id] ? <Spinner animation="border" size="sm" /> : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
    </>
    
  );
};

export default AdminPanel;
