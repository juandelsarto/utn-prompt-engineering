import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const MattressFormModal = ({
  isOpen,
  onClose,
  formData,
  isUpdating,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isUpdating ? "Editar Colchón" : "Agregar Nuevo Colchón"}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={onSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Dimensiones</FormLabel>
                <Input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Material</FormLabel>
                <Input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={onChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Precio</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={onChange}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" colorScheme="blue">
              {isUpdating ? "Actualizar" : "Crear"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

MattressFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dimensions: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export { MattressFormModal };
