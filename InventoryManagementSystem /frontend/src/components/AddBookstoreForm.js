import React, { useState } from "react";
import { addBookstore } from "../services/bookstoreService.js";

const AddBookstoreForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBookstore(formData);
      alert("Bookstore added successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      alert("Failed to add bookstore");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-bookstore-form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone" className="form-label">
          Phone:
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="form-label">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>
      <button type="submit" className="submit-btn">
        Add Bookstore
      </button>
    </form>
  );
};

export default AddBookstoreForm;
