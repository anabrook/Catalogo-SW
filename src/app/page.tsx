"use client";
import {
  Flex,
  ChakraProvider,
  extendTheme,
  type ThemeConfig,
  useColorMode,
} from "@chakra-ui/react";
import Navegation from "../components/Navbar";
import styles from "./page.module.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "@/components/MovieCard";
import { QueryClient, QueryClientProvider } from "react-query";
import FeatureCard from "@/components/FeatureCard";

// 1. import `extendTheme` function
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c",
    },
  },
});

const queryClient = new QueryClient();

export default function Home() {
  const colorMode = useColorMode();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Flex flexDirection={"column"}>
          <Navbar />
          <MovieCard />
          <FeatureCard />
        </Flex>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
