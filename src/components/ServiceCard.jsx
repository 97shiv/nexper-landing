
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';

export function ServiceCard({ service, onSelect,average = 4.5, total = 123 }) {
   const fullStars = Math.floor(average);
  const halfStar = average % 1 >= 0.5;
  
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 border-purple-200 overflow-hidden">
      <div className="relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${service.price}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          {service.title}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">
          {service.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          {/* <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.8</span>
            <span className="text-sm text-gray-500">(124 reviews)</span>
          </div> */}

            <div className="flex items-center space-x-2">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="text-yellow-400" fill="currentColor" />
      ))}
      {halfStar && <Star className="text-yellow-400 opacity-70" fill="currentColor" />}
      <span className="text-gray-600 text-sm">({total} reviews)</span>
    </div>
          <span className="text-sm text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded">
            {service.category}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>By {service.vendorName}</span>
        </div>
        
        <Button 
          onClick={() => onSelect(service)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
