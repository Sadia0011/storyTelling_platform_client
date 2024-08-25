import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryCard from '../Components/StoryCard';
import useAxiosPublic from '../useAxiosPublic';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [Loading,setLoading]=useState(true)
  const axios=useAxiosPublic()  
  useEffect(() => {
    axios.get('/api/stories/getStories')
      .then((response) => {
        setStories(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching stories:', error);
      });
  }, []);
  if (Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" loading={Loading} size={50} />
      </div>
    );
  }
  return (
    <div 
      className="relative min-h-screen overflow-hidden "
      style={{ 
        backgroundImage: `url('https://predis.ai/resources/wp-content/uploads/2022/08/pastell.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h1 className="text-4xl font-bold text-purple-800 my-6 text-center">Explore Interactive Stories</h1>
      <div className="text-center mb-8">
        <button 
          onClick={() => navigate("/create")} 
          className="bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-500 transition ease-in-out duration-300"
        >
          Create New Story
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            _id={story._id}
            title={story.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
