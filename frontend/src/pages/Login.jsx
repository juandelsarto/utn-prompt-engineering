import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Link as ChakraLink,
  Container,
  Heading,
  Text,
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
      const loggedInUser = await loginWithGoogle(); // Iniciamos sesión con Google
      console.log(loggedInUser); // Puedes ver los detalles del usuario aquí
      navigate(routes.home); // Redirigir al home si el login es exitoso
    } catch (err) {
      console.log(err);
      setError("Error al iniciar sesión con Google. Intenta de nuevo.");
    }
  };

  // Si ya está logueado, redirigir automáticamente
  if (user) {
    navigate(routes.home); // Redirige al home si ya está autenticado
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

            <Text>
              ¿No tienes cuenta?{" "}
              <ChakraLink color="blue.500" href="/registro">
                Regístrate
              </ChakraLink>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export { Login };
