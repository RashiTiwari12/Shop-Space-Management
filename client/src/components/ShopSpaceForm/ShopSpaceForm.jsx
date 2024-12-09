import React, { useState } from "react";
import axios from "axios";
import "./ShopSpaceForm.css";
const ShopSpaceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "hanger",
    capacity: 0,
    occupied: 0,
    price_per_unit: 0.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/spaces", formData);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container">
        <form className="form-box" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            className="spaceform-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Type</label>
          <select
            className="dropdown-input"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="hanger">Hanger</option>
            <option value="shelf">Shelf</option>
          </select>
          <label>Capacity</label>
          <input
            className="spaceform-input"
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <label>Occupied</label>
          <input
            className="spaceform-input"
            type="number"
            name="occupied"
            value={formData.occupied}
            onChange={handleChange}
          />
          <label>price_per_unit</label>
          <input
            className="spaceform-input"
            type="num"
            name="price_per_unit"
            value={formData.price_per_unit}
            onChange={handleChange}
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopSpaceForm;
