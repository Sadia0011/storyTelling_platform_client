import React, { useState } from 'react';

const CreateStoryForm = ({ onSubmit, userEmail }) => {
  const [title, setTitle] = useState('');
  const [segments, setSegments] = useState([{ id: 'segment1', content: '', choices: [] }]);

  const handleAddSegment = () => {
    const newSegmentId = `segment${segments.length + 1}`;
    setSegments([...segments, { id: newSegmentId, content: '', choices: [] }]);
  };

  const handleRemoveSegment = (segmentIndex) => {
    const newSegments = segments.filter((segment, index) => index !== segmentIndex);
    setSegments(newSegments);
  };

  const handleAddChoice = (segmentIndex) => {
    const newSegments = [...segments];
    newSegments[segmentIndex].choices.push({ text: '', nextSegmentId: '' });
    setSegments(newSegments);
  };

  const handleRemoveChoice = (segmentIndex, choiceIndex) => {
    const newSegments = [...segments];
    newSegments[segmentIndex].choices = newSegments[segmentIndex].choices.filter((choice, index) => index !== choiceIndex);
    setSegments(newSegments);
  };

  const handleSegmentChange = (index, field, value) => {
    const newSegments = [...segments];
    newSegments[index][field] = value;
    setSegments(newSegments);
  };

  const handleChoiceChange = (segmentIndex, choiceIndex, field, value) => {
    const newSegments = [...segments];
    newSegments[segmentIndex].choices[choiceIndex][field] = value;
    setSegments(newSegments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSegments = segments.map(segment => {
      if (segment.choices.some(choice => choice.text === '' && choice.nextSegmentId === '')) {
        return { ...segment, choices: [] };
      }
      return segment;
    });

    
    onSubmit({ title, segments: finalSegments, email: userEmail });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <label className="block text-lg font-semibold mb-2">Story Title</label>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="space-y-4">
          {segments.map((segment, segmentIndex) => (
            <div key={segmentIndex} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Segment {segmentIndex + 1} - {segment.id}</span>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveSegment(segmentIndex)}
                >
                  Remove Segment
                </button>
              </div>

              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Enter segment content"
                value={segment.content}
                onChange={(e) => handleSegmentChange(segmentIndex, 'content', e.target.value)}
              />

              <div className="space-y-2">
                <label className="block text-sm font-semibold mb-2">Choices</label>
                {segment.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center space-x-4 mb-2">
                    <input
                      type="text"
                      placeholder="Enter choice text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(segmentIndex, choiceIndex, 'text', e.target.value)}
                    />
                    <select
                      className="p-2 border border-gray-300 rounded"
                      value={choice.nextSegmentId}
                      onChange={(e) => handleChoiceChange(segmentIndex, choiceIndex, 'nextSegmentId', e.target.value)}
                    >
                      <option value="">Select next segment</option>
                      {segments.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.id}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleRemoveChoice(segmentIndex, choiceIndex)}
                    >
                      Remove Choice
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleAddChoice(segmentIndex)}
                >
                  Add Choice
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
          onClick={handleAddSegment}
        >
          Add Segment
        </button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4">
          Create Story
        </button>
      </form>
    </div>
  );
};

export default CreateStoryForm;
