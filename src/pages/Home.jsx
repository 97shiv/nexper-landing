
import React, { useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/hooks/useAuth';
import { Search, Star, Users, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SmallHorizontalSlider from '../components/AutoSlideCards';
import AutoSlideCards from '../components/AutoSlideCards';
import Typography from '@mui/material/Typography';

import styles from '@/styles.module.css';
import classnames from 'classnames'



export function Home({ onNavigate, onServiceSelect }) {
  const { services, loading } = useServices();
  const { isAuthenticated } = useAuth();

  // AI
    const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate(); 

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "User", text: userInput };
    const aiResponse = getAIResponse(userInput);

    setMessages((prev) => [
      ...prev,
      newMessage,
      { sender: "AI", text: aiResponse.text, cards: aiResponse.cards || [] },
    ]);

    setUserInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCardClick = (slug) => {
    navigate(`/services/${slug}`); // or router.push(`/services/${slug}`)
  };

  const getAIResponse = (input) => {
    const lower = input.toLowerCase();

    if (lower.includes("fitness") || lower.includes("trainer")) {
      return {
        text: "Here are some fitness experts you can book:",
        cards: [
          {
            title: "Yoga & Wellness Coach",
            image: "/images/services/download (3) (1).png",
            slug: "yoga-wellness-coach",
          },
          {
            title: "Personal Fitness Trainer",
            image: "/images/services/download (6) (1).png",
            slug: "personal-fitness-trainer",
          },
           {
            title: "Car Booking",
            image: "/images/services/download (7) (1).png",
            slug: "Car-Booking",
          },
           {
            title: "Home Cleaning",
            image: "/images/services/download (8) (1).png",
            slug: "Home-Cleaning",
          },
        ],
      };
    }

    if (lower.includes("course") || lower.includes("learn")) {
      return {
        text: "Here are some popular courses:",
        cards: [
          {
            title: "Full-Stack Web Development",
            image: "/images/services/download (2) (1).jpg",
            slug: "fullstack-web-development",
          },
          {
            title: "Digital Marketing Masterclass",
            image: "/images/services/download (8).png",
            slug: "digital-marketing-masterclass",
          },
            {
            title: "UI/UX Developer",
            image: "/images/services/download (9).png",
            slug: "UI/UX-Developer",
          },
        ],
      };
    }

    if (lower.includes("doctor")) {
      return {
        text: "Here are some doctors available for online consultation:",
        cards: [
          {
            title: "Dr. Mehta - General Physician",
            image: "/images/services/download (2) (2).jpg",
            slug: "general-physician-dr-mehta",
          },
        ],
      };
    }

    return {
      text: "I'm here to help you find the right service or course. Try asking: 'Find a web design course' or 'Book a lawyer in Delhi'.",
    };
  };
//end AI 


  const handleServiceClick = (service) => {
    if (!isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', JSON.stringify({
        page: 'service-detail',
        serviceId: service.id
      }));
      onNavigate('login');
    } else {
      onServiceSelect(service);
      onNavigate('service-detail');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading amazing services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
        
          {/* <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Connect with skilled professionals and get your projects done with excellence
          </p> */}
          
 
  
  <Typography
  className={styles.heroText} // if you have other custom styles here
  sx={{
    fontWeight: 800,
    fontSize: { xs: '1.25rem', sm: '42px' },
   
    lineHeight: '48px',
  }}
>
  Find Your Perfect Nexpert
</Typography>


        <div className="max-w-2xl mx-auto mb-12">
      <h2 className="text-xl font-bold text-center text-white mb-4">
        What service or course do you need? <br />
        <span className="text-white">Start now 👇</span>
      </h2>

      <div className="relative  backdrop-blur-sm border-2 border-purple-100 rounded-2xl p-5 shadow-lg">
        <div className="max-h-64 overflow-y-auto mb-3 space-y-3 text-sm text-gray-800">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === "User" ? "text-right" : "text-left"}>
              <div
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "User"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                <strong>{msg.sender === "User" ? "You" : "Nexper AI"}:</strong> {msg.text}
              </div>

              {/* Show cards if available */}
              {msg.cards && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                  {msg.cards.map((card, i) => (
                    <div
                      key={i}
                      onClick={() => handleCardClick(card.slug)}
                      className="cursor-pointer bg-white rounded-xl border shadow hover:shadow-md transition overflow-hidden"
                    >
                      <img src={card.image} alt={card.title} className="w-full h-32 object-cover" />
                      <div className="p-3 font-semibold text-sm text-gray-700">{card.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <textarea
            rows="1"
            placeholder="Ask for services or courses like 'Find a yoga trainer'..."
            className="flex-1 resize-none border border-gray-300 rounded-full py-3 px-5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            onClick={handleSubmit}
            className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-5 py-2 text-white text-sm"
          >
            Send
          </Button>
        </div>
      </div>
    </div>

<AutoSlideCards/>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Services</h2>
            <p className="text-xl text-white">Discover amazing services from our top-rated experts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceClick}
              />
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No services available yet.</p>
              <Button
                onClick={() => onNavigate('become-nexpert')}
                className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Be the first to add a service!
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
