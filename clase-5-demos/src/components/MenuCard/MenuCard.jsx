import './MenuCard.css';

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

const MenuCard = () => {
  return (
    <div className="row mt-4">
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
  );
};

export default MenuCard;
