import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import placeholder from "../assets/no-image-placeholder.svg";

const ProductCard = ({ mattress }) => {
  return (
    <Card key={mattress._id} variant="elevated">
      <Box
        backgroundImage={mattress.image ?? placeholder}
        backgroundSize={!mattress.image ? "auto 100%" : "cover"}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundColor="gray.100"
        height={180}
        width="100%"
      ></Box>
      <CardBody>
        <Stack spacing={3}>
          <HStack justify="space-between">
            <Heading size="md">{mattress.name}</Heading>
            <Text fontWeight="bold">${mattress.price}</Text>
          </HStack>
          <HStack>
            <Badge colorScheme="cyan">{mattress.dimensions}</Badge>
            <Badge colorScheme="green">{mattress.material}</Badge>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export { ProductCard };
