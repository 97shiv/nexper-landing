import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useServices } from '@/hooks/useServices';
import { useBookings } from '@/hooks/useBookings';
import { toast } from '@/components/ui/use-toast';
import { Users, Briefcase, DollarSign, CheckCircle, XCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function AdminDashboard() {
  const { user, getAllUsers, approveVendor } = useAuth();
  const { services } = useServices();
  const { bookings } = useBookings();
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      setAllUsers(getAllUsers());
    }
  }, [user, getAllUsers]);

  const handleApproveVendor = (vendorId) => {
    approveVendor(vendorId);
    setAllUsers(getAllUsers()); // Refresh user list
    toast({
      title: "Vendor Approved",
      description: "The vendor account has been activated.",
    });
  };

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const vendors = filteredUsers.filter(u => u.role === 'vendor');
  const regularUsers = filteredUsers.filter(u => u.role === 'user');

  const totalServices = services.length;
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Oversee platform activity and manage users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Users</p>
                  <p className="text-3xl font-bold">{allUsers.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Services</p>
                  <p className="text-3xl font-bold">{totalServices}</p>
                </div>
                <Briefcase className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Total Revenue</p>
                  <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vendors">Manage Vendors</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription>Approve or manage vendor accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                {vendors.length > 0 ? (
                  <div className="space-y-4">
                    {vendors.map(vendor => (
                      <Card key={vendor.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{vendor.name} ({vendor.businessName})</p>
                          <p className="text-sm text-gray-500">{vendor.email}</p>
                          <p className="text-sm text-gray-500">Expertise: {vendor.expertise}</p>
                        </div>
                        <div>
                          {vendor.approved ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="w-5 h-5 mr-1" /> Approved
                            </span>
                          ) : (
                            <Button onClick={() => handleApproveVendor(vendor.id)} size="sm" className="bg-green-500 hover:bg-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : <p>No vendors found.</p>}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
             <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View registered users.</CardDescription>
              </CardHeader>
              <CardContent>
                {regularUsers.length > 0 ? (
                  <div className="space-y-4">
                  {regularUsers.map(regUser => (
                    <Card key={regUser.id} className="p-4">
                      <p className="font-semibold">{regUser.name}</p>
                      <p className="text-sm text-gray-500">{regUser.email}</p>
                    </Card>
                  ))}
                  </div>
                ) : <p>No users found.</p>}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}