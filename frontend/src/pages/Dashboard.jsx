import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Layout } from "../components/Layout";
import { MattressFormModal } from "../components/MattressFormModal";
import { Modal } from "../components/Modal";
import {
  addMattress,
  deleteMattress,
  getAllMattresses,
  updateMattress,
} from "../services/mattress.js";
import { formatPrice } from "../utilities/index.js";

const initialMattressData = {
  name: "",
  dimensions: "",
  material: "",
  price: "",
};

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialMattressData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modal, setModal] = useState({
    isActive: false,
    message: "",
    onConfirm: null,
  });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const toast = useToast();

  const { data: mattresses = [] } = useQuery(["mattresses"], getAllMattresses, {
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
  });

  const showToast = (message, type) => {
    toast({
      title: message,
      status: type,
      duration: 2000,
      containerStyle: { marginBottom: 12 },
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        await updateMattress(formData._id, formData);
        showToast("Mattress updated successfully!", "success");
      } else {
        await addMattress(formData);
        showToast("Mattress added successfully!", "success");
      }
      setFormData({ name: "", dimensions: "", material: "", price: "" });
      setIsUpdating(false);
      setIsFormModalOpen(false);
      queryClient.invalidateQueries(["mattresses"]);
    } catch (error) {
      showToast("Error processing your request", "error");
    }
  };

  const handleEdit = (mattress) => {
    const { _id, name, dimensions, material, price } = mattress;
    setFormData({
      _id,
      name,
      dimensions,
      material,
      price,
    });
    setIsUpdating(true);
    setIsFormModalOpen(true);
  };

  const handleDelete = async (id) => {
    setModal({
      isActive: true,
      message: "Are you sure you want to delete this mattress?",
      onConfirm: async () => {
        await deleteMattress(id);
        showToast("Mattress deleted successfully!", "success");
        queryClient.invalidateQueries(["mattresses"]);
        setModal({ isActive: false, message: "", onConfirm: null });
      },
    });
  };

  return (
    <Layout>
      <Box py={8}>
        <Container maxW="container.xl">
          <HStack justify="space-between" mb={6}>
            <Heading>Dashboard</Heading>
            <Button
              colorScheme="blue"
              onClick={() => {
                setIsUpdating(false);
                setFormData(initialMattressData);
                setIsFormModalOpen(true);
              }}
            >
              Agregar nuevo colchón
            </Button>
          </HStack>

          {mattresses.length > 0 ? (
                      <Td>{formatPrice(mattress.price)}</Td>
          ) : (
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No hay colchones disponibles
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Por favor, añade un colchón para que aparezca en la lista.
              </AlertDescription>
            </Alert>
          )}
        </Container>
      </Box>

      <MattressFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        formData={formData}
        isUpdating={isUpdating}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <Modal
        isActive={modal.isActive}
        title="Confirmación"
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={() =>
          setModal({ isActive: false, message: "", onConfirm: null })
        }
      />
    </Layout>
  );
};

export { Dashboard };
