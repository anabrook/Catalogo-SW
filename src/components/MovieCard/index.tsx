import {
  BiCalendar,
  BiCameraMovie,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Slider, { Settings } from "react-slick";

import Image from "next/image";
import React from "react";
import { useAnimate } from "framer-motion";
import useMovies from "@/services/useMovies";
import { useSelectedMovie } from "@/jotai/selectedMovie";

// import { Container } from './styles';

const settings: Settings = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 4,
  centerPadding: "60px",
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        arrows: true,
        centerMode: true,
        centerPadding: "40px",
        slidesToShow: 1,
      },
    },
  ],
};

const MovieCard: React.FC = () => {
  const [scope, animate] = useAnimate();
  const [position, setPosition] = React.useState(0);
  const { data = [], isLoading } = useMovies();
  const [slider, setSlider] = React.useState<Slider | null>(null);
  const [movie, selectedMovie] = useSelectedMovie();

  const { colorMode } = useColorMode();

  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "10px" });

  const scrollRight = () => {
    slider?.slickNext();
  };

  const scrollLeft = () => {
    slider?.slickPrev();
  };
  console.log(data);

  return (
    <Container maxW={"8xl"} mb={10}>
      <Stack
        as={Box}
        textAlign={"center"}
        spacing={{ base: 8, md: 14 }}
        padding={8}
      >
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "4px solid",
            borderColor: useColorModeValue("gray.600", "gray.200"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "4px solid",
            borderColor: useColorModeValue("gray.600", "gray.200"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          >
            Movies
          </Heading>
        </Flex>
      </Stack>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      {isLoading ? (
        <Spinner />
      ) : (
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {data.map((movie, index) => (
            <Box
              onClick={() => selectedMovie(movie.episode_id.toString())}
              style={{ cursor: "pointer" }}
              key={movie.episode_id}
              maxW={"330px"}
              id="teste"
              bg={colorMode === "dark" ? "gray.800" : "white"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Stack
                textAlign={"center"}
                p={6}
                color={colorMode === "dark" ? "white" : "white.800"}
                //color={useColorModeValue("gray.800", "white")}
                align={"center"}
                style={{ minHeight: "360px" }}
              >
                <Image
                  width={200}
                  height={200}
                  src={`/movie_posters/episode_${movie.episode_id}.jpg`}
                  alt="movie poster"
                />
              </Stack>
              <Stack
                textAlign={"left"}
                p={4}
                bg={"#FFC700"}
                color={colorMode === "dark" ? "white" : "white.800"}
              >
                <Text
                  fontSize={"md"}
                  fontWeight={500}
                  p={2}
                  px={3}
                  color={"gray.800"}
                  rounded={"full"}
                >
                  {movie.title}
                </Text>
              </Stack>

              <Box
                //bg={useColorModeValue("gray.50", "gray.900")}
                bg={colorMode === "dark" ? "gray.900" : "gray.50"}
                px={6}
                py={10}
              >
                <List spacing={3}>
                  <ListItem display={"flex"} flexDirection={"row"}>
                    <ListIcon
                      as={BiCalendar}
                      color={colorMode === "dark" ? "gray.50" : "gray.800"}
                      alignItems={"flex-start"}
                      mt={1}
                    />
                    <Text>
                      Data de Lançamento
                      <Text>{movie.release_date}</Text>
                    </Text>
                  </ListItem>
                  <ListItem
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"flex-start"}
                    mt={1}
                  >
                    <ListIcon
                      as={BiCameraMovie}
                      color={colorMode === "dark" ? "gray.50" : "gray.800"}
                    />
                    <Text>
                      Diretor
                      <Text> {movie.director}</Text>
                    </Text>
                  </ListItem>
                </List>
              </Box>
            </Box>
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default MovieCard;
