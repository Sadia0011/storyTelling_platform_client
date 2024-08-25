import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdDeleteForever } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import useAxiosPublic from '../useAxiosPublic';

const AddedStory = () => {
  const [stories, setStories] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate=useNavigate()
  const axios=useAxiosPublic()
  useEffect(() => {
    if (user?.email) {
      axios.get(`/api/stories/userstories?email=${user.email}`)
        .then(response => {
          setStories(response.data);
        })
        .catch(error => {
          console.error('Error fetching user stories:', error);
        });
    }
  }, [user]);

  const handleDelete = async (storyId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
          await axios.delete(`/api/stories/deleteStory/${storyId}`);
          setStories(stories.filter(story => story._id !== storyId));
            Swal.fire(
              'Deleted!',
              'Your story has been deleted.',
              'success'
            ); 
      }
    });
  };

  const handleUpdate = (storyId) => {
    navigate(`/updateStory/${storyId}`);
  };

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl mb-4">My Added Stories</h1>
    {stories.length === 0 ? (
      <p>No stories added yet.</p>
    ) : (
      <ul>
        {stories.map(story => (
          <li key={story._id} className="mb-4 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold">{story.title}</h2>
            <p className="text-gray-600">Created at: {new Date(story.createdAt).toLocaleDateString()}</p>
            <p>{story.segments[0]?.content}</p> 
            <div className="mt-4">
              <button
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 mr-2"
                onClick={() => navigate(`/stories/${story._id}`)}
              >
                View Full Story
              </button>
              <button
                className=" py-2 px-4 rounded  mr-2"
                onClick={() => handleUpdate(story._id)}
              >
                <RiEdit2Fill className='text-yellow-500 text-2xl hover:text-4xl'/>
              </button>
              <button
                className="  py-2 px-4 rounded "
                onClick={() => handleDelete(story._id)}
              >
                <MdDeleteForever className='text-red-500 text-2xl hover:text-4xl'/>
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default AddedStory;
