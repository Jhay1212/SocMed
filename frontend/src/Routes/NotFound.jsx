import React from 'react';
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <HiOutlineQuestionMarkCircle className="text-6xl text-gray-600 mb-4" />
            
            <h1>404 - Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;