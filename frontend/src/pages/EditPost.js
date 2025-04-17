import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPost, updatePost } from "../features/posts/postsSlice";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { post, isLoading } = useSelector((state) => state.posts);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        content: post.content || "",
        category: post.category || "",
        tags: post.tags?.join(", ") || "",
        image: post.image || "",
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();
      postData.append("title", formData.title);
      postData.append("content", formData.content);
      postData.append("category", formData.category);
      postData.append("tags", formData.tags);

      if (formData.image instanceof File) {
        postData.append("image", formData.image);
      } else if (typeof formData.image === "string" && formData.image.trim()) {
        postData.append("imageUrl", formData.image);
      }

      await dispatch(updatePost({ id, postData })).unwrap();

      toast({
        title: "Success",
        description: "Post updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.md" py={8}>
        <Box>Loading...</Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <Box border="1px" borderColor="gray.200" rounded="md">
              <ReactQuill
                value={formData.content}
                onChange={handleEditorChange}
                style={{ height: "300px", marginBottom: "50px" }}
              />
            </Box>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter post category"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tags (comma-separated)</FormLabel>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags, separated by commas"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            {formData.image && typeof formData.image === "string" && (
              <Box mb={2}>
                <img
                  src={
                    formData.image.startsWith("http")
                      ? formData.image
                      : `http://localhost:5000${formData.image}`
                  }
                  alt="Current post"
                  style={{ maxHeight: "200px" }}
                />
              </Box>
            )}
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              p={1}
            />
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            type="submit"
            size="lg"
            isLoading={isLoading}>
            Update Post
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default EditPost;
