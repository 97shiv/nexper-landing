import React from 'react';
import { Calendar, BookOpen, Users, Star, Group, DollarSign } from 'lucide-react';

const ConsultationSection = () => {
  const servicesRow1 = [
    { icon: <Calendar className="h-8 w-8 text-purple-600" />, title: 'Book 1-on-1 Consultation' },
    { icon: <BookOpen className="h-8 w-8 text-purple-600" />, title: 'Register for Training' },
    { icon: <Users className="h-8 w-8 text-purple-600" />, title: 'Follow Experts' },
  ];

  const servicesRow2 = [
    { icon: <Star className="h-8 w-8 text-purple-600" />, title: 'Book for Services' },
    { icon: <Group className="h-8 w-8 text-purple-600" />, title: 'Join Expert Community (Free & Paid)' },
    { icon: <DollarSign className="h-8 w-8 text-purple-600" />, title: 'Subscribe (Paid)' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-100  to-indigo-100 text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {[servicesRow1, servicesRow2].map((row, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {row.map((item, idx) => (
              <div key={idx} className="bg-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationSection;
