import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/auth";
import routes from "../router/routes";
import { getCart } from "../utilities/cart";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate(routes.home);
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <Box as="nav" bg="teal.500" py={3}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack gap={6}>
            <Link to={routes.home}>
              <Image src={logo} boxSize={16} />
            </Link>
            {!user && (
              <>
                <Link to={routes.home}>
                  <Button variant="link" colorScheme="whiteAlpha">
                    Inicio
                  </Button>
                </Link>
              </>
            )}
          </HStack>
          <HStack gap={6}>
            {user ? (
              <>
                <Text color="white">Hola, {user.displayName}</Text>
                <Link to={routes.dashboard}>
                  <Button variant="link" colorScheme="whiteAlpha" mr={3}>
                    Panel de control
                  </Button>
                </Link>
                <Link to={routes.orders}>
                  <Button variant="link" colorScheme="whiteAlpha" mr={3}>
                    Pedidos
                  </Button>
                </Link>
                <Button colorScheme="whiteAlpha" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={routes.cart}>
                  <Button variant="link" colorScheme="whiteAlpha">
                    Mi Carrito ({cartCount})
                  </Button>
                </Link>
                <Link to={routes.login}>
                  <Button colorScheme="whiteAlpha">Login as Admin</Button>
                </Link>
              </>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
