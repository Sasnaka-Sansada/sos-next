"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

interface Seminar {
  id: number;
  school: string;
  location: string;
  subGroup?: string;
  date: string;
  contactDetails: string;
  remainingSlots: number;
  hasApplied: boolean;
}

interface SeminarCardProps {
  seminar: Seminar;
  onApply: (id: number) => void;
  onRevert: (id: number) => void;
}

const SeminarCard: React.FC<SeminarCardProps> = ({
  seminar,
  onApply,
  onRevert,
}) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div>
            <label className="font-medium">School:</label>
            <div className="text-gray-700">{seminar.school}</div>
          </div>

          <div>
            <label className="font-medium">Location:</label>
            <div>
              <a
                href={seminar.location}
                className="text-blue-500 hover:text-blue-600 inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={16} />
                Google Maps Location
              </a>
            </div>
          </div>

          <div>
            <label className="font-medium">Sub Group (Optional):</label>
            <div className="text-gray-700">{seminar.subGroup}</div>
          </div>

          <div>
            <label className="font-medium">Date:</label>
            <div className="text-gray-700">{seminar.date}</div>
          </div>

          <div>
            <label className="font-medium">Contact Details:</label>
            <div className="text-gray-700">{seminar.contactDetails}</div>
          </div>

          <div>
            <label className="font-medium">Remaining Slots:</label>
            <div className="text-gray-700">{seminar.remainingSlots}</div>
          </div>
        </div>

        <div className="flex justify-between pt-4 gap-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white flex-1"
            onClick={() => onApply(seminar.id)}
          >
            Apply
          </Button>
          {seminar.hasApplied && (
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 text-black flex-1"
              onClick={() => onRevert(seminar.id)}
            >
              Revert
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const SeminarDashboard = () => {
  const [seminars, setSeminars] = useState([
    {
      id: 1,
      school: "St. Mary's College",
      location: "https://Maps.App.Goo.Gl/WsRAavSpYLSCjb8Z72",
      subGroup: "Moratuwa",
      date: "01/10/2024",
      contactDetails: "0771231312",
      remainingSlots: 10,
      hasApplied: false,
    },
    {
      id: 2,
      school: "Royal College",
      location: "https://maps.google.com/royal",
      subGroup: "Colombo",
      date: "05/10/2024",
      contactDetails: "0771231313",
      remainingSlots: 15,
      hasApplied: false,
    },
    {
      id: 3,
      school: "Ananda College",
      location: "https://maps.google.com/ananda",
      subGroup: "Maradana",
      date: "10/10/2024",
      contactDetails: "0771231314",
      remainingSlots: 8,
      hasApplied: false,
    },
  ]);

  const handleApply = (seminarId: number) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === seminarId
          ? {
              ...seminar,
              hasApplied: true,
              remainingSlots: seminar.remainingSlots - 1,
            }
          : seminar
      )
    );
  };

  const handleRevert = (seminarId: number) => {
    setSeminars(
      seminars.map((seminar) =>
        seminar.id === seminarId
          ? {
              ...seminar,
              hasApplied: false,
              remainingSlots: seminar.remainingSlots + 1,
            }
          : seminar
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seminars.map((seminar) => (
            <SeminarCard
              key={seminar.id}
              seminar={seminar}
              onApply={handleApply}
              onRevert={handleRevert}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeminarDashboard;
