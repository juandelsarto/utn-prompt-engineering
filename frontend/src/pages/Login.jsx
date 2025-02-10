import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx"; // Importamos el contexto de autenticación
import routes from "../router/routes.js";
import { loginWithGoogle } from "../services/auth.js"; // Importamos la función de login con Google

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenemos el usuario desde el contexto global

  const handleLoginWithGoogle = async () => {
    try {
      await loginWithGoogle(); // Iniciamos sesión con Google
      navigate(routes.orders); // Redirigir al home si el login es exitoso
    } catch (err) {
      console.log(err);
      setError("Error al iniciar sesión con Google. Intenta de nuevo.");
    }
  };

  if (user) {
    navigate(routes.orders);
  }

  return (
    <Box minH="100vh" py={10} bg="gray.50">
      <Container maxW="container.sm">
        <Box bg="white" p={8} borderRadius="lg" boxShadow="md">
          <VStack spacing={6}>
            <Heading size="lg">Iniciar sesión con Google</Heading>

            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            <Button
              colorScheme="red"
              size="lg"
              width="full"
              onClick={handleLoginWithGoogle}
            >
              Iniciar sesión con Google
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export { Login };
