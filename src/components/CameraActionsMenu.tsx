import React from "react";
import { motion } from "motion/react";
import { Terminal, Activity, FileText, Info, Settings, ToggleLeft } from "lucide-react";

const CAMERA_ACTION_BUTTONS = [
  { id: 'console', label: 'Console', icon: Terminal, color: '#C7FFBF' },
  { id: 'health', label: 'Health', icon: Activity, color: '#C7FFBF' },
  { id: 'logs', label: 'Logs', icon: FileText, color: '#C7FFBF' },
  { id: 'info', label: 'Information', icon: Info, color: '#C7FFBF' },
  { id: 'settings', label: 'Settings', icon: Settings, color: '#C7FFBF' },
  { id: 'mode', label: 'Mode Toggle', icon: ToggleLeft, color: '#C7FFBF' },
];

interface CameraActionsMenuProps {
  onModeToggle?: () => void;
}

export function CameraActionsMenu({ onModeToggle }: CameraActionsMenuProps) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "200px", opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute left-full top-0 bottom-0 ml-2 overflow-hidden"
      style={{ 
        backgroundImage: "linear-gradient(rgb(32, 32, 32) 0%, rgb(32, 32, 32) 76.699%, rgb(31, 31, 31) 84.942%, rgb(32, 32, 32) 85.159%, rgb(32, 32, 32) 100%)" 
      }}
    >
      <div className="h-full flex flex-col justify-center p-3 space-y-2">
        {CAMERA_ACTION_BUTTONS.map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.button
              key={button.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] hover:border-opacity-100 transition-all group"
              style={{ 
                borderColor: `${button.color}00`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = button.color;
                e.currentTarget.style.backgroundColor = `${button.color}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2A2A2A';
                e.currentTarget.style.backgroundColor = '#1E1E1E';
              }}
              onClick={() => {
                if (button.id === 'mode' && onModeToggle) {
                  onModeToggle();
                }
              }}
            >
              <Icon 
                size={14} 
                className="transition-all flex-shrink-0"
                style={{ color: '#606060' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = button.color;
                  e.currentTarget.style.filter = `drop-shadow(0 0 4px ${button.color})`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#606060';
                  e.currentTarget.style.filter = 'none';
                }}
              />
              <span className="text-[10px] font-bold text-[#808080] group-hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
                {button.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
