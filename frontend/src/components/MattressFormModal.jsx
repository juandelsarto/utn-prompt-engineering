import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  VStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import {
  MattressDimensions,
  MattressFoamType,
  MattressMaterialType,
  MattressSpringType,
} from "../constants/mattress_form_options";

const MattressFormModal = ({
  isOpen,
  onClose,
  formData,
  isUpdating,
  onChange,
  onSubmit,
}) => {
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.match(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/) !== null;
    } catch (e) {
      console.error("Error al validar la URL:", e);
      return false;
    }
  };

  const isImageUrlInvalid = formData.image && !isValidUrl(formData.image);

  const selectedMaterialType =
    formData.material === "FOAM" ? MattressFoamType : MattressSpringType;

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
              <FormControl isInvalid={isImageUrlInvalid}>
                <FormLabel>URL de la imagen</FormLabel>
                <Input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={onChange}
                />
                {isImageUrlInvalid && (
                  <FormErrorMessage>
                    Por favor, ingrese una URL válida de imagen (debe terminar
                    en .jpg, .png, .gif, etc.)
                  </FormErrorMessage>
                )}
              </FormControl>

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
                <Select
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={onChange}
                >
                  <option value="">Seleccione una dimensión</option>
                  {Object.keys(MattressDimensions).map((dimension) => (
                    <option key={dimension} value={dimension}>
                      {MattressDimensions[dimension]}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Material</FormLabel>
                <Select
                  name="material"
                  value={formData.material}
                  onChange={onChange}
                >
                  <option value="">Seleccione un material</option>
                  {Object.keys(MattressMaterialType).map((material) => (
                    <option key={material} value={material}>
                      {MattressMaterialType[material]}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {formData.material && (
                <FormControl isRequired>
                  <FormLabel>
                    {formData.material === "FOAM"
                      ? "Tipo de Espuma"
                      : "Tipo de Resorte"}
                  </FormLabel>
                  <Select
                    name="materialType"
                    value={formData.materialType}
                    onChange={onChange}
                  >
                    <option value="">
                      Seleccione un tipo de{" "}
                      {formData.material === "FOAM" ? "espuma" : "resorte"}
                    </option>
                    {Object.keys(selectedMaterialType).map((type) => (
                      <option key={type} value={type}>
                        {selectedMaterialType[type]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}

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
            <Button
              type="submit"
              colorScheme="blue"
              isDisabled={isImageUrlInvalid}
            >
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
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    dimensions: PropTypes.string.isRequired,
    material: PropTypes.string.isRequired,
    materialType: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export { MattressFormModal };
