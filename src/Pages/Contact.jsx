import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-700 to-purple-500">
            <div className="bg-white shadow-lg p-8 w-full max-w-lg text-center rounded-lg">
                <h1 className="text-4xl font-bold text-purple-800 mb-4">Contact Us</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Have any questions or feedback? Feel free to reach out to us using the details below.
                </p>
                
                <div className="text-left space-y-4">
                    <p><strong>Email:</strong> support@storyteller.com</p>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Address:</strong> 123 Story Avenue, Creative City, Fictionland</p>
                </div>

                <p className="text-sm text-gray-500 mt-8">
                    We usually respond within 24 hours.
                </p>
            </div>
        </div>
    );
};

export default Contact;