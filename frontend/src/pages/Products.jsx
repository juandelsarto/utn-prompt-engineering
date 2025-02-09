import {
  Alert,
  AlertTitle,
  Box,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard.jsx";
import { getAllMattresses } from "../services/mattress.js";

const Products = () => {
  // Uso de useQuery
  const { data: mattresses = [] } = useQuery(["mattresses"], getAllMattresses, {
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30, // Hace refetch cada 30 segundos
  });

  return (
    <Layout>
      <Box py={8}>
        <Container maxW="container.xl">
          {mattresses.length === 0 ? (
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No hay productos
              </AlertTitle>
            </Alert>
          ) : (
            <>
              <Heading fontSize={24} mb={3}>
                Nuestros productos
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {mattresses.map((mattress) => (
                  <ProductCard key={mattress._id} mattress={mattress} />
                ))}
              </SimpleGrid>
            </>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export { Products };
