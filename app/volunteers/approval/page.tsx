import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Volunteer {
  name: string;
  nic: string;
  school: string;
  stream: string;
  phone: string;
}

const VolunteerCard: React.FC<{ volunteer: Volunteer }> = ({ volunteer }) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{volunteer.name}</h3>
              <p className="text-gray-600 mt-1">NIC: {volunteer.nic}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">School Name: {volunteer.school}</p>
              <p className="text-gray-600">A/L Stream: {volunteer.stream}</p>
              <p className="text-gray-600">Phone Number: {volunteer.phone}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-24 bg-blue-500 hover:bg-blue-600 text-white">
              Approve
            </Button>
            <Button
              variant="secondary"
              className="w-24 bg-black hover:bg-gray-800 text-white"
            >
              Reject
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Volunteer Approval Page
const VolunteerApproval = () => {
  const volunteers = [
    {
      name: "Volunteer Name",
      nic: "123456789V",
      school: "School Name",
      stream: "A/L Stream",
      phone: "0712345678",
    },
    {
      name: "Volunteer Name",
      nic: "987654321V",
      school: "School Name",
      stream: "A/L Stream",
      phone: "0712345678",
    },
    {
      name: "Volunteer Name",
      nic: "456789123V",
      school: "School Name",
      stream: "A/L Stream",
      phone: "0712345678",
    },
    {
      name: "Volunteer Name",
      nic: "789123456V",
      school: "School Name",
      stream: "A/L Stream",
      phone: "0712345678",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {volunteers.map((volunteer, index) => (
            <VolunteerCard key={index} volunteer={volunteer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolunteerApproval;
