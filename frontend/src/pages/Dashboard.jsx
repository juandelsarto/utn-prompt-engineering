import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Layout } from "../components/Layout";
import { Modal } from "../components/Modal";
import {
  addMattress,
  deleteMattress,
  getAllMattresses,
  updateMattress,
} from "../services/mattress.js";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    dimensions: "",
    material: "",
    price: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [modal, setModal] = useState({
    isActive: false,
    message: "",
    onConfirm: null,
  });

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
    if (isUpdating) {
      await updateMattress(formData._id, formData);
      showToast("Mattress updated successfully!", "success");
    } else {
      await addMattress(formData);
      showToast("Mattress added successfully!", "success");
    }
    setFormData({ name: "", dimensions: "", material: "", price: "" });
    setIsUpdating(false);
    queryClient.invalidateQueries(["mattresses"]);
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
          <Heading mb={6}>Dashboard</Heading>

          <Box as="form" onSubmit={handleSubmit} mb={8}>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Dimensions</FormLabel>
                <Input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Material</FormLabel>
                <Input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>

              <Button type="submit" colorScheme="blue">
                {isUpdating ? "Update Mattress" : "Add Mattress"}
              </Button>
            </VStack>
          </Box>

          {mattresses.length > 0 ? (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Dimensions</Th>
                  <Th>Material</Th>
                  <Th>Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {mattresses.map((mattress) => (
                  <Tr key={mattress._id}>
                    <Td>{mattress.name}</Td>
                    <Td>{mattress.dimensions}</Td>
                    <Td>{mattress.material}</Td>
                    <Td>${mattress.price}</Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => handleEdit(mattress)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDelete(mattress._id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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

      <Modal
        isActive={modal.isActive}
        title="Confirmation"
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
