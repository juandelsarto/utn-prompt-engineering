import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App.jsx";
import { AuthProvider } from "./context/auth.jsx";
import "./index.css";

const queryClient = new QueryClient();

const customTheme = extendTheme({
  colors: {
    primary: {
      50: "#e8eff0",
      100: "#c1ced1",
      200: "#c0cdcf",
      300: "#bfccce",
      400: "#c5d0d3",
      500: "#c2cfd2", // Color principal
      600: "#a1b2b5",
      700: "#7f9194",
      800: "#5d7073",
      900: "#3b4f52",
    },
    gray: {
      100: "#eeeeee",
    },
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
