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
import { FaGithub, FaLinkedin, FaTwitter, FaUser, FaWhatsapp, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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
              </HStack>
            </HStack>

            <HStack spacing={3} alignItems={"center"}>
              <HStack spacing={3} display={{ base: "none", md: "flex" }}>
                <IconButton as="a" href="https://wa.me/919876543210" aria-label="WhatsApp" icon={<FaWhatsapp />} bg="green.400" color="white" borderRadius="full" boxSize="2.25rem" _hover={{ bg: 'green.500' }} />
                <IconButton as="a" href="https://linkedin.com/in/yourusername" aria-label="LinkedIn" icon={<FaLinkedinIn />} bg="blue.700" color="white" borderRadius="full" boxSize="2.25rem" _hover={{ bg: 'blue.800' }} />
                <IconButton as="a" href="https://github.com/yourusername" aria-label="GitHub" icon={<FaGithub />} bg="gray.900" color="white" borderRadius="full" boxSize="2.25rem" _hover={{ bg: 'gray.700' }} />
                <IconButton as="a" href="https://twitter.com/yourusername" aria-label="Twitter" icon={<FaTwitter />} bg="#1DA1F2" color="white" borderRadius="full" boxSize="2.25rem" _hover={{ bg: '#1A8CD8' }} />
                <IconButton as="a" href="https://youtube.com/@yourchannel" aria-label="YouTube" icon={<FaYoutube />} bg="red.500" color="white" borderRadius="full" boxSize="2.25rem" _hover={{ bg: 'red.600' }} />
              </HStack>
              <Box minW="32px" />
              <Button onClick={toggleColorMode} variant="ghost" size="sm" _hover={{}} transition="none">
                {colorMode === "light" ? <MoonIcon boxSize="2rem" /> : <SunIcon boxSize="2rem" />}
              </Button>
              {user ? (
                <Menu>
                  <MenuButton as={Button} variant="ghost" px={3} py={2} borderRadius="md" fontWeight="bold">
                    Hi, <span style={{ fontWeight: 700 }}>{user.name}</span>
                  </MenuButton>
                  <MenuList>
                    {user.isAdmin && (
                      <MenuItem as={RouterLink} to="/dashboard">Dashboard</MenuItem>
                    )}
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <IconButton as={RouterLink} to="/login" aria-label="Login" icon={<FaUser />} bg="purple.500" color="white" borderRadius="full" boxSize="2.25rem" _hover={{}} transition="none" />
              )}
              <IconButton
                size="md"
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
              />
           </HStack>
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
        zIndex={1000}
        p={0}
        style={{
          backdropFilter: 'blur(8px)',
          background: 'rgba(30, 0, 50, 0.3)',
          transition: 'background 0.3s',
        }}
      >
        <Box
          pos="fixed"
          top="0"
          left="0"
          w="100%"
          h="100vh"
          zIndex={1000}
          p={0}
          style={{
            backdropFilter: 'blur(8px)',
            background: 'rgba(30, 0, 50, 0.3)',
            transition: 'background 0.3s',
          }}>
          <Box
            position="absolute"
            left={0}
            top={0}
            h="100vh"
            w={{ base: '80%', sm: '60%', md: '400px' }}
            bg={mobileBg}
            boxShadow="2xl"
            p={4}
            style={{
              transform: 'translateX(0)',
              animation: 'slideInLeft 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            key="mobile-menu-panel"
          >
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
        </Box>
      </Box>
    )}
    <Box h="64px" />
    <style>
      {`
      @keyframes slideInLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      `}
    </style>
  </>
  );
}
