
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingForm } from '@/components/BookingForm';
import { useAuth } from '@/hooks/useAuth';
import { Star, MapPin, Clock, DollarSign, Award, CheckCircle } from 'lucide-react';

export function ServiceDetail({ service, onNavigate }) {
  const { isAuthenticated } = useAuth();
const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
          <CardContent className="text-center py-12">
            <p className="text-xl text-gray-600">Service not found</p>
            <Button
              onClick={() => onNavigate('home')}
              className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Button
          onClick={() => onNavigate('home')}
          variant="outline"
          className="mb-6 bg-white/80 backdrop-blur-sm"
        >
          ← Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Details */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-xl overflow-hidden">
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                  ${service.price}
                  {service.type === 'hourly' && <span className="text-sm">/hour</span>}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">{service.title}</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-gray-500">(124 reviews)</span>
                  </div> */}
           
                  <span className="text-lg text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">Provided by {service.vendorName}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>Pricing: {service.type === 'hourly' ? 'Hourly Rate' : 'Fixed Project'}</span>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-600" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Professional consultation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Quality guarantee
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Timely delivery
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Post-project support
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-800 mb-2">About the Provider</h3>
                  <p className="text-gray-600">
                    {service.vendorName} is a verified professional with years of experience in {service.category.toLowerCase()}. 
                    They have successfully completed numerous projects and maintain a high customer satisfaction rating.
                  </p>
                </div>

                        <div className="p-4 bg-white rounded-xl shadow">
      <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>
      <div className="flex mb-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`cursor-pointer ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}
            onClick={() => setRating(n)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => onSubmit({ rating, comment })}
      >
        Submit Review
      </button>
    </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            {isAuthenticated ? (
              <BookingForm service={service} />
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle>Ready to Book?</CardTitle>
                  <CardDescription className="text-purple-100">
                    Sign in to book this service
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 mb-6">
                    You need to be logged in to book this service. Join thousands of satisfied customers!
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        localStorage.setItem('redirectAfterLogin', JSON.stringify({
                          page: 'service-detail',
                          serviceId: service.id
                        }));
                        onNavigate('login');
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Sign In to Book
                    </Button>
                    <Button
                      onClick={() => onNavigate('register')}
                      variant="outline"
                      className="w-full"
                    >
                      Create New Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
