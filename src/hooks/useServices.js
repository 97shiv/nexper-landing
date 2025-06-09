
import { useState, useEffect } from 'react';

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      const defaultServices = [
        {
          id: '1',
          title: 'Web Development',
          description: 'Professional web development services using modern technologies',
          price: 999,
          category: 'Technology',
          vendorId: 'vendor1',
          vendorName: 'Tech Solutions',
          image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
          type: 'hourly'
        },
        {
          id: '2',
          title: 'Digital Marketing',
          description: 'Comprehensive digital marketing strategies to grow your business',
          price: 599,
          category: 'Marketing',
          vendorId: 'vendor2',
          vendorName: 'Marketing Pro',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
          type: 'project'
        }
      ];
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
    setLoading(false);
  }, []);

  const addService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
    return newService;
  };

  const updateService = (id, serviceData) => {
    const updatedServices = services.map(service =>
      service.id === id ? { ...service, ...serviceData } : service
    );
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const deleteService = (id) => {
    const updatedServices = services.filter(service => service.id !== id);
    setServices(updatedServices);
    localStorage.setItem('services', JSON.stringify(updatedServices));
  };

  const getServiceById = (id) => {
    return services.find(service => service.id === id);
  };

  const getServicesByVendor = (vendorId) => {
    return services.filter(service => service.vendorId === vendorId);
  };

  return {
    services,
    loading,
    addService,
    updateService,
    deleteService,
    getServiceById,
    getServicesByVendor
  };
}
