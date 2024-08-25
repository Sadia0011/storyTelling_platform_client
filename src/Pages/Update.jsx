import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import UpdateStoryForm from '../Components/UpdateStoryForm';
import useAxiosPublic from '../useAxiosPublic';

const Update = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const navigate = useNavigate();
    const axios=useAxiosPublic()
    useEffect(() => {
      // Fetch the story details
      axios.get(`/api/stories/getStoryById/${id}`)
        .then(response => {
          setStory(response.data);
        })
        .catch(error => {
          console.error('Error fetching story:', error);
        });
    }, [id]);
  
    const handleUpdateStory = (updatedStory) => {
      axios.patch(`/api/stories/updateStory/${id}`, updatedStory)
        .then((response) => {
          console.log('Story updated:', response.data);
          toast.success("Story updated successfully!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          console.error('Error updating story:', error);
        });
    };
  
    if (!story) return <p>Loading...</p>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl mb-4">Update Story</h1>
        <UpdateStoryForm onSubmit={handleUpdateStory} userEmail={story.email} initialValues={story} />
        <ToastContainer />
      </div>
    );
  };

export default Update;
