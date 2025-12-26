import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Undo2, ChevronRight, Plus, Save, Trash2, Upload } from "lucide-react";
import clsx from "clsx";
import { Camera } from "./CameraCard";
import { ZoneMode, StreetZoneGroup } from "./types";
import { StreetZoneGroupCard } from "./StreetZoneGroupCard";
import { DesignatedZoneItem } from "./DesignatedZoneItem";
import { CameraActionsMenu } from "./CameraActionsMenu";

interface Zone {
  id: string;
  status: "Occupied" | "Available";
}

interface CameraManagementSidebarProps {
  camera: Camera;
  zoneMode: ZoneMode;
  onZoneModeChange: (mode: ZoneMode) => void;
  designatedZones: Zone[];
  streetZones: StreetZoneGroup[];
  selectedZone: string | null;
  onZoneSelect: (zoneId: string | null) => void;
  onBack: () => void;
}

const ACTION_BUTTONS = [
  { id: 'create', label: 'Create', icon: Plus, color: '#C7FFBF' },
  { id: 'save', label: 'Save', icon: Save, color: '#C7FFBF' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: '#FFB4B4' },
  { id: 'upload', label: 'Upload', icon: Upload, color: '#C7FFBF' },
];

export function CameraManagementSidebar({
  camera,
  zoneMode,
  onZoneModeChange,
  designatedZones,
  streetZones,
  selectedZone,
  onZoneSelect,
  onBack
}: CameraManagementSidebarProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const BOTTOM_SECTION_HEIGHT = 169; // Fixed height: 1px line + 8px margin + 136px buttons + 24px padding

  return (
    <>
      <motion.div 
        initial={false}
        className="w-[245px] h-full flex flex-col relative"
        style={{ 
          backgroundImage: "linear-gradient(rgb(32, 32, 32) 0%, rgb(32, 32, 32) 76.699%, rgb(31, 31, 31) 84.942%, rgb(32, 32, 32) 85.159%, rgb(32, 32, 32) 100%)" 
        }}
      >
        {/* Header Section - Integrated Back Button */}
        <div className="flex-none">
          <div className="h-[66px] px-[23px] flex items-center relative overflow-hidden">
            {/* Back Arrow - Slides in */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
              className="absolute left-[15px] z-10"
            >
              <button
                onClick={onBack}
                className="p-1.5 hover:bg-white/5 rounded-md transition-colors group"
              >
                <Undo2 size={16} className="text-[#959595] group-hover:text-[#C7FFBF] transition-colors" />
              </button>
            </motion.div>
            
            {/* Title Text - Slides right to make room */}
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: 26 }} 
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <p className="font-['Chillax:Semibold',sans-serif] text-[19px] text-white">
                Ontairox LLC
              </p>
              <p className="font-['Chillax:Light',sans-serif] text-[12px] text-white mt-0.5">
                jaadesk@gmail.com
              </p>
            </motion.div>
          </div>
          <div className="h-px bg-[#282828] mx-[9px]" />
        </div>

        {/* Zone Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-none mt-4 mx-[9px]"
        >
          <div className="flex gap-1 p-1 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
            <button
              onClick={() => onZoneModeChange('designated')}
              className={clsx(
                "flex-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all",
                zoneMode === 'designated'
                  ? "bg-[#C7FFBF] text-black"
                  : "text-[#808080] hover:text-white hover:bg-white/5"
              )}
            >
              Designated
            </button>
            <button
              onClick={() => onZoneModeChange('street')}
              className={clsx(
                "flex-1 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all",
                zoneMode === 'street'
                  ? "bg-[#C7FFBF] text-black"
                  : "text-[#808080] hover:text-white hover:bg-white/5"
              )}
            >
              Street
            </button>
          </div>
        </motion.div>

        {/* Zone List - Scrollable */}
        <div className="flex-1 overflow-y-auto mt-4 px-[9px] custom-scrollbar">
          <AnimatePresence mode="wait">
            {zoneMode === 'designated' ? (
              <motion.div
                key="designated"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {designatedZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <DesignatedZoneItem
                      zone={zone}
                      isSelected={selectedZone === zone.id}
                      onSelect={() => onZoneSelect(zone.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="street"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {streetZones.map((group, index) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <StreetZoneGroupCard
                      group={group}
                      isSelected={selectedZone === group.id}
                      onSelect={() => onZoneSelect(group.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons - Bottom Section */}
        <div className="flex-none relative">
          <div className="h-px bg-[#282828] mx-[9px] mb-2" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-[9px] pb-6 grid grid-cols-2 gap-2"
          >
            {ACTION_BUTTONS.map((button, index) => {
              const Icon = button.icon;
              return (
                <motion.button
                  key={button.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 + index * 0.05 }}
                  className="flex flex-col items-center justify-center gap-1.5 h-[64px] rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] hover:border-opacity-100 transition-all group relative overflow-hidden"
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
                    className="text-[#606060] group-hover:drop-shadow-[0_0_4px_currentColor] transition-all"
                    style={{ 
                      color: '#606060'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = button.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#606060';
                    }}
                  />
                  <span className="text-[10px] font-bold text-[#808080] group-hover:text-white transition-colors uppercase tracking-wide">
                    {button.label}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      {/* Camera Actions Menu - Always render to show notch */}
      <CameraActionsMenu 
        camera={camera} 
        onClose={() => setShowActionsMenu(false)}
        height={BOTTOM_SECTION_HEIGHT}
        isExpanded={showActionsMenu}
        onToggle={() => setShowActionsMenu(prev => !prev)}
        zoneMode={zoneMode}
        onZoneModeChange={onZoneModeChange}
      />
    </>
  );
}
