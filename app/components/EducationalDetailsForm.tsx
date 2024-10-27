'use client'
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

const EducationalDetailsForm = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Educational Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">School</label>
            <Input 
              type="text" 
              placeholder="Name of the School"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">A/L Year</label>
            <Input 
              type="text" 
              placeholder="A/L Year"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">A/L Stream</label>
            <Input 
              type="text" 
              placeholder="A/L Stream"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">University</label>
            <Input 
              type="text" 
              placeholder="Name of the University"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Degree Program</label>
            <Input 
              type="text" 
              placeholder="Your Degree Program"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Graduate Year</label>
            <Input 
              type="text" 
              placeholder="DD/MM/YYYY"
              className="w-full"
            />
          </div>
        <Link href="/dashboard">
          <Button 
            type="submit" 
            className="w-full bg-gray-900 text-white hover:bg-gray-800"
          >
            Submit
          </Button>
          </Link>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationalDetailsForm;