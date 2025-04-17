import React from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  useColorModeValue,
  Image,
  SimpleGrid,
  VStack,
  HStack,
  Tag,
  Progress,
  Link as ChakraLink,
  AspectRatio,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaLaptopCode,
  FaYoutube,
} from "react-icons/fa";
import { getSkills } from "../features/skills/skillsSlice";
import { getFeaturedProjects } from "../features/projects/projectsSlice";
import { getFeaturedVideos } from "../features/youtube/youtubeSlice";
import { getPosts } from "../features/posts/postsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const MotionBox = motion(Box);

const Home = () => {
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skills || { skills: [] });
  const { projects } = useSelector((state) => state.projects || { projects: [] });
  const { videos } = useSelector((state) => state.youtube || { videos: [] });
  const { posts = [] } = useSelector((state) => state.posts || { posts: [] });

  const bgGradient = useColorModeValue(
    "linear(to-r, blue.100, purple.100)",
    "linear(to-r, blue.900, purple.900)"
  );
  const textColor = useColorModeValue("gray.800", "white");
  const buttonColorScheme = useColorModeValue("purple", "blue");
  const sectionBg = useColorModeValue("white", "gray.800");
  const postBg = useColorModeValue("white", "gray.800");
  const postTextColor = useColorModeValue("gray.600", "gray.400");

  useEffect(() => {
    dispatch(getSkills());
    dispatch(getFeaturedProjects());
    dispatch(getFeaturedVideos());
    dispatch(getPosts());
  }, [dispatch]);

  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  const backgroundVariants = {
    animate: {
      background: [
        "radial-gradient(circle at 0% 0%, rgba(0,0,255,0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 100% 100%, rgba(128,0,128,0.1) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 50%, rgba(75,0,130,0.1) 0%, transparent 50%)",
      ],
      transition: {
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  const codeAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0, 1, 1, 0],
      scale: [0.8, 1, 1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <Box>
      {/* Hero Section */}
      <MotionBox
        minH="calc(100vh - 64px)"
        bgGradient={bgGradient}
        position="relative"
        overflow="hidden"
      >
        <MotionBox
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          variants={backgroundVariants}
          animate="animate"
        />

        {/* Floating Code Symbols */}
        <MotionBox
          position="absolute"
          variants={codeAnimation}
          initial="initial"
          animate="animate"
          fontSize="6xl"
          color="whiteAlpha.300"
          top="20%"
          left="10%"
        >
          <FaCode />
        </MotionBox>
        <MotionBox
          position="absolute"
          variants={codeAnimation}
          initial="initial"
          animate="animate"
          fontSize="8xl"
          color="whiteAlpha.200"
          bottom="30%"
          right="15%"
        >
          <FaLaptopCode />
        </MotionBox>

        <Container maxW="container.xl" position="relative">
          <Stack
            spacing={8}
            alignItems="center"
            textAlign="center"
            py={{ base: 20, md: 36 }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading
                as="h1"
                size="2xl"
                color={textColor}
                mb={4}
                fontWeight="bold"
              >
                Welcome to My Portfolio
              </Heading>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Text fontSize="xl" color={textColor} mb={8}>
                I'm a Full Stack Developer specializing in
                <Box as="span" color="blue.500" ml={2}>
                  <Typewriter
                    options={{
                      strings: [
                        "React",
                        "Node.js",
                        "MongoDB",
                        "Express",
                        "TypeScript",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </Box>
              </Text>
            </MotionBox>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <Button
                  as={Link}
                  to="/projects"
                  size="lg"
                  colorScheme={buttonColorScheme}
                >
                  View Projects
                </Button>
                <Button
                  as={Link}
                  to="/contact"
                  size="lg"
                  variant="outline"
                  colorScheme={buttonColorScheme}
                >
                  Contact Me
                </Button>
              </Stack>
            </MotionBox>
          </Stack>
        </Container>
      </MotionBox>

      {/* Skills Section */}
      <Box bg={sectionBg} py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">
            My Skills
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <SkillCard key={category} title={category} skills={skills} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Projects Section */}
      <Box bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">
            Featured Projects
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {projects?.slice(0, 3).map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                demoLink={project.demoLink}
                githubLink={project.githubLink}
              />
            ))}
          </SimpleGrid>
          <Box textAlign="center" mt={8}>
            <Button
              as={Link}
              to="/projects"
              size="lg"
              colorScheme={buttonColorScheme}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Blog Posts Section */}
      <Box bg={sectionBg} py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">
            Latest Blog Posts
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {posts?.slice(0, 3).map((post) => (
              <Box
                key={post._id}
                bg={postBg}
                p={6}
                rounded="lg"
                boxShadow="lg"
              >
                <VStack align="start" spacing={4}>
                  {/* Show blog post image if available, else fallback */}
                  <Image
                    src={post.image || "/post-placeholder.jpg"}
                    alt={post.title}
                    h={180}
                    w="full"
                    objectFit="cover"
                    rounded="md"
                  />
                  <Heading size="md">{post.title}</Heading>
                  <Text color={postTextColor}>{post.excerpt || post.content?.slice(0, 100) + "..."}</Text>
                  <Button
                    as={Link}
                    to={`/blog/${post.slug || post._id}`}
                    variant="link"
                    colorScheme="blue"
                  >
                    Read More →
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
          <Box textAlign="center" mt={8}>
            <Button
              as={Link}
              to="/blog"
              size="lg"
              colorScheme={buttonColorScheme}
            >
              View All Posts
            </Button>
          </Box>
        </Container>
      </Box>


      {/* Videos Section */}
      <Box bg={useColorModeValue("gray.50", "gray.900")} py={20}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" mb={12} textAlign="center">
            Featured Videos
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {videos?.slice(0, 3).map((video) => (
              <VideoCard
                key={video._id}
                title={video.title}
                description={video.description}
                videoId={video.videoId}
                category={video.category}
              />
            ))}
          </SimpleGrid>
          <Box textAlign="center" mt={8}>
            <Button
              as={ChakraLink}
              href="https://youtube.com"
              isExternal
              size="lg"
              colorScheme={buttonColorScheme}
              rightIcon={<FaYoutube />}
            >
              Visit YouTube Channel
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const SkillCard = ({ title, skills }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={6}
      rounded="lg"
      boxShadow="lg"
    >
      <VStack align="start" spacing={4} width="100%">
        <Heading size="md">{title}</Heading>
        <VStack spacing={4} width="100%">
          {skills.map((skill) => (
            <Box key={skill._id} width="100%">
              <HStack justify="space-between" mb={2}>
                <Text>{skill.name}</Text>
                <Text>{skill.level}%</Text>
              </HStack>
              <Progress
                value={skill.level}
                colorScheme="blue"
                size="sm"
                rounded="full"
              />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  demoLink,
  githubLink,
}) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      rounded="lg"
      boxShadow="lg"
      overflow="hidden"
    >
      <Image
        src={image || "/project-placeholder.jpg"}
        alt={title}
        h={200}
        w="full"
        objectFit="cover"
      />
      <Box p={6}>
        <VStack align="start" spacing={3}>
          <Heading size="md">{title}</Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {description}
          </Text>
          <Stack direction="row" wrap="wrap" spacing={2}>
            {tags &&
              tags.map((tag) => (
                <Tag key={tag} colorScheme="blue">
                  {tag}
                </Tag>
              ))}
          </Stack>
          <HStack spacing={4}>
            {demoLink && (
              <ChakraLink href={demoLink} isExternal>
                <Button
                  leftIcon={<FaExternalLinkAlt />}
                  size="sm"
                  colorScheme="blue"
                  variant="outline"
                >
                  Demo
                </Button>
              </ChakraLink>
            )}
            {githubLink && (
              <ChakraLink href={githubLink} isExternal>
                <Button
                  leftIcon={<FaGithub />}
                  size="sm"
                  colorScheme="gray"
                  variant="outline"
                >
                  Code
                </Button>
              </ChakraLink>
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const VideoCard = ({ title, description, videoId, category }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      rounded="lg"
      boxShadow="lg"
      overflow="hidden"
    >
      <AspectRatio ratio={16 / 9}>
        <iframe
          title={title}
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      </AspectRatio>
      <Box p={6}>
        <VStack align="start" spacing={3}>
          <Heading size="md">{title}</Heading>
          <Text color={useColorModeValue("gray.600", "gray.400")}>
            {description}
          </Text>
          <Tag colorScheme="blue">{category}</Tag>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;
