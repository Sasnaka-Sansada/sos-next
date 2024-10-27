import React from 'react'
import { Calendar, Clock, Users, UserPlus, PlusCircle, Settings, Globe } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
        const navigationSections = {
          MEMBERS: [
            { icon: <Users className="h-5 w-5" />, text: "Members Directory", link: "/dashboard" },
            { icon: <UserPlus className="h-5 w-5" />, text: "New Members Approval", link: "/volunteers/approval" }
          ],
          "GANITHA SAVIYA": [
            { icon: <Calendar className="h-5 w-5" />, text: "Upcoming Seminars", link: "/seminars/upcoming" },
            { icon: <Users className="h-5 w-5" />, text: "Seminars Attended", link: "/seminars/attended" },
            { icon: <Clock className="h-5 w-5" />, text: "Review Seminars", link: "/seminars/feedback" },
            { icon: <PlusCircle className="h-5 w-5" />, text: "Create Seminar", link: "/seminars/create" }
          ],
          PROFILE: [
            { icon: <Settings className="h-5 w-5" />, text: "Settings", link: "/dashboard" }
          ]
        };
      
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {Object.entries(navigationSections).map(([section, items]) => (
                <div key={section} className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">{section}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item, index) => (
                      <Link href={item.link}>
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      >
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
}

export default DashboardPage