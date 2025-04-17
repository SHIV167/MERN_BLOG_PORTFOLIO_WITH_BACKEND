import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost } from "../features/posts/postsSlice";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

function BlogPost() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.posts);
  const bgColor = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    if (slug) {
      dispatch(getPost(slug));
    }
  }, [dispatch, slug]);

  if (isLoading || !post) {
    return (
      <Container maxW={"7xl"} py={12}>
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"} py={12}>
      <Box bg={bgColor} boxShadow={"2xl"} rounded={"md"} p={6} overflow={"hidden"}>
        {post.image && (
          <Box h={"400px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
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
          <Heading color={headingColor} fontSize={"4xl"} fontFamily={"body"}>
            {post.title}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"} mb={4}>
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{post.author?.name}</Text>
              <Text color={"gray.500"}>
                {new Date(post.createdAt).toLocaleDateString()}
              </Text>
            </Stack>
          </Stack>
          <Text color={"gray.500"} whiteSpace="pre-wrap">
            {post.content}
          </Text>
        </Stack>
      </Box>
    </Container>
  );
}

export default BlogPost;
