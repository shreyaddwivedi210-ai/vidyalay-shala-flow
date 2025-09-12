interface StatusBadgeProps {
  status: "present" | "absent" | "late" | "active" | "scheduled" | "completed";
  children: React.ReactNode;
}

const StatusBadge = ({ status, children }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "present":
      case "active":
      case "completed":
        return "bg-success text-success-foreground";
      case "absent":
        return "bg-destructive text-destructive-foreground";
      case "late":
      case "scheduled":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {children}
    </span>
  );
};

export default StatusBadge;