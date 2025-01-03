import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase.js';  // Asegúrate de que este sea el path correcto
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Layout } from '../../components/Layout/Layout';

const Dashboard = () => {
  const [platos, setPlatos] = useState([]);
  const [nuevoPlato, setNuevoPlato] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    precio: '',
    imagen: '',
    ingredientes: '',
    tamaño: '',
    variedad: '',
    opciones: '',
  });
  const [editando, setEditando] = useState(null);

  // Obtener los platos del menú desde Firestore
  const fetchPlatos = async () => {
    const platosRef = collection(db, 'menu');
    const snapshot = await getDocs(platosRef);
    const platosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPlatos(platosList);
  };

  // Crear un nuevo plato
  const crearPlato = async () => {
    const platosRef = collection(db, 'menu');
    await addDoc(platosRef, nuevoPlato);
    setNuevoPlato({
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: '',
      imagen: '',
      ingredientes: '',
      tamaño: '',
      variedad: '',
      opciones: '',
    });
    fetchPlatos();
  };

  // Actualizar un plato
  const actualizarPlato = async () => {
    const platoRef = doc(db, 'menu', editando.id);
    await updateDoc(platoRef, nuevoPlato);
    setNuevoPlato({
      nombre: '',
      descripcion: '',
      categoria: '',
      precio: '',
      imagen: '',
      ingredientes: '',
      tamaño: '',
      variedad: '',
      opciones: '',
    });
    setEditando(null);
    fetchPlatos();
  };

  // Eliminar un plato
  const eliminarPlato = async (id) => {
    const platoRef = doc(db, 'menu', id);
    await deleteDoc(platoRef);
    fetchPlatos();
  };

  // Controlar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoPlato({ ...nuevoPlato, [name]: value });
  };

  // Controlar el inicio de la edición
  const iniciarEdicion = (plato) => {
    setNuevoPlato(plato);
    setEditando(plato);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <h1>📋 Dashboard - Administración de Menú</h1>

        <div className="mt-4">
          <h3>{editando ? 'Editar Plato' : 'Agregar Nuevo Plato'}</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={nuevoPlato.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                value={nuevoPlato.descripcion}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <select
                className="form-control"
                id="categoria"
                name="categoria"
                value={nuevoPlato.categoria}
                onChange={handleChange}
              >
                <option value="entradas">Entradas</option>
                <option value="platosPrincipales">Platos Principales</option>
                <option value="postres">Postres</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="precio" className="form-label">Precio</label>
              <input
                type="text"
                className="form-control"
                id="precio"
                name="precio"
                value={nuevoPlato.precio}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">Imagen URL</label>
              <input
                type="text"
                className="form-control"
                id="imagen"
                name="imagen"
                value={nuevoPlato.imagen}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredientes" className="form-label">Ingredientes</label>
              <input
                type="text"
                className="form-control"
                id="ingredientes"
                name="ingredientes"
                value={nuevoPlato.ingredientes}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tamaño" className="form-label">Tamaño</label>
              <input
                type="text"
                className="form-control"
                id="tamaño"
                name="tamaño"
                value={nuevoPlato.tamaño}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="variedad" className="form-label">Variedad</label>
              <input
                type="text"
                className="form-control"
                id="variedad"
                name="variedad"
                value={nuevoPlato.variedad}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="opciones" className="form-label">Opciones</label>
              <input
                type="text"
                className="form-control"
                id="opciones"
                name="opciones"
                value={nuevoPlato.opciones}
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={editando ? actualizarPlato : crearPlato}
            >
              {editando ? 'Actualizar Plato' : 'Agregar Plato'}
            </button>
          </form>
        </div>

        <div className="mt-5">
          <h3>Menú Actual</h3>
          <div className="list-group">
            {platos.map(plato => (
              <div key={plato.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{plato.nombre}</h5>
                  <p>{plato.descripcion}</p>
                  <p><strong>Categoría:</strong> {plato.categoria}</p>
                  <p><strong>Ingredientes:</strong> {plato.ingredientes}</p>
                  <p><strong>Tamaño:</strong> {plato.tamaño}</p>
                  <p><strong>Variedad:</strong> {plato.variedad}</p>
                  <p><strong>Opciones:</strong> {plato.opciones}</p>
                  <p><strong>Precio:</strong> {plato.precio}</p>
                </div>
                <div>
                  <button className="btn btn-info" onClick={() => iniciarEdicion(plato)}>Editar</button>
                  <button className="btn btn-danger ms-2" onClick={() => eliminarPlato(plato.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { Dashboard };
