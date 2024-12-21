'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from 'lucide-react';
import { addSeminarData } from '@/utils/supabaseRequests';
import { useAuth } from '@clerk/nextjs';

interface CreateSeminarFormProps {
  onSeminarCreate: (newSeminar: any) => void;
}

const CreateSeminarForm: React.FC<CreateSeminarFormProps> = ({ onSeminarCreate }) => {
  const [formData, setFormData] = useState({
    school: '',
    location: '',
    subGroup: '',
    date: '',
    contactDetails: '',
    remainingSlots: '',
  });

  const {getToken} = useAuth();

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    addSeminarData(formData)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Create New Seminar
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {showSuccess && (
                <Alert className="bg-green-50 text-green-700 border-green-200">
                  <AlertDescription>
                    Seminar created successfully!
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="school" className="font-medium">
                      School Name
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="font-medium">
                      Google Maps Location URL
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                      required
                      placeholder="https://maps.google.com/..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="subGroup" className="font-medium">
                      Sub Group (Optional)
                    </Label>
                    <Input
                      id="subGroup"
                      name="subGroup"
                      value={formData.subGroup}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date" className="font-medium">
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactDetails" className="font-medium">
                      Contact Details
                    </Label>
                    <Input
                      id="contactDetails"
                      name="contactDetails"
                      value={formData.contactDetails}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                      required
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="remainingSlots" className="font-medium">
                      Total Available Slots
                    </Label>
                    <Input
                      id="remainingSlots"
                      name="remainingSlots"
                      type="number"
                      value={formData.remainingSlots}
                      onChange={handleChange}
                      className="mt-1 w-full border rounded-md p-2"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 flex-1"
                  >
                    Create Seminar
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setFormData({
                      school: '',
                      location: '',
                      subGroup: '',
                      date: '',
                      contactDetails: '',
                      remainingSlots: '',
                    })}
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
                  >
                    Reset Form
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Example of how to integrate this with the main dashboard
const SeminarManagement = () => {
  const [seminars, setSeminars] = useState<any[]>([]);

  const handleCreateSeminar = (newSeminar: any) => {
    setSeminars(prev => [...prev, newSeminar]);
  };

  return (
    <div>
      <CreateSeminarForm onSeminarCreate={handleCreateSeminar} />
    </div>
  );
};

export default SeminarManagement;