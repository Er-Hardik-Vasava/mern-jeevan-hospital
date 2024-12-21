import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Message = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMessageDetails = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/message/get-message",
          { withCredentials: true }
        );
        if (response.data.success) {
          setMessages(response.data.data); 
        } else {
          toast.error("Failed to fetch messages.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        toast.error(errorMessage);
        setMessages([]); 
      } finally {
        setLoading(false); 
      }
    };

    
    if (isAuthenticated) {
      fetchMessageDetails();
    }
  }, [isAuthenticated]);


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }


  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>; // Loading indicator
  }

  return (
    <div className="max-w-4xl mx-auto p-4 h-screen">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold">{msg.firstName} {msg.lastName}</h3>
            <p className="text-gray-700">Email: {msg.email}</p>
            <p className="text-gray-700">Phone: {msg.phone}</p>
            <p className="text-gray-700">Message: {msg.message}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No messages found.</p>
      )}
    </div>
  );
};

export default Message;
