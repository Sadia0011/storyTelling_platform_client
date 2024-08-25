import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ClipLoader from "react-spinners/ClipLoader"; // Import a spinner component or use your preferred spinner
import useAxiosPublic from '../useAxiosPublic';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const StoryInsights = () => {
  const [stories, setStories] = useState([]);
  const [insightsData, setInsightsData] = useState({});
  const [loading, setLoading] = useState(true); 
 const axios=useAxiosPublic()
  useEffect(() => {
    const fetchStories = async () => {
        const response = await axios.get('/api/stories/getStories');
        setStories(response.data);
    };
    fetchStories();
    // setLoading(false)
  }, []);

  useEffect(() => {
    const fetchAllInsights = async () => {
      const data = {};
      for (const story of stories) {
          const [choiceResponse, timeResponse] = await Promise.all([
            axios.get(`/api/stories/${story._id}/insights`),
            axios.get(`/api/stories/${story._id}/time-insights`),
          ]);
          
          data[story._id] = {
            choices: choiceResponse.data,
            time: timeResponse.data,
          };
      }
      setInsightsData(data);
      setLoading(false); 
    };

    if (stories.length > 0) {
      fetchAllInsights();
    }
  }, [stories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader color="#4A90E2" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Story Insights</h2>

      {stories.map((story) => {
        const choiceData = {
          labels: (insightsData[story._id]?.choices || []).map(choice => choice._id || 'N/A'),
          datasets: [
            {
              label: 'Choice Popularity',
              data: (insightsData[story._id]?.choices || []).map(choice => choice.count || 0),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };

        const timeData = {
          labels: (insightsData[story._id]?.time || []).map(segment => segment._id || 'N/A'),
          datasets: [
            {
              label: 'Average Time Spent (s)',
              data: (insightsData[story._id]?.time || []).map(segment => segment.avgTimeSpent || 0),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        };

        return (
          <div key={story._id} className="mb-12">
            <h3 className="text-2xl font-semibold mb-4">{story.title}</h3>

            <h4 className="text-xl font-semibold mb-4">Choice Popularity</h4>
            <div className="bg-white p-4 rounded-lg shadow-md mb-8">
              <Bar data={choiceData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <h4 className="text-xl font-semibold mb-4">Average Time Spent per Segment</h4>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Bar data={timeData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StoryInsights;
