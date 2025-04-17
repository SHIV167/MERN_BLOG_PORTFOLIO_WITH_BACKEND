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
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/testimonials">Testimonials</Link>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Support
            </Text>
            <Stack>
              <Link href="/help">Help Center</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/legal">Legal</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/status">Status</Link>
            </Stack>
          </Stack>

          <Stack flex={1} spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Stay Connected
            </Text>
            <Stack>
              <Link href="https://github.com" isExternal>
                GitHub
              </Link>
              <Link href="https://discord.com" isExternal>
                Discord
              </Link>
              <Link href="https://twitter.com" isExternal>
                Twitter
              </Link>
              <Link href="https://linkedin.com" isExternal>
                LinkedIn
              </Link>
              <Link href="https://instagram.com" isExternal>
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
              <Link href="mailto:contact@shivjha.dev">contact@shivjha.dev</Link>
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
            <Link href="https://github.com" isExternal>
              <FaGithub size={20} />
            </Link>
            <Link href="https://linkedin.com" isExternal>
              <FaLinkedin size={20} />
            </Link>
            <Link href="https://twitter.com" isExternal>
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <FaInstagram size={20} />
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
