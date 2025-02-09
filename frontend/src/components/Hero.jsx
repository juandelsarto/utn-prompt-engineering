import { Box, Heading } from "@chakra-ui/react";
import banner from "../assets/banner.jpg";

const Hero = () => {
  return (
    <Box
      overflow="hidden"
      position="relative"
      h={360}
      backgroundImage={banner}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.500"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading fontSize={48} color="white">
          Bienvenido a nuestra tienda
        </Heading>
      </Box>
    </Box>
  );
};

export { Hero };
