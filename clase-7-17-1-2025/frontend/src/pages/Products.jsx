import { useEffect, useState } from "react";
import { getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";

const Products = () => {
  const [mattresses, setMattresses] = useState([]);

  useEffect(() => {
    const fetchMattresses = async () => {
      const data = await getAllMattresses();
      setMattresses(data);
    };
    fetchMattresses();
  }, []);

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-primary">Our Products</h1>
          <div className="columns is-multiline">
            {mattresses.map((mattress) => (
              <div className="column is-one-third" key={mattress._id}>
                <div className="card">
                  <div className="card-content">
                    <p className="title">{mattress.name}</p>
                    <p>Dimensions: {mattress.dimensions}</p>
                    <p>Material: {mattress.material}</p>
                    <p>Price: ${mattress.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { Products };
