import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { VendorStats } from '@/components/vendor/VendorStats';
import { VendorServiceManagement } from '@/components/vendor/VendorServiceManagement';
import { VendorBookingManagement } from '@/components/vendor/VendorBookingManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function VendorDashboard() {
  const { user, isVendorApproved } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Vendor Dashboard
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Welcome back, {user?.name}! Manage your services and bookings.
          </p>
        </div>

        {!isVendorApproved && (
          <Card className="mb-8 bg-yellow-50 border-yellow-300">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Account Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-600">
                Your vendor account is currently pending approval by an administrator. 
                You will be able to add services once your account is approved. 
                Thank you for your patience.
              </p>
            </CardContent>
          </Card>
        )}

        <VendorStats />

        <Tabs defaultValue="services" className="space-y-6 mt-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services" disabled={!isVendorApproved}>My Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            {isVendorApproved ? (
              <VendorServiceManagement />
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardContent className="text-center py-12">
                  <p className="text-xl text-gray-600">Service management is disabled until your account is approved.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings">
            <VendorBookingManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}