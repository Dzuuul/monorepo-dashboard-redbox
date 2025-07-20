import React from "react";
import { cn } from "../../lib/utils";
import { AlertCircle, Info, X } from "lucide-react";
import { Button } from "./button";

interface AnnouncementBarProps {
  show: boolean;
  type?: "info" | "warning";
  message: string;
  showActions?: boolean;
  onApply?: () => void;
  onRevert?: () => void;
  onClose?: () => void;
}

const ICONS = {
  info: Info,
  warning: AlertCircle,
};

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  show,
  type = "info",
  message,
  showActions = false,
  onApply,
  onRevert,
  onClose,
}) => {
  if (!show) return null;
  const Icon = ICONS[type] || Info;
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-2 px-4 py-2 border-b text-sm fixed top-0 left-0 right-0 z-[9999]",
        type === "info" && "bg-blue-50 text-blue-900 border-blue-200",
        type === "warning" && "bg-yellow-50 text-yellow-900 border-yellow-300"
      )}
      role={type === "warning" ? "alert" : "status"}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 shrink-0" />
        <span>{message}</span>
      </div>
      <div className="flex items-center gap-2">
        {showActions && (
          <>
            {onRevert && (
              <Button size="sm" variant="outline" onClick={onRevert}>
                Revert
              </Button>
            )}
            {onApply && (
              <Button size="sm" variant="default" onClick={onApply}>
                Apply
              </Button>
            )}
          </>
        )}
        {onClose && (
          <button
            className="ml-2 p-1 rounded hover:bg-black/10"
            onClick={onClose}
            aria-label="Tutup"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
