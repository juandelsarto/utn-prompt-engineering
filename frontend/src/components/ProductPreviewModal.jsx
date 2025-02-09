import {
  Badge,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import placeholder from "../assets/no-image-placeholder.svg";
import { formatPrice } from "../utilities";

const ProductPreviewModal = ({ isOpen, onClose, mattress }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mattress.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Image
              src={mattress.image ?? placeholder}
              alt={mattress.name}
              objectFit="cover"
              height="300px"
              width="100%"
              fallbackSrc={placeholder}
            />
            <VStack align="flex-start" justify="space-between">
              <Text fontSize="2xl" fontWeight="bold">
                {formatPrice(mattress.price)}
              </Text>
              <HStack>
                <Badge colorScheme="cyan">{mattress.dimensions}</Badge>
                <Badge colorScheme="green">{mattress.material}</Badge>
              </HStack>
            </HStack>
            <Button colorScheme="blue" size="lg">
              Añadir al carrito
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ProductPreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mattress: PropTypes.object.isRequired,
};

export { ProductPreviewModal };
