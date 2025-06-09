
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Clock, DollarSign } from 'lucide-react';

export function BookingForm({ service }) {
  const { createBooking } = useBookings();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: '',
    time: '',
    duration: '',
    budget: '',
    requirements: '',
    urgency: 'normal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const bookingData = {
      ...formData,
      serviceId: service.id,
      serviceName: service.title,
      vendorId: service.vendorId,
      vendorName: service.vendorName,
      userId: user.id,
      totalAmount: calculateTotal()
    };

    createBooking(bookingData);
    
    toast({
      title: "Booking Confirmed! 🎉",
      description: "Your booking has been successfully submitted. The vendor will contact you soon.",
      duration: 5000,
    });

    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      date: '',
      time: '',
      duration: '',
      budget: '',
      requirements: '',
      urgency: 'normal'
    });
  };

  const calculateTotal = () => {
    if (service.type === 'hourly' && formData.duration) {
      return service.price * parseInt(formData.duration);
    }
    return service.price;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Book {service.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                required
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                required
                className="mt-1"
              />
            </div>
            
            {service.type === 'hourly' && (
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => handleChange('duration', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="urgency">Project Urgency</Label>
            <Select value={formData.urgency} onValueChange={(value) => handleChange('urgency', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="budget">Budget Range</Label>
            <Input
              id="budget"
              placeholder="e.g., $500 - $1000"
              value={formData.budget}
              onChange={(e) => handleChange('budget', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Project Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Please describe your project requirements, goals, and any specific details..."
              value={formData.requirements}
              onChange={(e) => handleChange('requirements', e.target.value)}
              required
              className="mt-1 min-h-[100px]"
            />
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Estimated Total:</span>
              <span className="text-2xl font-bold text-green-600 flex items-center">
                <DollarSign className="w-5 h-5" />
                {calculateTotal() || service.price}
              </span>
            </div>
            {service.type === 'hourly' && formData.duration && (
              <p className="text-sm text-gray-600 mt-1">
                ${service.price}/hour × {formData.duration} hours
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
          >
            <Clock className="w-5 h-5 mr-2" />
            Confirm Booking
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
