import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  gradient?: boolean;
}

const DashboardCard = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  children, 
  onClick, 
  className = "",
  gradient = false
}: DashboardCardProps) => {
  return (
    <div
      className={`card-elevated hover-lift cursor-pointer p-6 ${className} ${
        gradient ? "gradient-primary text-white" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className={`p-3 rounded-lg ${
              gradient 
                ? "bg-white/20 text-white" 
                : "bg-accent text-accent-foreground"
            }`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h3 className={`font-semibold text-lg ${
              gradient ? "text-white" : "text-foreground"
            }`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-sm ${
                gradient ? "text-white/80" : "text-muted-foreground"
              }`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;