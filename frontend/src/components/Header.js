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
import { FaGithub, FaLinkedin, FaTwitter, FaUser } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Inject animated border keyframes for Resume button
if (typeof document !== 'undefined' && !document.getElementById('resume-animate-style')) {
  const style = document.createElement('style');
  style.id = 'resume-animate-style';
  style.innerHTML = `
    @keyframes gradient-border {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  document.head.appendChild(style);
}

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
                <ChakraLink
                  href="https://shivjha.online/wp-content/uploads/2025/02/SHIV_KUMAR_JHA_DEC_2024_LATEST.pdf"
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    px={6}
                    position="relative"
                    className="animated-resume-btn"
                    bg="white"
                    color="purple.600"
                    fontWeight="bold"
                    borderRadius="md"
                    boxShadow="md"
                    borderWidth="2px"
                    borderStyle="solid"
                    borderColor="transparent"
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-4px',
                      left: '-4px',
                      right: '-4px',
                      bottom: '-4px',
                      borderRadius: 'md',
                      zIndex: 0,
                      background: 'linear-gradient(90deg, #a259f7, #f953c6, #43e97b 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-border 2s linear infinite',
                    }}
                    _after={{
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 'md',
                      zIndex: 1,
                      background: 'white',
                    }}
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      overflow: 'hidden',
                      fontSize: 'md',
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    <Box as="span" position="relative" zIndex={3}>
                      Resume
                    </Box>
                  </Button>
                </ChakraLink>
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
                  <IconButton
                    as={RouterLink}
                    to="/login"
                    aria-label="Login"
                    icon={<FaUser />}
                    size="md"
                    colorScheme="purple"
                    variant="ghost"
                  />
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
              <ChakraLink
                href="https://shivjha.online/wp-content/uploads/2025/02/SHIV_KUMAR_JHA_DEC_2024_LATEST.pdf"
                isExternal
                _hover={{ textDecoration: 'none' }}
                w="full"
              >
                <Button
                  w="full"
                  variant="ghost"
                  px={6}
                  position="relative"
                  className="animated-resume-btn"
                  justifyContent="flex-start"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-3px',
                    left: '-3px',
                    right: '-3px',
                    bottom: '-3px',
                    borderRadius: 'md',
                    zIndex: 0,
                    background: 'linear-gradient(90deg, #a259f7, #f953c6, #43e97b 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-border 2s linear infinite',
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 'md',
                    zIndex: 1,
                    background: 'white',
                  }}
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'transparent',
                    color: 'purple.600',
                    fontWeight: 'bold',
                    overflow: 'hidden',
                  }}
                >
                  <Box as="span" position="relative" zIndex={3}>
                    Resume
                  </Box>
                </Button>
              </ChakraLink>
            </Stack>
          </Flex>
        </Box>
      )}

      {/* Spacer to prevent content from going under fixed header */}
      <Box h="64px" />
    </>
  );
}
