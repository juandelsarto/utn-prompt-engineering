import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import defaultImage from "../assets/no-image-placeholder.svg";
import { Layout } from "../components/Layout";
import { ORDER_STATUS, ORDER_STATUS_COLORS } from "../constants/orders";
import { getOrder, getOrders, updateOrderStatus } from "../services/order";
import { formatPrice } from "../utilities/formatPrice";

export function Orders() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Query for fetching orders
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    onError: (error) => {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
    refetchOnWindowFocus: false,
  });

  // Query for fetching single order details
  const { data: orderDetails } = useQuery({
    queryKey: ["order", selectedOrder],
    queryFn: () => getOrder(selectedOrder),
    enabled: !!selectedOrder,
    onError: (error) => {
      console.error("Error fetching order details:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los detalles del pedido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Mutation for updating order status
  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast({
        title: "Éxito",
        description: "Estado del pedido actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Invalidate and refetch orders after successful update
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del pedido",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleStatusChange = (orderId, status) => {
    updateStatusMutation.mutate({ orderId, status });
  };

  const handleOpenModal = (orderId) => {
    setSelectedOrder(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <Layout>
      <Box py={8} overflowX="auto">
        <Container maxW="container.xl">
          <Heading>Mis Pedidos</Heading>
          <Container maxW="container.xl" py={8}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Fecha</Th>
                  <Th>Cliente</Th>
                  <Th>Total</Th>
                  <Th>Estado</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <Tr key={order._id}>
                      <Td>
                        {dayjs(order.createdAt).format("DD/MM/YYYY - HH:MM")}
                      </Td>
                      <Td>{order.customer.name}</Td>
                      <Td>{formatPrice(order.total)}</Td>
                      <Td>
                        <Badge colorScheme={ORDER_STATUS_COLORS[order.status]}>
                          {ORDER_STATUS[order.status]}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={4}>
                          <Select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            size="sm"
                            width="200px"
                            isDisabled={updateStatusMutation.isPending}
                          >
                            {Object.keys(ORDER_STATUS).map((status) => (
                              <option key={status} value={status}>
                                {ORDER_STATUS[status]}
                              </option>
                            ))}
                          </Select>
                          <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={() => handleOpenModal(order._id)}
                          >
                            Ver detalles
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={5} textAlign="center">
                      No hay pedidos
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Container>
        </Container>
      </Box>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalles del Pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {orderDetails && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Text fontWeight="bold">Cliente:</Text>
                  <Text>{orderDetails.customer.name}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Estado:</Text>
                  <Badge colorScheme={ORDER_STATUS_COLORS[orderDetails.status]}>
                    {ORDER_STATUS[orderDetails.status]}
                  </Badge>
                </Box>
                <Box>
                  <Text fontWeight="bold">Productos:</Text>
                  {orderDetails.items.map((item) => (
                    <HStack key={item._id} spacing={4} py={2}>
                      <Image
                        src={
                          item.productId.image !== ""
                            ? item.productId.image
                            : defaultImage
                        }
                        alt={item.productId.name}
                        boxSize="100px"
                        objectFit="cover"
                      />
                      <VStack align="start" flex={1}>
                        <Text fontWeight="bold">{item.productId.name}</Text>
                        <Text>{item.productId.description}</Text>
                        <Text>Cantidad: {item.quantity}</Text>
                        <Text>Precio: {formatPrice(item.price)}</Text>
                      </VStack>
                    </HStack>
                  ))}
                </Box>
                <Box>
                  <Text fontWeight="bold">Dirección de envío:</Text>
                  <Text>{orderDetails.customer.direction}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Total:</Text>
                  <Text fontWeight="semibold">
                    {formatPrice(orderDetails.total)}
                  </Text>
                </Box>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
