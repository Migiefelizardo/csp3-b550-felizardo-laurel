import React, { useState, useEffect } from "react";
import api from "../services/api";
import './AdminDashboard.css';

export default function AdminDashboard({ user, token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    active: true,
  });

  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    if (!token) return;

    async function fetchProducts() {
      setLoading(true);
      setError("");
      try {
        const data = await api.fetchAllProducts(token);
        setProducts(data.products || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProductId) {
        await api.updateProduct(editingProductId, formData, token);
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingProductId ? { ...p, ...formData } : p
          )
        );
      } else {
        const newProduct = await api.addProduct(formData, token);
        setProducts((prev) => [...prev, newProduct]);
      }
      resetForm();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", description: "", image: "", active: true });
    setEditingProductId(null);
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image || "",
      active: product.active,
    });
    setEditingProductId(product._id);
  };

  const toggleActive = async (product) => {
    try {
      await api.toggleProductActive(product._id, !product.active, token);
      setProducts((prev) =>
        prev.map((p) =>
          p._id === product._id ? { ...p, active: !p.active } : p
        )
      );
    } catch {
      alert("Failed to toggle product active status");
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.deleteProduct(productId, token);
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch {
      alert("Failed to delete product");
    }
  };

  if (!user) return <p>Please login as admin to view this page.</p>;
  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <button onClick={() => window.location.href = "/admin/orders"}>
        Orders
      </button>

      <form className="product-form" onSubmit={handleSubmit}>
        <h2>{editingProductId ? "Edit Product" : "Add New Product"}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          min="0"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={() =>
              setFormData((f) => ({ ...f, active: !f.active }))
            }
          />{" "}
          Active
        </label>
        <div className="button-group">
          <button type="submit">
            {editingProductId ? "Update" : "Add product"}
          </button>
          {editingProductId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>All Products</h2>
      {products.length === 0 && <p>No products found.</p>}
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-item" key={product._id}>
            <div>
              <strong>{product.name}</strong> (${product.price.toFixed(2)}) <br />
              <small>{product.description}</small> <br />
              <small>Status: {product.active ? "Active" : "Inactive"}</small>
            </div>
            <div>
              <button className="edit-btn" onClick={() => handleEditClick(product)}>Update</button>
              <button className="toggle-btn" onClick={() => toggleActive(product)}>
                {product.active ? "Disable" : "Activate"}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
