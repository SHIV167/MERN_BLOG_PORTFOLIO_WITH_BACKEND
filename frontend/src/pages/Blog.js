import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/posts/postsSlice";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  Stack,
  useColorModeValue,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const bgColor = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Container maxW={"7xl"} py={12}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"} py={12}>
      <Heading as="h1" mb={8}>
        Blog Posts
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {posts.map((post) => (
          <Box
            key={post._id}
            maxW={"445px"}
            w={"full"}
            bg={bgColor}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}>
            {post.image && (
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}>
                <Image
                  src={`${process.env.REACT_APP_BACKEND_URL}${post.image}`}
                  layout={"fill"}
                  alt={post.title}
                  objectFit="cover"
                />
              </Box>
            )}
            <Stack>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}>
                {post.category}
              </Text>
              <Heading
                color={headingColor}
                fontSize={"2xl"}
                fontFamily={"body"}>
                {post.title}
              </Heading>
              <Text color={"gray.500"}>
                {post.content.substring(0, 150)}...
              </Text>
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{post.author.name}</Text>
                <Text color={"gray.500"}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Text>
              </Stack>
            </Stack>
            <Button
              as={Link}
              to={`/blog/${post.slug}`}
              mt={4}
              colorScheme="blue"
              variant="outline">
              Read More
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default Blog;
