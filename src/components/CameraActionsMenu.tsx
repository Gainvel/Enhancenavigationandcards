import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Activity, FileText, Info, Settings, ToggleLeft, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { ZoneMode } from "./types";

const CAMERA_ACTION_BUTTONS = [
  { id: 'console', label: 'Console', icon: Terminal, color: '#C7FFBF' },
  { id: 'health', label: 'Health', icon: Activity, color: '#C7FFBF' },
  { id: 'logs', label: 'Logs', icon: FileText, color: '#C7FFBF' },
  { id: 'info', label: 'Information', icon: Info, color: '#C7FFBF' },
  { id: 'settings', label: 'Settings', icon: Settings, color: '#C7FFBF' },
  { id: 'mode', label: 'Mode Toggle', icon: ToggleLeft, color: '#C7FFBF' },
];

interface CameraActionsMenuProps {
  camera: any;
  onClose: () => void;
  height: number;
  isExpanded: boolean;
  onToggle: () => void;
  zoneMode: ZoneMode;
  onZoneModeChange: (mode: ZoneMode) => void;
}

export function CameraActionsMenu({ camera, onClose, height, isExpanded, onToggle, zoneMode, onZoneModeChange }: CameraActionsMenuProps) {
  if (!height) return null; // Don't render until we have the height

  // Calculate the number of columns and rows
  const totalButtons = CAMERA_ACTION_BUTTONS.length;
  const rows = 2; // Fixed 2 rows
  const cols = Math.ceil(totalButtons / rows);

  // Group buttons into columns
  const columnedButtons: typeof CAMERA_ACTION_BUTTONS[][] = [];
  for (let col = 0; col < cols; col++) {
    const column = [];
    for (let row = 0; row < rows; row++) {
      const index = col * rows + row;
      if (index < totalButtons) {
        column.push(CAMERA_ACTION_BUTTONS[index]);
      }
    }
    columnedButtons.push(column);
  }

  return (
    <div 
      className="absolute bottom-0 left-[245px] pointer-events-none z-20"
      style={{ height: `${height}px` }}
    >
      {/* The expanding bar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "calc(100vw - 245px)" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 overflow-hidden pointer-events-auto"
            style={{ 
              backgroundImage: "linear-gradient(rgb(32, 32, 32) 0%, rgb(32, 32, 32) 76.699%, rgb(31, 31, 31) 84.942%, rgb(32, 32, 32) 85.159%, rgb(32, 32, 32) 100%)",
            }}
          >
            <div className="h-full">
              {/* Segmentation line */}
              <div className="h-px bg-[#282828] mx-[9px] mb-2" />
              
              {/* Action Buttons in columns */}
              <div className="flex items-start gap-2 px-[9px] pb-6">
                {columnedButtons.map((column, colIndex) => (
                  <div key={colIndex} className="flex flex-col gap-2 w-[109px] flex-none">
                    {column.map((button, rowIndex) => {
                      const buttonIndex = colIndex * rows + rowIndex;
                      
                      // Special handling for Mode Toggle button
                      if (button.id === 'mode') {
                        const isStreet = zoneMode === 'street';
                        return (
                          <motion.button
                            key={button.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.2 + buttonIndex * 0.05, duration: 0.3 }}
                            className="flex flex-col items-center justify-center gap-1.5 h-[64px] rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] hover:border-opacity-100 transition-all group relative overflow-hidden w-full"
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
                            onClick={() => onZoneModeChange(isStreet ? 'designated' : 'street')}
                          >
                            {/* Toggle Indicator */}
                            <div className="relative w-8 h-4 bg-[#2A2A2A] rounded-full p-0.5 border border-[#3A3A3A] group-hover:border-[#C7FFBF] transition-colors flex items-center">
                              <motion.div 
                                className="w-3 h-3 rounded-full bg-[#606060] group-hover:bg-[#C7FFBF] shadow-sm"
                                animate={{ x: isStreet ? 14 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            </div>
                            <span className="text-[10px] font-bold text-[#808080] group-hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
                              {isStreet ? 'Street Mode' : 'Designated Mode'}
                            </span>
                          </motion.button>
                        );
                      }

                      // Standard buttons
                      const Icon = button.icon;
                      return (
                        <motion.button
                          key={button.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: 0.2 + buttonIndex * 0.05, duration: 0.3 }}
                          className="flex flex-col items-center justify-center gap-1.5 h-[64px] rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] hover:border-opacity-100 transition-all group relative overflow-hidden w-full"
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
                            console.log(`${button.label} clicked`);
                          }}
                        >
                          <Icon 
                            size={16} 
                            className="text-[#606060] group-hover:drop-shadow-[0_0_4px_currentColor] transition-all"
                            style={{ color: '#606060' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = button.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#606060';
                            }}
                          />
                          <span className="text-[10px] font-bold text-[#808080] group-hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
                            {button.label}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notch - travels from sidebar edge to screen edge */}
      <motion.button
        onClick={onToggle}
        className="absolute top-1/2 -translate-y-1/2 pointer-events-auto z-30"
        animate={{ 
          left: isExpanded ? "calc(100vw - 245px - 22px)" : 0 
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ 
          width: '22px', 
          height: '80px',
        }}
      >
        <div className="relative w-full h-full">
          {/* When EXPANDED: render notch with left curves and inverse curves */}
          {isExpanded ? (
            <>
              {/* Main notch rectangle */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundColor: 'rgba(199, 255, 191, 0.2)',
                  filter: 'drop-shadow(0 0 8px rgba(199, 255, 191, 0.2))',
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '10px',
                }}
              />
              
              {/* Top inverse curve - connects bar to notch */}
              <div 
                className="absolute w-3 h-3 overflow-hidden"
                style={{ 
                  left: '-12px', 
                  top: '-12px',
                }}
              >
                <div 
                  className="absolute bottom-0 right-0 w-full h-full"
                  style={{
                    backgroundColor: 'rgb(32, 32, 32)',
                    borderBottomRightRadius: '12px',
                  }}
                />
              </div>
              
              {/* Bottom inverse curve - connects bar to notch */}
              <div 
                className="absolute w-3 h-3 overflow-hidden"
                style={{ 
                  left: '-12px', 
                  bottom: '-12px',
                }}
              >
                <div 
                  className="absolute top-0 right-0 w-full h-full"
                  style={{
                    backgroundColor: 'rgb(32, 32, 32)',
                    borderTopRightRadius: '12px',
                  }}
                />
              </div>
              
              {/* Arrow */}
              <ChevronLeft 
                size={14} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C7FFBF]"
                style={{ filter: 'drop-shadow(0 0 4px #C7FFBF)' }}
              />
            </>
          ) : (
            /* When COLLAPSED: simple notch with right curves */
            <>
              <div 
                className="absolute inset-0 transition-colors"
                style={{
                  backgroundColor: '#1E1E1E',
                  borderTopRightRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2A2A2A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#1E1E1E';
                }}
              />
              
              <ChevronRight 
                size={14} 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#606060]"
              />
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
}