import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/PostDetail";
import EditPost from "./pages/EditPost";
import CreatePost from "./pages/CreatePost";
import CreateSkill from "./pages/CreateSkill";
import EditSkill from "./pages/EditSkill";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import CreateVideo from "./pages/CreateVideo";
import EditVideo from "./pages/EditVideo";
import Contact from "./pages/Contact";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Header />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<PostDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/posts/create"
                element={
                  <AdminRoute>
                    <CreatePost />
                  </AdminRoute>
                }
              />
              <Route
                path="/posts/edit/:id"
                element={
                  <AdminRoute>
                    <EditPost />
                  </AdminRoute>
                }
              />
              <Route
                path="/skills/create"
                element={
                  <AdminRoute>
                    <CreateSkill />
                  </AdminRoute>
                }
              />
              <Route
                path="/skills/edit/:id"
                element={
                  <AdminRoute>
                    <EditSkill />
                  </AdminRoute>
                }
              />
              <Route
                path="/projects/create"
                element={
                  <AdminRoute>
                    <CreateProject />
                  </AdminRoute>
                }
              />
              <Route
                path="/projects/edit/:id"
                element={
                  <AdminRoute>
                    <EditProject />
                  </AdminRoute>
                }
              />
              <Route
                path="/videos/create"
                element={
                  <AdminRoute>
                    <CreateVideo />
                  </AdminRoute>
                }
              />
              <Route
                path="/videos/edit/:id"
                element={
                  <AdminRoute>
                    <EditVideo />
                  </AdminRoute>
                }
              />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
