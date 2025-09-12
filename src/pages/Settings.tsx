import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Users, 
  Database,
  Download,
  Upload,
  Trash2,
  Save
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings = () => {
  const [schoolName, setSchoolName] = useState("Delhi Public School");
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const saveSettings = () => {
    const settings = {
      schoolName,
      academicYear,
      notifications,
      autoBackup,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('eduSmart_settings', JSON.stringify(settings));
    console.log('Settings saved');
  };

  const exportData = () => {
    // In real app, export all data as JSON/CSV
    console.log('Export all data');
  };

  const importData = () => {
    // In real app, show file picker and import data
    console.log('Import data');
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      console.log('All data cleared');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your Smart Classroom system preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* School Information */}
          <DashboardCard title="School Information" icon={SettingsIcon}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  School Name
                </label>
                <Input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter school name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Academic Year
                </label>
                <Select value={academicYear} onValueChange={setAcademicYear}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Time Zone
                </label>
                <Select defaultValue="IST">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                    <SelectItem value="UTC">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </DashboardCard>

          {/* Notification Settings */}
          <DashboardCard title="Notifications" icon={Bell}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications for important updates
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Email Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get email reminders for upcoming classes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Attendance Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Alert when student attendance is low
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </DashboardCard>

          {/* User Management */}
          <DashboardCard title="User Management" icon={Users}>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium text-foreground">Teachers</div>
                  <Button size="sm" variant="outline">Add Teacher</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Mrs. Sharma</div>
                      <div className="text-sm text-muted-foreground">Mathematics</div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">Mr. Kumar</div>
                      <div className="text-sm text-muted-foreground">Physics</div>
                    </div>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="font-medium text-foreground">Classes</div>
                  <Button size="sm" variant="outline">Add Class</Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {["10A", "10B", "11A", "11B", "12A", "12B"].map(cls => (
                    <div key={cls} className="p-3 bg-muted/50 rounded-lg text-center">
                      <div className="font-medium">Class {cls}</div>
                      <div className="text-sm text-muted-foreground">45 students</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Data Management */}
          <DashboardCard title="Data Management" icon={Database}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Auto Backup</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically backup data to local storage
                  </div>
                </div>
                <Switch
                  checked={autoBackup}
                  onCheckedChange={setAutoBackup}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                
                <Button variant="outline" onClick={importData}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
                
                <Button variant="destructive" onClick={clearAllData}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  <strong>Data Storage:</strong> All data is stored locally on your device. 
                  No information is sent to external servers.
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* About */}
          <DashboardCard title="About EduSmart" icon={Database}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-foreground">Version</div>
                  <div className="text-muted-foreground">1.0.0</div>
                </div>
                <div>
                  <div className="font-medium text-foreground">Last Updated</div>
                  <div className="text-muted-foreground">January 2024</div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-sm text-foreground">
                  <strong>Smart Classroom & Timetable Scheduler</strong><br />
                  Designed for Indian educational institutions with offline-first approach, 
                  intuitive interface, and intelligent scheduling capabilities.
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={saveSettings} className="gradient-primary text-white">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;