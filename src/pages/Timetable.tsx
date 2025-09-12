import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Download,
  Save
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeSlot {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  class: string;
}

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  const [draggedSlot, setDraggedSlot] = useState<TimeSlot | null>(null);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const classes = ["10A", "10B", "11A", "11B", "12A", "12B"];
  
  const subjects = [
    { name: "Mathematics", teacher: "Mrs. Sharma", color: "bg-blue-500" },
    { name: "Physics", teacher: "Mr. Kumar", color: "bg-green-500" },
    { name: "Chemistry", teacher: "Dr. Patel", color: "bg-purple-500" },
    { name: "English", teacher: "Ms. Singh", color: "bg-orange-500" },
    { name: "Biology", teacher: "Dr. Gupta", color: "bg-red-500" },
  ];

  const [schedule, setSchedule] = useState<TimeSlot[]>([
    {
      id: "1",
      subject: "Mathematics",
      teacher: "Mrs. Sharma",
      room: "Room 101",
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      class: "10A"
    },
    {
      id: "2",
      subject: "Physics",
      teacher: "Mr. Kumar",
      room: "Room 201",
      day: "Monday",
      startTime: "10:30",
      endTime: "12:00",
      class: "10A"
    },
    {
      id: "3",
      subject: "Chemistry",
      teacher: "Dr. Patel",
      room: "Lab 101",
      day: "Tuesday",
      startTime: "09:00",
      endTime: "10:30",
      class: "10A"
    }
  ]);

  const getScheduleForSlot = (day: string, time: string) => {
    return schedule.find(slot => 
      slot.day === day && 
      slot.startTime === time && 
      slot.class === selectedClass
    );
  };

  const handleDragStart = (slot: TimeSlot) => {
    setDraggedSlot(slot);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (day: string, time: string) => {
    if (!draggedSlot) return;

    // Check for conflicts
    const existingSlot = getScheduleForSlot(day, time);
    if (existingSlot && existingSlot.id !== draggedSlot.id) {
      setConflicts([`Conflict detected: ${day} at ${time}`]);
      return;
    }

    // Update schedule
    setSchedule(prev => prev.map(slot => 
      slot.id === draggedSlot.id 
        ? { ...slot, day, startTime: time }
        : slot
    ));
    
    setDraggedSlot(null);
    setConflicts([]);
  };

  const addNewClass = () => {
    // In a real app, this would open a modal
    console.log("Add new class");
  };

  const exportTimetable = () => {
    // In a real app, this would generate a PDF
    console.log("Export timetable");
  };

  const saveTimetable = () => {
    // Save to localStorage
    localStorage.setItem(`timetable_${selectedClass}`, JSON.stringify(schedule));
    console.log("Timetable saved");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Timetable Scheduler</h1>
            <p className="text-muted-foreground">
              Create and manage class schedules with intelligent conflict detection
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={exportTimetable}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button className="gradient-primary text-white" onClick={saveTimetable}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Conflicts Alert */}
        {conflicts.length > 0 && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Scheduling Conflicts</span>
            </div>
            <ul className="mt-2 text-sm text-destructive/80">
              {conflicts.map((conflict, index) => (
                <li key={index}>• {conflict}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Subject Pool */}
          <div className="lg:col-span-1">
            <DashboardCard title="Available Subjects" icon={Calendar}>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="p-3 bg-muted/50 rounded-lg cursor-move hover:bg-muted transition-colors"
                    draggable
                    onDragStart={() => handleDragStart({
                      id: `new-${Date.now()}`,
                      subject: subject.name,
                      teacher: subject.teacher,
                      room: "TBD",
                      day: "",
                      startTime: "",
                      endTime: "",
                      class: selectedClass
                    })}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                      <div>
                        <div className="font-medium text-sm">{subject.name}</div>
                        <div className="text-xs text-muted-foreground">{subject.teacher}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full mt-4 gradient-secondary text-white" 
                onClick={addNewClass}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </DashboardCard>

            {/* Quick Stats */}
            <div className="mt-6">
              <DashboardCard title="Schedule Stats" icon={Clock}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Classes</span>
                    <span className="font-medium">{schedule.filter(s => s.class === selectedClass).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Free Periods</span>
                    <span className="font-medium">{25 - schedule.filter(s => s.class === selectedClass).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conflicts</span>
                    <span className="font-medium text-destructive">{conflicts.length}</span>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="lg:col-span-3">
            <DashboardCard title={`Class ${selectedClass} Timetable`} icon={Calendar}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Time</th>
                      {days.map(day => (
                        <th key={day} className="p-3 text-left text-sm font-medium text-muted-foreground">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(time => (
                      <tr key={time} className="border-t border-border">
                        <td className="p-3 font-medium text-sm">
                          {time}
                        </td>
                        {days.map(day => {
                          const slot = getScheduleForSlot(day, time);
                          return (
                            <td
                              key={`${day}-${time}`}
                              className="p-2"
                              onDragOver={handleDragOver}
                              onDrop={() => handleDrop(day, time)}
                            >
                              {slot ? (
                                <div
                                  className="p-3 bg-primary/10 border border-primary/20 rounded-lg cursor-move hover:bg-primary/20 transition-colors"
                                  draggable
                                  onDragStart={() => handleDragStart(slot)}
                                >
                                  <div className="font-medium text-sm text-foreground">
                                    {slot.subject}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {slot.teacher}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {slot.room}
                                  </div>
                                  
                                  <div className="flex justify-end space-x-1 mt-2">
                                    <button className="p-1 hover:bg-primary/20 rounded">
                                      <Edit className="h-3 w-3" />
                                    </button>
                                    <button className="p-1 hover:bg-destructive/20 rounded text-destructive">
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="h-20 border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm hover:border-primary/50 transition-colors">
                                  Drop here
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;