import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import routes from "../router/routes";
import { formatPrice, getCart, removeFromCart } from "../utilities";

const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const cart = getCart();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
      status: "success",
      duration: 2000,
    });
    // Force re-render
    window.location.reload();
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <VStack spacing={4} align="center">
            <Heading size="lg">Tu carrito está vacío</Heading>
            <Button colorScheme="blue" onClick={() => navigate(routes.home)}>
              Ver productos
            </Button>
          </VStack>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Cart Items Table */}
          <GridItem>
            <Heading size="lg" mb={6}>
              Carrito de compras
            </Heading>
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Producto</Th>
                    <Th isNumeric>Precio</Th>
                    <Th isNumeric>Cantidad</Th>
                    <Th isNumeric>Subtotal</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cart.map((item) => (
                    <Tr key={item._id}>
                      <Td>{item.name}</Td>
                      <Td isNumeric>{formatPrice(item.price)}</Td>
                      <Td isNumeric>{item.quantity}</Td>
                      <Td isNumeric>
                        {formatPrice(item.price * item.quantity)}
                      </Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          <Icon as={FontAwesomeIcon} icon={faTrash} />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </GridItem>

          {/* Order Summary */}
          <GridItem>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              position="sticky"
              top="24px"
            >
              <VStack spacing={4} align="stretch">
                <Heading size="md">Resumen de la orden</Heading>
                <Divider />
                <HStack justify="space-between">
                  <Text>Subtotal</Text>
                  <Text fontWeight="bold">{formatPrice(calculateTotal())}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Envío</Text>
                  <Text fontWeight="bold">Gratis</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">
                    Total
                  </Text>
                  <Text fontSize="lg" fontWeight="bold">
                    {formatPrice(calculateTotal())}
                  </Text>
                </HStack>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={() => navigate(routes.checkout)}
                >
                  Continuar al pago
                </Button>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
};

export { Cart };
