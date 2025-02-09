export const formatPrice = (price) => {
  return price.toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
  });
};

// Cart management functions
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find((item) => item._id === product._id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find((item) => item._id === productId);

  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
