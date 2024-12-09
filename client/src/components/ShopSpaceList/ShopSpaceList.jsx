import React, { useEffect, useState } from "react";
import "./ShopSpaceList.css";
import axios from "axios";
import EditModal from "../EditModal/EditModal";
const ShopSpaceList = ({ refresh, setRefresh }) => {
  const [spaceList, setSpaceList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await fetch("/api/spaces");
        const data = await response.json();
        setSpaceList(data);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpace();
  }, [refresh]);

  const onEdit = (space) => {
    console.log("Edit clicked for:", space);
    setSelectedSpace(space);
    setShowModal(true);
  };
  const updateSpace = (updatedSpace) => {
    setSpaceList((prev) =>
      prev.map((space) => (space.id === updatedSpace.id ? updatedSpace : space))
    );
    setShowModal(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/spaces/${id}`);
      setRefresh((prev) => !prev);
      console.error("deleted");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Price per unit</th>
            <th>Created_At</th>
          </tr>
        </thead>
        <tbody>
          {spaceList.length > 0 ? (
            spaceList.map((space) => (
              <tr key={space.id}>
                <td>{space.name}</td>
                <td>{space.type}</td>
                <td>{space.capacity}</td>
                <td>{space.occupied}</td>
                <td>{space.price_per_unit}</td>
                <td>{space.created_at}</td>
                <td>
                  <button onClick={() => onEdit(space)}>Edit</button>
                  <button onClick={() => handleDelete(space.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No spaces available</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && selectedSpace && (
        <EditModal
          space={selectedSpace}
          onClose={() => setShowModal(false)}
          onUpdate={updateSpace}
        />
      )}
    </div>
  );
};

export default ShopSpaceList;
