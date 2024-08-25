import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoryViewer from '../Components/StoryViewer';
import useAxiosPublic from '../useAxiosPublic';

const StoryDetail = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const axios=useAxiosPublic()
  useEffect(() => {
    axios.get(`/api/stories/getStoryById/${id}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching story:', error);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {story ? <StoryViewer story={story} /> : <p>Loading story...</p>}
    </div>
  );
};

export default StoryDetail;
