import React from "react";
import { motion } from "motion/react";
import { Terminal, Activity, FileText, Info } from "lucide-react";

const CAMERA_ACTION_BUTTONS = [
  { id: 'console', label: 'Console', icon: Terminal, color: '#C7FFBF' },
  { id: 'health', label: 'Health', icon: Activity, color: '#C7FFBF' },
  { id: 'logs', label: 'Logs', icon: FileText, color: '#C7FFBF' },
  { id: 'info', label: 'Information', icon: Info, color: '#C7FFBF' },
];

export function CameraActionsMenu() {
  return (
    <div className="grid grid-cols-2 gap-2 mb-2">
      {CAMERA_ACTION_BUTTONS.map((button, index) => {
        const Icon = button.icon;
        return (
          <motion.button
            key={button.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] hover:border-opacity-100 transition-all group"
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
          >
            <Icon 
              size={16} 
              className="transition-all"
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
            <span className="text-[9px] font-bold text-[#808080] group-hover:text-white transition-colors uppercase tracking-wide">
              {button.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
