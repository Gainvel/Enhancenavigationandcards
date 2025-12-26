import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Undo2, ChevronUp, Plus, Save, Trash2, Upload } from "lucide-react";
import clsx from "clsx";
import { Camera } from "./CameraCard";
import { StreetZoneGroup } from "./CameraManagementView";
import { StreetZoneGroupCard } from "./StreetZoneGroupCard";
import { DesignatedZoneItem } from "./DesignatedZoneItem";
import { CameraActionsMenu } from "./CameraActionsMenu";
import svgPaths from "../../imports/svg-ojo5e3p09l";

// SVG Icons from original sidebar
function VerifiedUser({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-[4.95%_12.5%_4.17%_12.5%]">
        <svg className="block size-full" fill="none" viewBox="0 0 7.5 9.08">
          <path d={svgPaths.p1abd6900} fill="white" />
        </svg>
      </div>
    </div>
  );
}

function MoreVert({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="absolute inset-[16.67%_41.67%]">
        <svg className="block size-full" fill="none" viewBox="0 0 4 16">
          <path d={svgPaths.p56f6880} fill="white" />
        </svg>
      </div>
    </div>
  );
}

interface Zone {
  id: string;
  status: "Occupied" | "Available";
}

// Mock data for demonstration
const MOCK_DESIGNATED_ZONES = [
  { id: "ZN-A01-001-01-Z01", status: "Occupied" as const },
  { id: "ZN-A01-001-01-Z02", status: "Available" as const },
  { id: "ZN-A01-001-01-Z03", status: "Available" as const },
  { id: "ZN-A01-001-01-Z04", status: "Occupied" as const },
];

const MOCK_STREET_ZONES: StreetZoneGroup[] = [
  {
    id: "AA001",
    name: "Zone AA001",
    segments: [
      { id: "No Parking", status: "Blocked", position: 0, size: 30 },
      { id: "Vehicle - C174536", status: "Occupied", vehicleId: "C174536", position: 30, size: 199 },
      { id: "No Parking", status: "Blocked", position: 229, size: 9 },
      { id: "Vehicle - C175352", status: "Occupied", vehicleId: "C175352", position: 238, size: 229 },
      { id: "No Parking", status: "Blocked", position: 467, size: 31 },
    ]
  },
  {
    id: "AA002",
    name: "Zone AA002",
    segments: [
      { id: "No Parking", status: "Blocked", position: 0, size: 45 },
      { id: "Available Space", status: "Available", position: 45, size: 180 },
      { id: "No Parking", status: "Blocked", position: 225, size: 15 },
    ]
  }
];

const ZONE_ACTION_BUTTONS = [
  { id: 'create', label: 'Create', icon: Plus, color: '#C7FFBF' },
  { id: 'save', label: 'Save', icon: Save, color: '#C7FFBF' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: '#FFB4B4' },
  { id: 'upload', label: 'Upload', icon: Upload, color: '#C7FFBF' },
];

interface SidebarManagementProps {
  camera: Camera;
  onBack: () => void;
}

export function SidebarManagement({ camera, onBack }: SidebarManagementProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [zoneMode, setZoneMode] = useState<"street" | "designated">("designated");
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const designatedZones = MOCK_DESIGNATED_ZONES;
  const streetZones = MOCK_STREET_ZONES;

  const handleButtonClick = (buttonId: string) => {
    if (buttonId === 'mode') {
      setZoneMode(prev => prev === 'designated' ? 'street' : 'designated');
    }
    // Handle other button actions here
  };

  return (
    <>
      <motion.div 
        initial={false}
        className="w-[245px] h-full flex flex-col"
        style={{ 
          backgroundImage: "linear-gradient(rgb(32, 32, 32) 0%, rgb(32, 32, 32) 76.699%, rgb(31, 31, 31) 84.942%, rgb(32, 32, 32) 85.159%, rgb(32, 32, 32) 100%)" 
        }}
      >
        {/* Header Section - Matched with original sidebar */}
        <div className="flex-none relative">
          <div className="h-[66px] relative">
            <p className="absolute font-['Chillax:Semibold',sans-serif] left-[23px] text-[19px] text-white top-[13px]">
              Ontairox LLC
            </p>
            <p className="absolute font-['Chillax:Light',sans-serif] left-[23px] text-[12px] text-white top-[33px]">
              jaadesk@gmail.com
            </p>
            <VerifiedUser className="absolute left-[143px] size-[10px] top-[37px]" />
            <MoreVert className="absolute left-[221px] size-[24px] top-[21px]" />
          </div>
          <div className="h-px bg-[#282828] mx-[9px]" />
        </div>

        {/* Back Button - Undo Arrow */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-none mt-3 mx-[9px]"
        >
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-white/5 rounded transition-all group"
          >
            <Undo2 size={16} className="text-[#959595] group-hover:text-[#C7FFBF] transition-colors" />
          </button>
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
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <DesignatedZoneItem
                      zone={zone}
                      isSelected={selectedZone === zone.id}
                      onSelect={() => setSelectedZone(zone.id)}
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
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <StreetZoneGroupCard
                      group={group}
                      isSelected={selectedZone === group.id}
                      onSelect={() => setSelectedZone(group.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Zone & Camera Actions - Bottom Section */}
        <div className="flex-none">
          {/* Camera Actions Trigger - Centered above divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mb-1"
          >
            <button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="flex items-center gap-1 px-3 py-1 hover:bg-white/5 rounded transition-colors group"
            >
              <span className="text-[9px] font-medium text-[#707070] group-hover:text-[#959595] transition-colors">
                Camera Actions
              </span>
              <ChevronUp 
                size={12} 
                className={clsx(
                  "text-[#707070] group-hover:text-[#959595] transition-all",
                  showActionsMenu && "rotate-180"
                )}
              />
            </button>
          </motion.div>

          <div className="h-px bg-[#282828] mx-[9px] mb-3" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-[9px] pb-4"
          >
            {/* Zone Actions - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              {ZONE_ACTION_BUTTONS.map((button, index) => {
                const Icon = button.icon;
                return (
                  <motion.button
                    key={button.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + index * 0.03 }}
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
                    onClick={() => handleButtonClick(button.id)}
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
          </motion.div>
        </div>
      </motion.div>

      {/* Camera Actions Menu Panel - Extends to the right */}
      <AnimatePresence>
        {showActionsMenu && (
          <CameraActionsMenu onModeToggle={() => setZoneMode(prev => prev === 'designated' ? 'street' : 'designated')} />
        )}
      </AnimatePresence>
    </>
  );
}