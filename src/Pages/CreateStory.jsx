import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateStoryForm from '../Components/CreateStoryForm';
import { AuthContext } from '../Provider/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosPublic from '../useAxiosPublic';

const CreateStory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axios=useAxiosPublic()
  const handleCreateStory = (story) => {
    axios.post('/api/stories/createStory', story)
      .then((response) => {
        console.log('Story created:', response.data);
        toast.success("Congratulations you have created a story")
        setTimeout(() => {
          navigate( "/");
        }, 2000);
      })
      .catch((error) => {
        console.error('Error creating story:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Create New Story</h1>
      <CreateStoryForm onSubmit={handleCreateStory} userEmail={user?.email} />
      <ToastContainer/>
    </div>
  );
};

export default CreateStory;
