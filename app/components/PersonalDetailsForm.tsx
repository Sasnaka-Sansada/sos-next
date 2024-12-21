'use client'
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/navigation';

const PersonalDetailsForm = () => {
  const districts = [
    "Kandy",
    "Colombo",
    "Galle",
    "Matara",
    "Kurunegala",
    "Jaffna",
    "Anuradhapura",
    "Polonnaruwa",
    "Gampaha",
    "Kalutara",
    "Ratnapura",
    "Badulla",
    "Monaragala",
    "Ampara",
    "Trincomalee",
    "Batticaloa",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Kilinochchi",
    "Hambantota",
    "Nuwara Eliya",
    "Puttalam",
    "Matale",
    "Kegalle",
    
  ];

  const genders = ["Male", "Female", "Other", "Prefer not to say"];

  const router = useRouter();

  const [formData, setFormData] = useState({
    district: '',
    fullName: '',
    phoneNumber: '',
    birthday: '',
    nicNumber: '',
    address: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await (await supabase).from('volunteer_personal_details').insert([formData]);
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      router.push('/educational');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current District</label>
            <Select  onValueChange={(value) => handleSelectChange('district', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Your District" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district.toLowerCase()}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              type="text" 
              placeholder="Your Name"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input 
              type="tel" 
              placeholder="07X XXX XXXX"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Birthday</label>
            <Input 
              type="text" 
              placeholder="XX / XX / XXXX"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">NIC Number</label>
            <Input 
              type="text" 
              placeholder="XXXXXXXXXXX"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input 
              type="text" 
              placeholder="Your Address"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select onValueChange={(value) => handleSelectChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender} value={gender.toLowerCase()}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        <Link href={'educational'}>
          <Button 
            type="submit" 
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            Next
          </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsForm;