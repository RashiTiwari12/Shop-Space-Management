import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditModal.css";
const EditModal = ({ space, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    capacity: "",
    occupied: "",
    price_per_unit: "",
    created_at: "",
  });

  useEffect(() => {
    if (space) {
      setFormData({
        name: space.name,
        type: space.type,
        capacity: space.capacity,
        occupied: space.occupied,
        price_per_unit: space.price_per_unit,
        created_at: space.created_at,
      });
    }
  }, [space]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedSpace = { ...formData, id: space.id };
      const response = await axios.put(`/api/spaces/${space.id}`, updatedSpace);
      console.log("Updated successfully:", response.data);

      onUpdate(response.data);
    } catch (error) {
      console.error("Error updating space:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Space</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              className="edit-modal-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type:</label>
            <select
              className="dropdown-editmodal"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="hanger">Hanger</option>
              <option value="shelf">Shelf</option>
            </select>
          </div>
          <div>
            <label>Capacity:</label>
            <input
              className="edit-modal-input"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Occupied:</label>
            <input
              className="edit-modal-input"
              type="number"
              name="occupied"
              value={formData.occupied}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price per unit:</label>
            <input
              className="edit-modal-input"
              type="number"
              name="price_per_unit"
              value={formData.price_per_unit}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Created At:</label>
            <input
              className="edit-modal-input"
              type="text"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
            />
          </div>
          <div>
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
