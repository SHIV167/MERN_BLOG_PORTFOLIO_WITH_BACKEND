import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Heading,
  Badge,
} from '@chakra-ui/react';
import PostsManager from '../components/dashboard/PostsManager';
import SkillsManager from '../components/dashboard/SkillsManager';
import VideosManager from '../components/dashboard/VideosManager';
import MessagesManager from '../components/dashboard/MessagesManager';


function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [videos, setVideos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Replace with your auth state logic if needed
    // For now, try to fetch user from localStorage or similar
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      fetchAll();
    }
    // eslint-disable-next-line
  }, []);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      
      const [postsRes, skillsRes, videosRes] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/skills'),
        fetch('/api/videos'),
      ]);
      // Fetch messages with auth header
      let messagesData = [];
      if (token) {
        const messagesRes = await fetch('/api/contact', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        messagesData = await messagesRes.json();
      }
      setPosts(await postsRes.json());
      setSkills(await skillsRes.json());
      setVideos(await videosRes.json());
      setMessages(messagesData);
      setUnreadCount(messagesData.filter(msg => msg.status === 'unread').length);
    } catch (err) {
      // Optionally handle error
    }
    setIsLoading(false);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6}>Dashboard</Heading>
      <Tabs>
        <TabList>
          <Tab>Posts</Tab>
          <Tab>Skills</Tab>
          <Tab>Videos</Tab>
          <Tab>
            Messages
            {unreadCount > 0 && (
              <Badge ml={2} colorScheme="red" borderRadius="full">
                {unreadCount}
              </Badge>
            )}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PostsManager posts={posts || []} onChange={fetchAll} />
          </TabPanel>
          <TabPanel>
            <SkillsManager skills={skills || []} onChange={fetchAll} />
          </TabPanel>
          <TabPanel>
            <VideosManager videos={videos || []} onChange={fetchAll} />
          </TabPanel>
          <TabPanel>
            <MessagesManager messages={messages} onChange={fetchAll} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default Dashboard;
