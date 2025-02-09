import { Box, Button, Container, Flex, HStack, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/auth";
import routes from "../router/routes";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(routes.login);
  };

  return (
    <Box as="nav" bg="teal.500" py={3}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link to={routes.home}>
            <Image src={logo} boxSize={16} />
          </Link>
          <HStack gap={6}>
            <Link to={routes.home}>
              <Button variant="link" colorScheme="whiteAlpha">
                Inicio
              </Button>
            </Link>
            {user ? (
              <>
                <Link to={routes.dashboard}>
                  <Button variant="link" colorScheme="whiteAlpha" mr={3}>
                    Panel de control
                  </Button>
                </Link>
                <Button colorScheme="whiteAlpha" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link to={routes.login}>
                <Button colorScheme="whiteAlpha">Iniciar sesión</Button>
              </Link>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
