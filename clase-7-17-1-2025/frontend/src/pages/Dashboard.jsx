import React, { useState, useEffect } from "react";
import { addMattress, updateMattress, deleteMattress, getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    dimensions: "",
    material: "",
    price: ""
  });
  const [mattresses, setMattresses] = useState([]);

  useEffect(() => {
    const fetchMattresses = async () => {
      const mattresses = await getAllMattresses();
      setMattresses(mattresses);
    };
    fetchMattresses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMattress(formData);
    alert("Mattress added successfully!");
    setFormData({ name: "", dimensions: "", material: "", price: "" });
    // Refetch mattresses after adding
    const mattresses = await getAllMattresses();
    setMattresses(mattresses);
  };

  const handleEdit = async (id) => {
    const mattress = mattresses.find((m) => m.id === id);
    setFormData({
      id: mattress.id,
      name: mattress.name,
      dimensions: mattress.dimensions,
      material: mattress.material,
      price: mattress.price
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateMattress(formData.id, formData);
    alert("Mattress updated successfully!");
    setFormData({ name: "", dimensions: "", material: "", price: "" });
    // Refetch mattresses after update
    const mattresses = await getAllMattresses();
    setMattresses(mattresses);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this mattress?")) {
      await deleteMattress(id);
      alert("Mattress deleted successfully!");
      // Refetch mattresses after deletion
      const mattresses = await getAllMattresses();
      setMattresses(mattresses);
    }
  };

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Dashboard</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Dimensions</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Material</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">
                Add Mattress
              </button>
              {formData.name && (
                <button className="button is-warning ml-2" onClick={handleUpdate}>
                  Update Mattress
                </button>
              )}
            </div>
          </form>

          <table className="table is-fullwidth is-striped mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Dimensions</th>
                <th>Material</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mattresses.map((mattress) => (
                <tr key={mattress.id}>
                  <td>{mattress.name}</td>
                  <td>{mattress.dimensions}</td>
                  <td>{mattress.material}</td>
                  <td>{mattress.price}</td>
                  <td>
                    <button
                      className="button is-info is-small"
                      onClick={() => handleEdit(mattress.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="button is-danger is-small ml-2"
                      onClick={() => handleDelete(mattress.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export { Dashboard };
