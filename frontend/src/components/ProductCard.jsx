import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import placeholder from "../assets/no-image-placeholder.svg";
import { ProductPreviewModal } from "./ProductPreviewModal";

const ProductCard = ({ mattress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card
        key={mattress._id}
        variant="elevated"
        cursor="pointer"
        onClick={onOpen}
        _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
      >
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

      <ProductPreviewModal
        isOpen={isOpen}
        onClose={onClose}
        mattress={mattress}
      />
    </>
  );
};

ProductCard.propTypes = {
  mattress: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    dimensions: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
  }).isRequired,
};

export { ProductCard };
