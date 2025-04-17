import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgGradient={useColorModeValue(
        "linear(to-r, purple.100, blue.100)",
        "linear(to-r, purple.900, blue.900)"
      )}
      py={8}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 8, md: 16 }}>
          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Company
            </Text>
            <Stack>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/about">About</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/blog">Blog</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/contact">Contact</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/pricing">Pricing</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/testimonials">Testimonials</Link>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Support
            </Text>
            <Stack>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/help">Help Center</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/terms">Terms of Service</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/legal">Legal</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/privacy">Privacy Policy</Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="/status">Status</Link>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Stay Connected
            </Text>
            <Stack>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://github.com" isExternal>
                GitHub
              </Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://discord.com" isExternal>
                Discord
              </Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://twitter.com" isExternal>
                Twitter
              </Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://linkedin.com" isExternal>
                LinkedIn
              </Link>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://instagram.com" isExternal>
                Instagram
              </Link>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Get in Touch
            </Text>
            <Stack>
              <Text>New Delhi, India</Text>
              <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="mailto:contact@shivjha.dev">contact@shivjha.dev</Link>
              <Text>+91 (123) 456-7890</Text>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          pt={8}
          mt={8}
          borderTopWidth={1}
          borderTopColor={useColorModeValue("gray.200", "gray.700")}>
          <Text>© 2024 Shiv Jha. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://github.com" isExternal>
              <FaGithub size="2rem" size={20} />
            </Link>
            <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://linkedin.com" isExternal>
              <FaLinkedin size="2rem" size={20} />
            </Link>
            <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://twitter.com" isExternal>
              <FaTwitter size="2rem" size={20} />
            </Link>
            <Link _hover={{ transform: 'scale(1.18)', color: 'purple.400', boxShadow: '0 4px 20px rgba(162, 89, 247, 0.18)' }} transition="all 0.2s" href="https://instagram.com" isExternal>
              <FaInstagram size="2rem" size={20} />
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
