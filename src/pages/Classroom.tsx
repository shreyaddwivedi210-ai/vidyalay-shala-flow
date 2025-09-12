import { useState } from "react";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Link as LinkIcon,
  Users,
  Calendar,
  Clock,
  Download,
  Plus
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Classroom = () => {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [userRole, setUserRole] = useState<"teacher" | "student">("teacher");

  const subjects = [
    { id: "math", name: "Mathematics", color: "bg-blue-500" },
    { id: "physics", name: "Physics", color: "bg-green-500" },
    { id: "chemistry", name: "Chemistry", color: "bg-purple-500" },
    { id: "english", name: "English", color: "bg-orange-500" },
  ];

  const resources = [
    {
      id: 1,
      title: "Quadratic Equations Worksheet",
      type: "pdf",
      subject: "math",
      uploadedBy: "Mrs. Sharma",
      date: "2024-01-15",
      downloads: 45
    },
    {
      id: 2,
      title: "Physics Lab Demo - Pendulum",
      type: "video",
      subject: "physics",
      uploadedBy: "Mr. Kumar",
      date: "2024-01-14",
      downloads: 32
    },
    {
      id: 3,
      title: "Chemical Bonding Notes",
      type: "link",
      subject: "chemistry",
      uploadedBy: "Dr. Patel",
      date: "2024-01-13",
      downloads: 28
    }
  ];

  const attendance = [
    { name: "Rahul Sharma", rollNo: "101", status: "present" as const },
    { name: "Priya Patel", rollNo: "102", status: "present" as const },
    { name: "Arjun Singh", rollNo: "103", status: "late" as const },
    { name: "Sneha Gupta", rollNo: "104", status: "absent" as const },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf": return FileText;
      case "video": return Video;
      case "link": return LinkIcon;
      default: return FileText;
    }
  };

  const toggleAttendance = (index: number) => {
    // In real app, this would update local storage
    console.log(`Toggle attendance for student ${index}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Smart Classroom</h1>
            <p className="text-muted-foreground">
              Manage resources, track attendance, and engage with your classroom
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={userRole} onValueChange={(value: "teacher" | "student") => setUserRole(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher">Teacher</SelectItem>
                <SelectItem value="student">Student</SelectItem>
              </SelectContent>
            </Select>
            
            {userRole === "teacher" && (
              <Button className="gradient-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Subject Filter */}
          <div className="lg:col-span-1">
            <DashboardCard title="Subjects" icon={BookOpen}>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedSubject("all")}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSubject === "all" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  All Subjects
                </button>
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedSubject === subject.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                    <span>{subject.name}</span>
                  </button>
                ))}
              </div>
            </DashboardCard>

            {/* Today's Classes */}
            <div className="mt-6">
              <DashboardCard title="Today's Schedule" icon={Calendar}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Physics</div>
                      <div className="text-sm text-muted-foreground">Room 201</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">10:30 AM</div>
                      <StatusBadge status="active">Active</StatusBadge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Chemistry</div>
                      <div className="text-sm text-muted-foreground">Lab 101</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">12:00 PM</div>
                      <StatusBadge status="scheduled">Next</StatusBadge>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Resources Section */}
            <DashboardCard title="Learning Resources" icon={FileText} className="mb-6">
              <div className="mb-4">
                <Input 
                  placeholder="Search resources..." 
                  className="max-w-md"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources
                  .filter(resource => selectedSubject === "all" || resource.subject === selectedSubject)
                  .map((resource) => {
                    const IconComponent = getResourceIcon(resource.type);
                    return (
                      <div key={resource.id} className="p-4 bg-muted/50 rounded-lg hover-glow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-accent rounded-lg">
                              <IconComponent className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{resource.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                by {resource.uploadedBy}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{resource.date}</span>
                            <span className="flex items-center space-x-1">
                              <Download className="h-3 w-3" />
                              <span>{resource.downloads}</span>
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            {resource.type === "link" ? "Open" : "Download"}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </DashboardCard>

            {/* Attendance Section - Only for Teachers */}
            {userRole === "teacher" && (
              <DashboardCard title="Attendance Tracking" icon={Users}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attendance.map((student, index) => (
                    <div key={student.rollNo} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{student.name}</div>
                        <div className="text-sm text-muted-foreground">Roll No: {student.rollNo}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <StatusBadge status={student.status}>
                          {student.status}
                        </StatusBadge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleAttendance(index)}
                        >
                          Toggle
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <div className="font-medium text-foreground">Today's Summary</div>
                    <div className="text-sm text-muted-foreground">
                      Present: 2 • Late: 1 • Absent: 1
                    </div>
                  </div>
                  <Button className="gradient-primary text-white">
                    Save Attendance
                  </Button>
                </div>
              </DashboardCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classroom;