'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  Calendar, 
  Users, 
  Search,
  FileText,
  Star
} from 'lucide-react';

import { getSeminarData } from '@/utils/supabaseRequests';

interface Seminar {
  id: number;
  school: string;
  subGroup: string;
  date: string;
  status: string;
  attendees: number | null;
  review: {
    rating: string;
    comment: string;
    attendees: string;
  } | null;
}

interface PastSeminarCardProps {
  seminar: Seminar;
  onUpdateStatus: (id: number) => void;
  onAddReview: (id: number, review: { rating: string; comment: string; attendees: string }) => void;
}

const PastSeminarCard: React.FC<PastSeminarCardProps> = ({ seminar, onUpdateStatus, onAddReview }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [review, setReview] = useState({
    rating: '',
    comment: '',
    attendees: ''
  });

  const handleSubmitReview = () => {
    onAddReview(seminar.id, review);
    setIsReviewOpen(false);
    setReview({ rating: '', comment: '', attendees: '' });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{seminar.school}</h3>
            <p className="text-gray-500">{seminar.subGroup}</p>
          </div>
          <Badge 
            className={`${
              seminar.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {seminar.status === 'completed' ? 'Completed' : 'Pending Review'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{seminar.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{seminar.attendees || 'No attendance recorded'}</span>
          </div>
        </div>

        {seminar.review && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Rating: {seminar.review.rating}/5</span>
            </div>
            <p className="text-gray-600">{seminar.review.comment}</p>
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
            <DialogTrigger asChild>
              <Button 
                className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                disabled={seminar.status === 'completed'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Add Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Seminar Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Rating (1-5)</Label>
                  <Select 
                    onValueChange={(value) => setReview(prev => ({ ...prev, rating: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Star{rating !== 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Number of Attendees</Label>
                  <Input
                    type="number"
                    value={review.attendees}
                    onChange={(e) => setReview(prev => ({ ...prev, attendees: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Review Comments</Label>
                  <Textarea
                    value={review.comment}
                    onChange={(e: any) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handleSubmitReview}
                  >
                    Submit Review
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={() => setIsReviewOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            className={`flex-1 ${
              seminar.status === 'completed'
                ? 'bg-gray-100 text-gray-500'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            onClick={() => onUpdateStatus(seminar.id)}
            disabled={seminar.status === 'completed'}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark as Completed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminPastSeminars = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const seminars = await getSeminarData();
      setSeminars(seminars);
    };
    loadData();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleUpdateStatus = (seminarId: number) => {
    setSeminars(seminars.map(seminar => 
      seminar.id === seminarId 
        ? { ...seminar, status: 'completed' }
        : seminar
    ));
  };

  const handleAddReview = (seminarId: number, reviewData: { rating: string; comment: string; attendees: string }) => {
    setSeminars(seminars.map(seminar => 
      seminar.id === seminarId 
        ? { 
            ...seminar, 
            review: reviewData,
            attendees: parseInt(reviewData.attendees)
          }
        : seminar
    ));
  };

  const filteredSeminars = seminars
    .filter(seminar => 
      seminar.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seminar.subGroup.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(seminar => 
      statusFilter === 'all' ? true : seminar.status === statusFilter
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Past Seminars Management</h1>
          
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
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Seminars</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-600">Total Seminars</p>
                    <p className="text-2xl font-bold text-blue-700">{seminars.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-yellow-50 border-yellow-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-yellow-600">Pending Review</p>
                    <p className="text-2xl font-bold text-yellow-700">
                      {seminars.filter(s => s.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-600">Completed</p>
                    <p className="text-2xl font-bold text-green-700">
                      {seminars.filter(s => s.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSeminars.map(seminar => (
            <PastSeminarCard
              key={seminar.id}
              seminar={seminar}
              onUpdateStatus={handleUpdateStatus}
              onAddReview={handleAddReview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPastSeminars;