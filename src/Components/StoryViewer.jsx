import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from '../useAxiosPublic';

const StoryViewer = ({ story, userId }) => {
  const [currentSegment, setCurrentSegment] = useState(story.segments[0]);
  const [startTime, setStartTime] = useState(Date.now());
  const { user }=useContext(AuthContext);
  const userEmail=user?.email 
  const axios=useAxiosPublic()

  const handleChoice = async (choice) => {
    const endTime = Date.now();
    const timeSpent = endTime - startTime;

    // user interaction
    await axios.post('/api/stories/interaction', {
      storyId: story._id,
      userEmail:userEmail,
      segmentId: currentSegment.id,
      choiceText: choice.text,
      timeSpent
    });

    const nextSegment = story.segments.find(segment => segment.id === choice.nextSegmentId);
    if (nextSegment) {
      setCurrentSegment(nextSegment);
      setStartTime(Date.now());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-8">
      <div className="bg-white text-black rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-4xl font-bold text-center mb-6">{story.title}</h2>
        <p className="text-lg text-center mb-6">{currentSegment.content}</p>
        <div className="flex flex-col items-center">
          {currentSegment.choices.length > 0 ? (
            currentSegment.choices.map((choice, index) => (
              <button
                key={index}
                className="btn bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg mt-4 w-full transition ease-in-out duration-300"
                onClick={() => handleChoice(choice)}
              >
                {choice.text}
              </button>
            ))
          ) : (
            <p className="text-lg text-center mt-4 font-semibold">The End</p>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
