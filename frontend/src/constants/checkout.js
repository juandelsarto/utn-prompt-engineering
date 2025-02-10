export const FIELDS = {
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
  DIRECTION: "direction",
  CARD_NUMBER: "cardNumber",
  CVC: "cvc",
  EXPIRATION_DATE: "expirationDate",
};

export const ERRORS = {
  PHONE: "Teléfono debe tener entre 8 y 10 dígitos",
  EMAIL: "Formato de correo electrónico inválido",
  CARD_NUMBER: "El número de tarjeta debe ser de 16 dígitos",
  CVC: "CVC debe ser de 3 dígitos",
  EXPIRATION_DATE: "Usar formato MM/YY",
};

const phoneRegex = /^\d{8,10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cardNumberRegex = /^\d{16}$/;
const cvcRegex = /^\d{3}$/;
const expRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

export const VALIDATIONS = {
  [FIELDS.PHONE]: phoneRegex,
  [FIELDS.EMAIL]: emailRegex,
  [FIELDS.CARD_NUMBER]: cardNumberRegex,
  [FIELDS.CVC]: cvcRegex,
  [FIELDS.EXPIRATION_DATE]: expRegex,
};
