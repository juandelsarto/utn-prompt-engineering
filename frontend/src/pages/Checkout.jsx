import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ERRORS, FIELDS, VALIDATIONS } from "../constants/checkout";
import routes from "../router/routes";
import { createOrder } from "../services/order";
import { getCartItems, getCartTotal } from "../utilities/cart";

const initFormData = {
  // Customer information
  [FIELDS.NAME]: "",
  [FIELDS.EMAIL]: "",
  [FIELDS.PHONE]: "",
  [FIELDS.DIRECTION]: "",
  // Payment information
  [FIELDS.CARD_NUMBER]: "",
  [FIELDS.CVC]: "",
  [FIELDS.EXPIRATION_DATE]: "",
};

const Checkout = () => {
  // States
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initFormData);
  const cartItems = getCartItems();
  const cartTotal = getCartTotal();

  // Hooks
  const toast = useToast();
  const navigate = useNavigate();

  // Add validation state
  const [errors, setErrors] = useState({
    [FIELDS.PHONE]: "",
    [FIELDS.EMAIL]: "",
    [FIELDS.CARD_NUMBER]: "",
    [FIELDS.CVC]: "",
    [FIELDS.EXPIRATION_DATE]: "",
  });

  // Validate field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case FIELDS.PHONE:
        if (!VALIDATIONS[FIELDS.PHONE].test(value)) {
          error = ERRORS.PHONE;
        }
        break;

      case FIELDS.EMAIL:
        if (!VALIDATIONS[FIELDS.EMAIL].test(value)) {
          error = ERRORS.EMAIL;
        }
        break;

      case FIELDS.CARD_NUMBER:
        if (!VALIDATIONS[FIELDS.CARD_NUMBER].test(value.replace(/\s/g, ""))) {
          error = ERRORS.CARD_NUMBER;
        }
        break;

      case FIELDS.CVC:
        if (!VALIDATIONS[FIELDS.CVC].test(value)) {
          error = ERRORS.CVC;
        }
        break;

      case FIELDS.EXPIRATION_DATE:
        if (!VALIDATIONS[FIELDS.EXPIRATION_DATE].test(value)) {
          error = ERRORS.EXPIRATION_DATE;
        } else {
          // Check if date is not in the past
          const [month, year] = value.split("/");
          const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
          const today = new Date();
          if (expDate < today) {
            error = ERRORS.EXPIRATION_DATE;
          }
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format input values
    switch (name) {
      case FIELDS.PHONE:
        formattedValue = value.replace(/\D/g, "").slice(0, 10);
        break;

      case FIELDS.CARD_NUMBER:
        formattedValue = value
          .replace(/\D/g, "")
          .slice(0, 16)
          .replace(/(\d{4})(?=\d)/g, "$1 ")
          .trim();
        break;

      case FIELDS.CVC:
        formattedValue = value.replace(/\D/g, "").slice(0, 3);
        break;

      case FIELDS.EXPIRATION_DATE:
        formattedValue = value
          .replace(/\D/g, "")
          .slice(0, 4)
          .replace(/(\d{2})(?=\d)/g, "$1/");
        break;

      default:
        break;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    validateField(name, formattedValue);
  };

  // Handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate all fields before submission
      const fieldsToValidate = [
        FIELDS.PHONE,
        FIELDS.EMAIL,
        FIELDS.CARD_NUMBER,
        FIELDS.CVC,
        FIELDS.EXPIRATION_DATE,
      ];
      const isValid = fieldsToValidate.every((field) =>
        validateField(field, formData[field])
      );

      if (!isValid) {
        toast({
          title: "Error de validación",
          description:
            "Por favor, verifica todos los campos y vuelve a intentarlo",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);

      try {
        await createOrder({
          customer: {
            name: formData[FIELDS.NAME],
            email: formData[FIELDS.EMAIL],
            phone: formData[FIELDS.PHONE],
            direction: formData[FIELDS.DIRECTION],
          },
          payment: {
            cardNumber: formData[FIELDS.CARD_NUMBER],
            expirationDate: formData[FIELDS.EXPIRATION_DATE],
          },
          items: cartItems,
          total: cartTotal,
        });

        toast({
          title: "Compra exitosa",
          description: "¡Gracias por tu compra!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear form
        setFormData(initFormData);
        localStorage.removeItem("cart");
        navigate(routes.home);
      } catch (error) {
        console.error("Error submitting order:", error);
        toast({
          title: "Error",
          description:
            "Ocurrió un error al procesar tu compra. Por favor, inténtalo de nuevo.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [formData, cartItems, cartTotal, toast, navigate]
  );

  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} as="form" onSubmit={handleSubmit}>
          <Box w="100%">
            <Heading size="lg" mb={6}>
              Información del cliente
            </Heading>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre completo</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.email}>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.phone}>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                />
                {errors.phone && (
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direction"
                  value={formData.direction}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, Country"
                />
              </FormControl>
            </Stack>
          </Box>

          <Divider />

          <Box w="100%">
            <Heading size="lg" mb={6}>
              Información de pago
            </Heading>
            <Stack spacing={4}>
              <FormControl isRequired isInvalid={!!errors.cardNumber}>
                <FormLabel>Número de tarjeta</FormLabel>
                <Input
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && (
                  <FormErrorMessage>{errors.cardNumber}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.cvc}>
                <FormLabel>Código de seguridad</FormLabel>
                <Input
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                />
                {errors.cvc && (
                  <FormErrorMessage>{errors.cvc}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.expirationDate}>
                <FormLabel>Fecha de expiración</FormLabel>
                <Input
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                />
                {errors.expirationDate && (
                  <FormErrorMessage>{errors.expirationDate}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </Box>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="100%"
            isLoading={isLoading}
          >
            Confirmar compra
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
};

export { Checkout };
