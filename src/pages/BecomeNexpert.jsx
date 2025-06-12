import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';
import { Star, Award, DollarSign, Users } from 'lucide-react';

export function BecomeNexpert({ onNavigate }) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    expertise: '',
    experience: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    const vendorData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName,
      expertise: formData.expertise,
      experience: formData.experience,
      description: formData.description,
      role: 'vendor'
    };

    const result = register(vendorData, formData.password);
    
    if(result.error) {
      toast({
        title: "Registration Failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration Submitted! 🎉",
        description: "Your application to become a Nexpert has been submitted. An admin will review it shortly.",
        duration: 5000,
      });
      onNavigate('home'); 
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Become a Nexpert
          </h1>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Join our community of skilled professionals and start earning by offering your expertise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center p-4 bg-white backdrop-blur-sm rounded-xl border border-white/20">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Earn More</h3>
              <p className="text-sm text-gray-600">Set your own rates</p>
            </div>
            <div className="text-center p-4 bg-white backdrop-blur-sm rounded-xl border border-white/20">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Find Clients</h3>
              <p className="text-sm text-gray-600">Connect with customers</p>
            </div>
            <div className="text-center p-4 bg-white backdrop-blur-sm rounded-xl border border-white/20">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Build Reputation</h3>
              <p className="text-sm text-gray-600">Get reviews & ratings</p>
            </div>
            <div className="text-center p-4 bg-white backdrop-blur-sm rounded-xl border border-white/20">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Grow Business</h3>
              <p className="text-sm text-gray-600">Scale your services</p>
            </div>
          </div>
        </div>

        <Card className="bg-white backdrop-blur-sm border-purple-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-900 to-blue-900 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Join as a Nexpert</CardTitle>
            <CardDescription className="text-purple-100">
              Fill out the form below to start your journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
  <Label htmlFor="name">Full Name</Label>
  <Input
    id="name"
    value={formData.name}
    onChange={(e) => handleChange('name', e.target.value)}
    required
    placeholder="Enter your full name"
    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    placeholder="Enter your email"
                    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    required
                    placeholder="Enter your phone number"
                    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                 <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
               <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  required
                  placeholder="Enter your confirm password"
                  className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="businessName">Business/Company Name</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    required
                    placeholder="Enter your business/company name"
                    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <Input
                    id="expertise"
                    placeholder="e.g., Web Development, Digital Marketing"
                    value={formData.expertise}
                    onChange={(e) => handleChange('expertise', e.target.value)}
                    required
                    
                    className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  required
                  className="mt-1 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="description">Professional Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your skills, experience, and what makes you unique..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  className="mt-1 min-h-[120px] border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
              >
                Submit Application
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}