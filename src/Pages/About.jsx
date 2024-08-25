import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500">
            <div className="bg-white shadow-lg p-8 w-full max-w-lg text-center rounded-lg">
                <h1 className="text-4xl font-bold text-purple-800 mb-4">About Us</h1>
                <p className="text-lg text-gray-600">
                    Story Teller is an interactive platform that allows users to explore and create dynamic, branching stories. 
                    Our mission is to bring creativity and choice-driven narratives to life, 
                    offering a space for both readers and authors to express themselves through engaging stories.
                </p>

                <p className="text-lg text-gray-600 mt-4">
                    Whether you're here to explore new stories or to share your own, 
                    Story Teller is designed to empower creativity and provide endless storytelling possibilities.
                </p>

                <p className="text-sm text-gray-500 mt-8">
                    Join us in creating stories that inspire and connect people worldwide.
                </p>
            </div>
        </div>
    );
};

export default About;
