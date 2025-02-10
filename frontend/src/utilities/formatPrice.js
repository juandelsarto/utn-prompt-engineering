// Format price
export const formatPrice = (price) => {
  return price.toLocaleString("es-ES", {
    style: "currency",
    currency: "ARS",
  });
};
