import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { BecomeNexpert } from '@/pages/BecomeNexpert';
import { VendorDashboard } from '@/pages/VendorDashboard';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { ServiceDetail } from '@/pages/ServiceDetail';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/useAuth';
import { useServices } from '@/hooks/useServices';
import { Chatbot } from '@/components/Chatbot'; 
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const { user, loading, isAdmin, isVendor } = useAuth();
  const { getServiceById } = useServices();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const redirectData = localStorage.getItem('redirectAfterLogin');
    if (redirectData && user) {
      const { page, serviceId } = JSON.parse(redirectData);
      if (page === 'service-detail' && serviceId) {
        const service = getServiceById(serviceId);
        if (service) {
          setSelectedService(service);
          setCurrentPage('service-detail');
        }
      }
      localStorage.removeItem('redirectAfterLogin');
    }
  }, [user, getServiceById]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} onServiceSelect={handleServiceSelect} />;
      // case 'login':
      //   return <Login onNavigate={handleNavigation} />;
      // case 'register':
      //   return <Register onNavigate={handleNavigation} />;
      // case 'become-nexpert':
      //   return <BecomeNexpert onNavigate={handleNavigation} />;
      case 'vendor-dashboard':
        return isVendor ? <VendorDashboard /> : <Home onNavigate={handleNavigation} onServiceSelect={handleServiceSelect} />;
      case 'admin-dashboard':
        return isAdmin ? <AdminDashboard /> : <Home onNavigate={handleNavigation} onServiceSelect={handleServiceSelect} />;
      case 'service-detail':
        return <ServiceDetail service={selectedService} onNavigate={handleNavigation} />;
      default:
        return <Home onNavigate={handleNavigation} onServiceSelect={handleServiceSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900">
      <Navbar onNavigate={handleNavigation} currentPage={currentPage} />
      {renderPage()}
      <Toaster />

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          size="lg"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="rounded-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-2xl"
          aria-label="Toggle Chatbot"
        >
          <MessageSquare className="w-8 h-8" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  );
}

export default App;