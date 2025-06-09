import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, DollarSign, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useServices } from '@/hooks/useServices';
import { useBookings } from '@/hooks/useBookings';

export function VendorStats() {
  const { user } = useAuth();
  const { getServicesByVendor } = useServices();
  const { getBookingsByVendor } = useBookings();

  const vendorServices = getServicesByVendor(user?.id);
  const vendorBookings = getBookingsByVendor(user?.id);

  const totalEarnings = vendorBookings
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  
  const activeClients = vendorBookings.filter(b => b.status === 'confirmed' || b.status === 'in-progress').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Services</p>
              <p className="text-3xl font-bold">{vendorServices.length}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Bookings</p>
              <p className="text-3xl font-bold">{vendorBookings.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Clients</p>
              <p className="text-3xl font-bold">{activeClients}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Total Earnings</p>
              <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}