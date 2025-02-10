import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import routes from "../router/routes";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container maxW="container.md" py={16}>
        <VStack spacing={8} align="center" textAlign="center">
          <Box>
            <Heading size="xl" mb={4} color="green.500">
              ¡Compra exitosa!
            </Heading>
            <Text fontSize="lg">
              Gracias por tu compra. Hemos recibido tu pedido correctamente.
            </Text>
          </Box>

          <Button
            colorScheme="blue"
            size="lg"
            onClick={() => navigate(routes.home)}
          >
            Volver al inicio
          </Button>
        </VStack>
      </Container>
    </Layout>
  );
};

export { CheckoutSuccess };
