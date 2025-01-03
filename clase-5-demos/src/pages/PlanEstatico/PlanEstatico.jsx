import { Layout } from "../../components/Layout/Layout";
import { generateJPG } from "../../services/generateJpg.js";

const PlanEstatico = () => {

  const menu = [
    {
      category: "Entradas",
      items: [
        {
          name: "Bruschetta",
          image: "https://cdn.pixabay.com/photo/2017/03/05/01/40/burger-2117465_1280.jpg",
          ingredients: "Tomate, albahaca, ajo, pan tostado",
          size: "4 unidades",
          variety: "Clásica / Con queso",
          options: ["Vegana", "Vegetariana"],
        },
        {
          name: "Empanadas",
          image: "https://cdn.pixabay.com/photo/2017/03/05/01/40/burger-2117465_1280.jpg",
          ingredients: "Carne, cebolla, huevo, especias",
          size: "6 unidades",
          variety: "Carne / Pollo / Espinaca",
          options: ["Vegetariana"],
        }
      ],
    },
    {
      category: "Platos principales",
      items: [
        {
          name: "Pasta Carbonara",
          image: "https://cdn.pixabay.com/photo/2017/03/05/01/40/burger-2117465_1280.jpg",
          ingredients: "Pasta, panceta, crema, parmesano",
          size: "350g",
          variety: "Clásica",
          options: [],
        },
        {
          name: "Pizza Margarita",
          image: "https://cdn.pixabay.com/photo/2017/03/05/01/40/burger-2117465_1280.jpg",
          ingredients: "Mozzarella, tomate, albahaca",
          size: "8 porciones",
          variety: "Clásica",
          options: ["Vegetariana"],
        }
      ],
    },
    {
      category: "Postres",
      items: [
        {
          name: "Tiramisú",
          image: "https://cdn.pixabay.com/photo/2017/03/05/01/40/burger-2117465_1280.jpg",
          ingredients: "Mascarpone, café, cacao",
          size: "200g",
          variety: "Clásica",
          options: [],
        }
      ],
    }
  ];


  return (
    <Layout>
      <div className="container mt-5">
        <h1>🍽️ Plan Estático</h1>
        <p>
          El Plan Estático es ideal para bares y restaurantes pequeños que buscan un menú accesible y fácil de actualizar.
        </p>

        <div className="mt-4">
          <h3>Características:</h3>
          <ul>
            <li>Menú en formato PDF o HTML accesible con código QR</li>
            <li>Diseño responsive para móviles y tablets</li>
            <li>Hasta 2 actualizaciones mensuales del contenido del menú</li>
            <li>Organización en categorías: Entradas, Platos principales, Postres, Bebidas</li>
          </ul>
        </div>

        <div className="mt-5">
          <h3>Menú Virtual</h3>
          <p>Accede al menú en formato PDF o explora la versión HTML a continuación:</p>

          <div className="d-flex justify-content-center my-3">
            <button onClick={generateJPG} className="btn btn-outline-primary">
              Ver Menú en PDF
            </button>
          </div>

          <h4 className="mt-4">Menú HTML Interactivo</h4>
          <div id="cont-menu" className="row mt-4">
            {menu.map((section) => (
              <div key={section.category} className="col-12 mb-5">
                <h3 className="text-center mb-4">{section.category}</h3>
                <div className="row">
                  {section.items.map((dish, index) => (
                    <div key={index} className="col-md-6 col-lg-4 mb-4">
                      <div className="card shadow-sm h-100">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{dish.name}</h5>
                          <p className="card-text"><strong>Ingredientes:</strong> {dish.ingredients}</p>
                          <p className="card-text"><strong>Tamaño:</strong> {dish.size}</p>
                          {dish.variety && (
                            <p className="card-text">
                              <strong>Variedad:</strong> {dish.variety}
                            </p>
                          )}
                          {dish.options.length > 0 && (
                            <div className="options mt-3">
                              <h6 className="mb-2">Opciones Especiales:</h6>
                              <ul className="list-group list-group-flush">
                                {dish.options.map((option, i) => (
                                  <li key={i} className="list-group-item">
                                    {option}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export { PlanEstatico };