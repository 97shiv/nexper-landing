import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

export function VendorBookingManagement() {
  const { user } = useAuth();
  const { getBookingsByVendor, updateBookingStatus } = useBookings();

  const vendorBookings = getBookingsByVendor(user?.id);

  const handleBookingStatusUpdate = (bookingId, status) => {
    updateBookingStatus(bookingId, status);
    toast({
      title: "Booking updated",
      description: `Booking status changed to ${status}.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Recent Bookings</h2>
      
      <div className="space-y-4">
        {vendorBookings.map((booking) => (
          <Card key={booking.id} className="bg-white/80 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{booking.serviceName}</h3>
                  <p className="text-gray-600">Client: {booking.name}</p>
                  <p className="text-gray-600">Email: {booking.email}</p>
                  <p className="text-gray-600">Phone: {booking.phone}</p>
                  <p className="text-gray-600">Date: {booking.date} at {booking.time}</p>
                  {booking.requirements && (
                    <p className="text-gray-600 mt-2">Requirements: {booking.requirements}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">${booking.totalAmount}</p>
                  <div className="mt-2">
                    <Select
                      value={booking.status}
                      onValueChange={(status) => handleBookingStatusUpdate(booking.id, status)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vendorBookings.length === 0 && (
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardContent className="text-center py-12">
            <p className="text-xl text-gray-600">No bookings yet</p>
            <p className="text-gray-500 mt-2">Bookings will appear here when customers book your services</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}