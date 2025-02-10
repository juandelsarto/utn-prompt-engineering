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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import placeholder from "../assets/no-image-placeholder.svg";
import {
  MattressDimensions,
  MattressMaterialType,
  MattressMterialTypeUnified,
} from "../constants/mattress_form_options";
import { useAuth } from "../context/auth";
import { addToCart } from "../utilities/cart";
import { formatPrice } from "../utilities/formatPrice";

const ProductPreviewModal = ({ isOpen, onClose, mattress }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    setTimeout(() => {
      // Add the mattress with the selected quantity
      const productWithQuantity = { ...mattress, quantity };
      addToCart(productWithQuantity);

      toast({
        title: "Producto agregado al carrito",
        description: `Se ${
          quantity === 1 ? "ha" : "han"
        } agregado ${quantity} ${
          quantity === 1 ? "unidad" : "unidades"
        } al carrito de compras.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsAddingToCart(false);
      setQuantity(1); // Reset quantity after adding to cart
    }, 1000);
  };

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
                <Badge colorScheme="cyan">
                  {MattressDimensions[mattress.dimensions]}
                </Badge>
                <Badge colorScheme="green">
                  {MattressMaterialType[mattress.material]}
                </Badge>
                <Badge colorScheme="green">
                  {MattressMterialTypeUnified[mattress.materialType]}
                </Badge>
              </HStack>
            </VStack>
            {!user && (
              <HStack spacing={4}>
                <NumberInput
                  value={quantity}
                  min={1}
                  max={10}
                  onChange={(_, value) => setQuantity(value)}
                  maxW="100px"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  leftIcon={<FontAwesomeIcon icon={faShoppingCart} />}
                  colorScheme="blue"
                  size="lg"
                  onClick={handleAddToCart}
                  isLoading={isAddingToCart}
                  flex={1}
                >
                  Añadir al carrito
                </Button>
              </HStack>
            )}
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
