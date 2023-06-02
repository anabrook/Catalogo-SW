import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Input,
  Link,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  Search2Icon,
} from "@chakra-ui/icons";

import Image from "next/image";
import { Movie } from "@/types/Movies";
import useMovies from "@/services/useMovies";
import { useQueryClient } from "react-query";
import { useState } from "react";
import { useMovieSearch } from "@/jotai/movieSearch";

const Search = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [search, setSearch] = useMovieSearch();
  // make a function that filters the

  const makeSearch = () => {
    setSearch(text);
  };

  return (
    <Flex flexDir={"row"} gap={2}>
      <Input
        placeholder="Buscar"
        width={200}
        onChange={(e) => setText(e?.target?.value ?? "")}
      />
      <IconButton
        icon={<Search2Icon />}
        aria-label="Buscar"
        onClick={() => makeSearch()}
      />
    </Flex>
  );
};

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box w={"100%"}>
      <Flex
        bg={useColorModeValue("gray.800", "white")}
        color={useColorModeValue("white", "gray.600")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            color={useColorModeValue("white", "gray.800")}
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          ml={20}
          justify={{ base: "center", md: "start" }}
        >
          <Image
            src={"/img/star-wars-4.svg"}
            width={120}
            height={120}
            alt="Star Wars Logo"
          />
        </Flex>

        <Search />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      id="mobile-nav"
      bg={useColorModeValue("gray.800", "white")}
      p={4}
      display={{ md: "none" }}
      color={useColorModeValue("white", "gray.600")}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Search />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
];
