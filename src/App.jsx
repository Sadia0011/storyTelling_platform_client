import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import StoryDetail from './Pages/StoryDetail';
import CreateStory from './Pages/CreateStory';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Contact from './Pages/Contact';
import About from './Pages/About';
import AddedStory from './Pages/AddedStory';
import StoryInsights from './Pages/StoryInsights';
import PrivateRoutes from './PrivateRoutes';
import Footer from './Components/Footer';
import Update from './Pages/Update';
import Home from './Pages/Home';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stories/:id" element={<PrivateRoutes><StoryDetail /></PrivateRoutes>} />
            <Route path="/create" element={<PrivateRoutes><CreateStory /></PrivateRoutes>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/useraddedstory" element={<PrivateRoutes><AddedStory /></PrivateRoutes>} />
            <Route path="/updateStory/:id" element={<PrivateRoutes><Update /></PrivateRoutes>} />
            <Route path="/storyinsights" element={<PrivateRoutes><StoryInsights /></PrivateRoutes>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
