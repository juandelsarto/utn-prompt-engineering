import { Box, Container, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import routes from "../router/routes";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  const isHome = location.pathname === routes.home;

  return (
    <Box>
      <Navbar />
      <Box as="main" minH="100vh">
        {isHome && <Hero />}
        <Container maxW="container.xl" mt={5}>
          {children}
        </Container>
      </Box>
      <Box as="footer" bg="gray.100" py={4}>
        <Container maxW="container.xl">
          <Text textAlign="center">
            Sitio creado por Gabriel Alberini / Juan Cruz Del Sarto
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Layout };
