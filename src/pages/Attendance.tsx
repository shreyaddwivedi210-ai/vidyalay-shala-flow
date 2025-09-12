import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Search, 
  Filter,
  Download,
  TrendingUp,
  UserCheck,
  UserX,
  Clock
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  attendance: {
    date: string;
    status: "present" | "absent" | "late";
    subject?: string;
  }[];
}

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const classes = ["10A", "10B", "11A", "11B", "12A", "12B"];
  
  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      rollNo: "101",
      class: "10A",
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "late" },
        { date: "2024-01-12", status: "present" },
        { date: "2024-01-11", status: "absent" },
      ]
    },
    {
      id: "2",
      name: "Priya Patel",
      rollNo: "102",
      class: "10A",
      attendance: [
        { date: "2024-01-15", status: "present" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "present" },
        { date: "2024-01-12", status: "late" },
        { date: "2024-01-11", status: "present" },
      ]
    },
    {
      id: "3",
      name: "Arjun Singh",
      rollNo: "103",
      class: "10A",
      attendance: [
        { date: "2024-01-15", status: "late" },
        { date: "2024-01-14", status: "absent" },
        { date: "2024-01-13", status: "present" },
        { date: "2024-01-12", status: "present" },
        { date: "2024-01-11", status: "present" },
      ]
    },
    {
      id: "4",
      name: "Sneha Gupta",
      rollNo: "104",
      class: "10A",
      attendance: [
        { date: "2024-01-15", status: "absent" },
        { date: "2024-01-14", status: "present" },
        { date: "2024-01-13", status: "present" },
        { date: "2024-01-12", status: "present" },
        { date: "2024-01-11", status: "late" },
      ]
    }
  ]);

  const filteredStudents = students.filter(student => 
    student.class === selectedClass &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceForDate = (student: Student, date: string) => {
    return student.attendance.find(att => att.date === date)?.status || "absent";
  };

  const toggleAttendance = (studentId: string, currentStatus: string) => {
    const statuses = ["present", "late", "absent"];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    // In real app, update state and save to localStorage
    console.log(`Toggle ${studentId} to ${nextStatus}`);
  };

  const calculateStats = () => {
    const todayAttendance = filteredStudents.map(student => getAttendanceForDate(student, selectedDate));
    const present = todayAttendance.filter(status => status === "present").length;
    const late = todayAttendance.filter(status => status === "late").length;
    const absent = todayAttendance.filter(status => status === "absent").length;
    const total = filteredStudents.length;
    
    return { present, late, absent, total, rate: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const stats = calculateStats();

  const exportReport = () => {
    // In real app, generate and download report
    console.log("Export attendance report");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Management</h1>
            <p className="text-muted-foreground">
              Track and manage student attendance across all classes
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button variant="outline" onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map(cls => (
                <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Present"
            subtitle={`${stats.present}/${stats.total} students`}
            icon={UserCheck}
            gradient
          >
            <div className="text-2xl font-bold text-white">{stats.rate}%</div>
          </DashboardCard>

          <DashboardCard 
            title="Late Arrivals"
            subtitle="Today"
            icon={Clock}
          >
            <div className="text-2xl font-bold text-warning">{stats.late}</div>
          </DashboardCard>

          <DashboardCard 
            title="Absent"
            subtitle="Today"
            icon={UserX}
          >
            <div className="text-2xl font-bold text-destructive">{stats.absent}</div>
          </DashboardCard>

          <DashboardCard 
            title="Total Students"
            subtitle={`Class ${selectedClass}`}
            icon={Users}
          >
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </DashboardCard>
        </div>

        {/* Attendance List */}
        <DashboardCard 
          title={`Attendance for ${new Date(selectedDate).toLocaleDateString('en-IN')}`}
          subtitle={`Class ${selectedClass}`}
          icon={Calendar}
        >
          <div className="space-y-4">
            {filteredStudents.map((student) => {
              const todayStatus = getAttendanceForDate(student, selectedDate);
              return (
                <div key={student.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Roll No: {student.rollNo}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Recent Attendance Pattern */}
                    <div className="hidden md:flex items-center space-x-1">
                      {student.attendance.slice(0, 5).map((att, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            att.status === "present" 
                              ? "bg-success" 
                              : att.status === "late" 
                              ? "bg-warning" 
                              : "bg-destructive"
                          }`}
                          title={`${att.date}: ${att.status}`}
                        />
                      ))}
                    </div>

                    <StatusBadge status={todayStatus as any}>
                      {todayStatus.charAt(0).toUpperCase() + todayStatus.slice(1)}
                    </StatusBadge>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAttendance(student.id, todayStatus)}
                    >
                      Mark
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-4 justify-between items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-success text-success-foreground">
                Mark All Present
              </Button>
              <Button size="sm" variant="outline">
                Quick Mark
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString('en-IN')}
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Attendance;