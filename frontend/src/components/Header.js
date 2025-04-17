import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  IconButton,
  useDisclosure,
  HStack,
  CloseButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Container,
  Link as ChakraLink,
} from "@chakra-ui/react";

import {
  MoonIcon,
  SunIcon,
  HamburgerIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// Add this import at the top with other imports
import { Link as RouterLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileBg = useColorModeValue("white", "gray.900");

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.900")}
        px={4}
        position="fixed"
        w="100%"
        top={0}
        zIndex={999}
        borderBottom="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        boxShadow="sm">
        <Container maxW="6xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={<HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={onOpen}
            />

            <HStack spacing={8} alignItems={"center"}>
              <RouterLink to="/">
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  bgGradient="linear(to-r, purple.500, purple.300)"
                  bgClip="text">
                  SHIV JHA
                </Text>
              </RouterLink>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}>
                <RouterLink to="/">
                  <Button variant="ghost">Home</Button>
                </RouterLink>
                <RouterLink to="/projects">
                  <Button variant="ghost">Projects</Button>
                </RouterLink>
                <RouterLink to="/blog">
                  <Button variant="ghost">Blog</Button>
                </RouterLink>
                <RouterLink to="/contact">
                  <Button variant="ghost">Contact</Button>
                </RouterLink>
              </HStack>
            </HStack>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={3} align="center">
                {/* Social Icons */}
                <HStack spacing={2} display={{ base: "none", md: "flex" }}>
                  <ChakraLink href="https://github.com/yourusername" isExternal>
                    <IconButton
                      aria-label="GitHub"
                      icon={<FaGithub />}
                      size="sm"
                      variant="ghost"
                    />
                  </ChakraLink>
                  <ChakraLink
                    href="https://linkedin.com/in/yourusername"
                    isExternal>
                    <IconButton
                      aria-label="LinkedIn"
                      icon={<FaLinkedin />}
                      size="sm"
                      variant="ghost"
                    />
                  </ChakraLink>
                  <ChakraLink
                    href="https://twitter.com/yourusername"
                    isExternal>
                    <IconButton
                      aria-label="Twitter"
                      icon={<FaTwitter />}
                      size="sm"
                      variant="ghost"
                    />
                  </ChakraLink>
                </HStack>

                <Button onClick={toggleColorMode} variant="ghost" size="sm">
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                {user ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="ghost"
                      size="sm">
                      {user.name}
                    </MenuButton>
                    <MenuList>
                      {user.isAdmin && (
                        <MenuItem as={RouterLink} to="/dashboard">
                          Dashboard
                        </MenuItem>
                      )}
                      <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <RouterLink to="/resume">
                    <Button
                      size="sm"
                      colorScheme="purple"
                      fontWeight="normal"
                      px={6}>
                      Resume
                    </Button>
                  </RouterLink>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Mobile menu */}
      {isOpen && (
        <Box
          pos="fixed"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          bg={mobileBg}
          zIndex={1000}
          p={4}>
          <Flex direction="column" h="full">
            <Flex justify="space-between" align="center" mb={8}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                bgGradient="linear(to-r, purple.500, purple.300)"
                bgClip="text">
                SHIV JHA
              </Text>
              <CloseButton onClick={onClose} />
            </Flex>
            <Stack spacing={4}>
              <RouterLink to="/" onClick={onClose}>
                <Button w="full" variant="ghost" justifyContent="flex-start">
                  Home
                </Button>
              </RouterLink>
              <RouterLink to="/projects" onClick={onClose}>
                <Button w="full" variant="ghost" justifyContent="flex-start">
                  Projects
                </Button>
              </RouterLink>
              <RouterLink to="/blog" onClick={onClose}>
                <Button w="full" variant="ghost" justifyContent="flex-start">
                  Blog
                </Button>
              </RouterLink>
              <RouterLink to="/contact" onClick={onClose}>
                <Button w="full" variant="ghost" justifyContent="flex-start">
                  Contact
                </Button>
              </RouterLink>
            </Stack>
          </Flex>
        </Box>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <Box h="64px" />
    </>
  );
}
