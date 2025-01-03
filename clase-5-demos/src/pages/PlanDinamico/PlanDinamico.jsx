import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase.js";

const PlanDinamico = () => {
  const [menu, setMenu] = useState({ entradas: [], platosPrincipales: [], postres: [] });

  useEffect(() => {
    // Función para obtener los datos de Firebase
    const fetchMenuData = async () => {
      const menuRef = collection(db, "menu");
      const snapshot = await getDocs(menuRef);
      const menuData = snapshot.docs.map((doc) => doc.data());
      console.log(menuData)
      setMenu({
        entradas: menuData.filter((item) => item.categoria === "entradas"),
        platosPrincipales: menuData.filter((item) => item.categoria === "platosPrincipales"),
        postres: menuData.filter((item) => item.categoria === "postres"),
      });
    };

    fetchMenuData();
  }, []);

  return (
    <Layout>
      <div className="container mt-5">
        <h1>🍽️ Plan Dinámico</h1>
        <p>
          El Plan Dinámico es perfecto para restaurantes que necesitan actualizar su menú con frecuencia,
          permitiendo modificar, agregar o eliminar elementos en tiempo real.
        </p>

        <div className="mt-4">
          <h3>Características:</h3>
          <ul>
            <li>Menú en formato dinámico para fácil administración</li>
            <li>Diseño responsivo</li>
            <li>Capacidad para actualizar, agregar o eliminar platos en tiempo real</li>
            <li>Organización en categorías personalizables</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3>Panel de administración:</h3>
          <Link to={"/dashboard"} className="btn btn-outline-primary">
            Ver dashboard de administración
          </Link>
        </div>

        <div className="mt-5">
          <h3>Menú Virtual</h3>
          <div id="cont-menu" className="row mt-4">
            {/* Categoría de Entradas */}
            <div className="col-12 mb-5">
              <h3 className="text-center mb-4">Entradas</h3>
              <div className="row">
                {menu.entradas.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <img src={item.imagen} alt={item.nombre} className="card-img-top" />
                      <div className="card-body">
                        <div className="card-body">
                          <h5 className="card-title">{item.nombre}</h5>
                          <p className="card-text"><strong>Ingredientes:</strong> {item.ingredientes}</p>
                          <p className="card-text"><strong>Tamaño:</strong> {item.tamaño}</p>
                          <p className="card-text"><strong>Variedad:</strong> {item.variedad}</p>
                          <p className="card-text"><strong>Opciones:</strong> {item.opciones}</p>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categoría de Platos principales */}
            <div className="col-12 mb-5">
              <h3 className="text-center mb-4">Platos principales</h3>
              <div className="row">
                {menu.platosPrincipales.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <img src={item.imagen} alt={item.nombre} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{item.nombre}</h5>
                        <p className="card-text"><strong>Ingredientes:</strong> {item.ingredientes}</p>
                        <p className="card-text"><strong>Tamaño:</strong> {item.tamaño}</p>
                        <p className="card-text"><strong>Variedad:</strong> {item.variedad}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categoría de Postres */}
            <div className="col-12 mb-5">
              <h3 className="text-center mb-4">Postres</h3>
              <div className="row">
                {menu.postres.map((item, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                      <img src={item.imagen} alt={item.nombre} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{item.nombre}</h5>
                        <p className="card-text"><strong>Ingredientes:</strong> {item.ingredientes}</p>
                        <p className="card-text"><strong>Tamaño:</strong> {item.tamaño}</p>
                        <p className="card-text"><strong>Variedad:</strong> {item.variedad}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export { PlanDinamico };
