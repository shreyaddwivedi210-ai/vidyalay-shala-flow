import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp,
  Clock,
  Bell,
  FileText,
  Award
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", status: "completed" as const },
    { time: "10:30 AM", subject: "Physics", status: "active" as const },
    { time: "12:00 PM", subject: "Chemistry", status: "scheduled" as const },
    { time: "02:00 PM", subject: "English", status: "scheduled" as const },
  ];

  const announcements = [
    "Parent-Teacher meeting scheduled for next week",
    "Science lab equipment maintenance tomorrow",
    "New online resources available for Class 10"
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Smart Classroom
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Empowering education through intelligent scheduling and management
            </p>
            <button 
              onClick={() => navigate("/classroom")}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Today's Classes"
            subtitle="4 scheduled"
            icon={Calendar}
            gradient
          >
            <div className="text-2xl font-bold text-white">4</div>
          </DashboardCard>

          <DashboardCard
            title="Attendance Rate"
            subtitle="This week"
            icon={Users}
          >
            <div className="text-2xl font-bold text-foreground">92%</div>
          </DashboardCard>

          <DashboardCard
            title="Active Students"
            subtitle="Currently online"
            icon={TrendingUp}
          >
            <div className="text-2xl font-bold text-foreground">45</div>
          </DashboardCard>

          <DashboardCard
            title="Resources"
            subtitle="Available materials"
            icon={BookOpen}
          >
            <div className="text-2xl font-bold text-foreground">128</div>
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <DashboardCard
              title="Today's Schedule"
              subtitle={`${new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}`}
              icon={Clock}
            >
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        {item.time}
                      </div>
                      <div className="font-medium text-foreground">
                        {item.subject}
                      </div>
                    </div>
                    <StatusBadge status={item.status}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </StatusBadge>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>

          {/* Announcements */}
          <div>
            <DashboardCard
              title="Announcements"
              subtitle="Latest updates"
              icon={Bell}
            >
              <div className="space-y-3">
                {announcements.map((announcement, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-foreground">{announcement}</p>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DashboardCard
              title="Manage Classroom"
              subtitle="Resources & attendance"
              icon={BookOpen}
              onClick={() => navigate("/classroom")}
            />
            
            <DashboardCard
              title="Schedule Classes"
              subtitle="Create timetables"
              icon={Calendar}
              onClick={() => navigate("/timetable")}
            />
            
            <DashboardCard
              title="View Reports"
              subtitle="Performance analytics"
              icon={Award}
              onClick={() => navigate("/reports")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;