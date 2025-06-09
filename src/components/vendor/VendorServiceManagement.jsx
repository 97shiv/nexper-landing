import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { VendorServiceForm } from '@/components/vendor/VendorServiceForm';

export function VendorServiceManagement() {
  const { user, isVendorApproved } = useAuth();
  const { addService, updateService, deleteService, getServicesByVendor } = useServices();
  
  const [editingService, setEditingService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const vendorServices = getServicesByVendor(user?.id);

  const handleSubmitService = (serviceData) => {
    const data = {
      ...serviceData,
      price: parseFloat(serviceData.price),
      vendorId: user.id,
      vendorName: user.businessName || user.name,
      image: serviceData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500'
    };

    if (editingService) {
      updateService(editingService.id, data);
      toast({
        title: "Service updated! ✨",
        description: "Your service has been successfully updated.",
      });
    } else {
      addService(data);
      toast({
        title: "Service added! 🎉",
        description: "Your new service is now live and visible to customers.",
      });
    }
    setShowAddForm(false);
    setEditingService(null);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowAddForm(true);
  };

  const handleDeleteService = (serviceId) => {
    deleteService(serviceId);
    toast({
      title: "Service deleted",
      description: "The service has been removed from your listings.",
    });
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingService(null);
  };

  if (!isVendorApproved) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
        <CardContent className="text-center py-12">
          <p className="text-xl text-gray-600">Service management is disabled until your account is approved.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Services</h2>
        <Button
          onClick={() => { setEditingService(null); setShowAddForm(true); }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {showAddForm && (
        <VendorServiceForm 
          onSubmit={handleSubmitService} 
          initialData={editingService}
          onCancel={handleCancelForm}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorServices.map((service) => (
          <Card key={service.id} className="bg-white/80 backdrop-blur-sm border-purple-200">
            <div className="relative">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                ${service.price}
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex justify-between items-center">
                <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  {service.category}
                </span>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteService(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vendorServices.length === 0 && !showAddForm && (
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardContent className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No services yet</p>
            <Button
              onClick={() => { setEditingService(null); setShowAddForm(true); }}
              className="bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Add Your First Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}