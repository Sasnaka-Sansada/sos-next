'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Search,
  Star,
  Users,
  Clock,
  CheckCircle,
  MapPin,
  School
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Seminar {
  id: number;
  school: string;
  subGroup: string;
  date: string;
  duration: string;
  status: string;
  attendees: number;
  role: string;
  achievements?: string[];
  review?: {
    rating: number;
    comment: string;
  } | null;
}

const SeminarCard = ({ seminar }: { seminar: Seminar }) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <School className="w-5 h-5 text-blue-500" />
              {seminar.school}
            </h3>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4" />
              {seminar.subGroup}
            </p>
          </div>
          <Badge 
            className={
              seminar.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }
          >
            {seminar.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>{seminar.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{seminar.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{seminar.attendees} Students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-4 h-4" />
            <span>Role: {seminar.role}</span>
          </div>
        </div>

        {seminar.review && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${seminar.review &&
                    i < seminar.review.rating 
                      ? getRatingColor(seminar.review?.rating ?? 0)
                      : 'text-gray-300'
                  }`}
                  fill={seminar.review && i < seminar.review.rating ? 'currentColor' : 'none'}
                />
              ))}
              <span className="ml-2 font-medium">
                {seminar.review.rating}/5
              </span>
            </div>
            <p className="text-gray-600 mt-2">{seminar.review.comment}</p>
          </div>
        )}

        {seminar.achievements && (
          <div className="mt-4 flex flex-wrap gap-2">
            {seminar.achievements.map((achievement, index) => (
              <Badge
                key={index}
                className="bg-purple-100 text-purple-800"
              >
                {achievement}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VolunteerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  const [seminars] = useState([
    {
      id: 1,
      school: "St. Mary's College",
      subGroup: "Moratuwa",
      date: "January 10, 2024",
      duration: "2 hours",
      status: "completed",
      attendees: 45,
      role: "Lead Presenter",
      achievements: ["Best Presentation", "High Engagement"],
      review: {
        rating: 5,
        comment: "Excellent presentation skills and student engagement. The workshop was well-structured and interactive."
      }
    },
    {
      id: 2,
      school: "Royal College",
      subGroup: "Colombo",
      date: "January 15, 2024",
      duration: "1.5 hours",
      status: "completed",
      attendees: 38,
      role: "Co-facilitator",
      achievements: ["Team Collaboration"],
      review: {
        rating: 4,
        comment: "Good support and coordination with the team. Helped manage student activities effectively."
      }
    },
    {
      id: 3,
      school: "Ananda College",
      subGroup: "Maradana",
      date: "January 20, 2024",
      duration: "2.5 hours",
      status: "pending review",
      attendees: 52,
      role: "Technical Support",
      achievements: ["Technical Excellence"],
      review: null
    }
  ]);

  const stats = {
    totalHours: seminars.reduce((acc, sem) => 
      acc + parseFloat(sem.duration.split(' ')[0]), 0),
    totalStudents: seminars.reduce((acc, sem) => acc + sem.attendees, 0),
    averageRating: (seminars
      .filter(sem => sem.review)
      .reduce((acc, sem) => acc + (sem.review ? sem.review.rating : 0), 0) / 
      seminars.filter(sem => sem.review).length
    ).toFixed(1)
  };

  const filteredSeminars = seminars.filter(seminar => 
    seminar.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seminar.subGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">My Seminar History</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-600">Total Hours</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {stats.totalHours}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-600">Students Reached</p>
                    <p className="text-2xl font-bold text-green-700">
                      {stats.totalStudents}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-yellow-600">Average Rating</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {stats.averageRating}/5
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Search seminars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
            <Select
              value={timeFilter}
              onValueChange={setTimeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Seminars</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSeminars.map(seminar => (
                <SeminarCard key={seminar.id} seminar={seminar} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSeminars
                .filter(seminar => seminar.status === 'completed')
                .map(seminar => (
                  <SeminarCard key={seminar.id} seminar={seminar} />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSeminars
                .filter(seminar => seminar.status === 'pending review')
                .map(seminar => (
                  <SeminarCard key={seminar.id} seminar={seminar} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VolunteerDashboard;