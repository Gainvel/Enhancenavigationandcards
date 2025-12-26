import svgPaths from "../../imports/svg-ojo5e3p09l";
import clsx from "clsx";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera } from "./CameraCard";
import { SidebarManagement } from "./SidebarManagement";

// --- Static Icons ---
// Adjusted scale/padding to match original design (avoiding "huge" icons)

function CommunicationBell1({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <svg className="block w-[75%] h-[75%]" fill="none" viewBox="0 0 14.0009 15.5">
        <path d={svgPaths.p38bbcc60} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    </div>
  );
}

function InterfaceSettings({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <svg className="block w-[85%] h-[85%]" fill="none" viewBox="0 0 17 16.1">
        <g>
          <path d={svgPaths.pb750080} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p26aea700} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ArrowCaretUpMd1() {
  return (
    <div className="absolute left-[105px] size-[30px] top-[768px] pointer-events-none">
      <svg className="block size-full" fill="none" viewBox="0 0 30 30">
        <path d="M10 17.5L15 12.5L20 17.5" stroke="#707070" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
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

function Bedtime({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "flex items-center justify-center")}>
      <svg className="block w-[75%] h-[75%]" fill="none" viewBox="0 0 15.245 16.639">
        <path d={svgPaths.p13d24280} fill="currentColor" />
      </svg>
    </div>
  );
}

// --- Dynamic Navigation ---

const MENU_ITEMS = [
  { id: 'home', label: 'Home', iconPath: svgPaths.p32bd3f80, stroke: true },
  { id: 'cameras', label: 'Cameras', iconPath: svgPaths.p1d5c4ec0, stroke: true },
  { id: 'incidents', label: 'Incidents', iconPath: svgPaths.pb3be000, stroke: true },
  { id: 'map', label: 'Map', iconPath: svgPaths.p24f4f00, stroke: true },
  { id: 'status', label: 'Status', iconPath: svgPaths.p17a0c4b0, stroke: false, fill: true },
  { id: 'bugs', label: 'Bug Reports', iconPath: svgPaths.p64f500, stroke: false, fill: true },
];

const BOTTOM_ITEMS = [
  { id: 'alerts', label: 'Alerts', Icon: CommunicationBell1, isPage: true },
  { id: 'night-mode', label: 'Night Mode', Icon: Bedtime, isPage: false }, // Toggle
  { id: 'settings', label: 'Settings', Icon: InterfaceSettings, isPage: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isManagementMode?: boolean;
  managingCamera?: Camera | null;
  onBackToCameras?: () => void;
}

export function Sidebar({ activePage, onNavigate, isManagementMode, managingCamera, onBackToCameras }: SidebarProps) {
  // If in management mode, show transformed sidebar
  if (isManagementMode && managingCamera && onBackToCameras) {
    return <SidebarManagement camera={managingCamera} onBack={onBackToCameras} />;
  }

  // Find index for the active indicator position (only for main menu)
  const activeIndex = MENU_ITEMS.findIndex(item => item.id === activePage);

  return (
    <div className="absolute h-[883px] left-0 overflow-hidden top-0 w-[245px] z-20" 
         style={{ backgroundImage: "linear-gradient(rgb(32, 32, 32) 0%, rgb(32, 32, 32) 76.699%, rgb(31, 31, 31) 84.942%, rgb(32, 32, 32) 85.159%, rgb(32, 32, 32) 100%)" }}>
      
      {/* Top Divider */}
      <div className="absolute h-px left-[9px] top-[66px] w-[227px] bg-[#282828]" />

      {/* Header Info */}
      <p className="absolute font-['Chillax:Semibold',sans-serif] left-[23px] text-[19px] text-white top-[13px]">Ontairox LLC</p>
      <p className="absolute font-['Chillax:Light',sans-serif] left-[23px] text-[12px] text-white top-[33px]">jaadesk@gmail.com</p>
      <VerifiedUser className="absolute left-[143px] size-[10px] top-[37px]" />
      <MoreVert className="absolute left-[221px] size-[24px] top-[21px]" />

      {/* Main Navigation List */}
      <div className="absolute top-[86px] left-[9px] w-[227px] flex flex-col gap-[2px]">
        {/* Animated Active Indicator */}
        {activeIndex !== -1 && (
            <motion.div 
                className="absolute left-0 w-full h-[30px] rounded-[7px] pointer-events-none"
                initial={false}
                animate={{ top: activeIndex * 32 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ 
                    backgroundImage: "linear-gradient(90deg, rgb(199, 255, 191) 1.03%, rgb(38, 38, 38) 1.06%, rgb(38, 38, 38) 1.81%, rgb(38, 38, 38) 100%)" 
                }}
            />
        )}

        {MENU_ITEMS.map((item) => {
            const isActive = item.id === activePage;
            return (
                <div 
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={clsx(
                        "relative flex items-center h-[30px] px-[10px] cursor-pointer rounded-[7px] transition-colors z-10",
                        !isActive && "hover:bg-white/5"
                    )}
                >
                    <div className="w-[17px] h-[17px] flex items-center justify-center mr-[14px]">
                        <svg className="size-full" fill="none" viewBox="0 0 17 17">
                            {item.fill ? (
                                <path d={item.iconPath} fill={isActive ? "#C7FFBF" : "#959595"} />
                            ) : (
                                <path d={item.iconPath} stroke={isActive ? "#C7FFBF" : "#959595"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            )}
                        </svg>
                    </div>
                    <span className={clsx(
                        "text-[11px] font-medium leading-none mt-0.5",
                        isActive ? "text-white" : "text-[#959595]"
                    )}>
                        {item.label}
                    </span>
                </div>
            )
        })}
      </div>

      {/* Bottom Action Buttons */}
      {/* Positioned to match the bottom cluster */}
      <div className="absolute bottom-[86px] left-[9px] w-[227px] flex flex-col gap-[2px]">
          {BOTTOM_ITEMS.map((item) => {
             const isActive = item.id === activePage;
             // Use text-current to inherit color from parent div
             return (
               <div 
                 key={item.id}
                 onClick={() => item.isPage && onNavigate(item.id)}
                 className={clsx(
                    "flex items-center h-[30px] px-[10px] cursor-pointer rounded-[7px] transition-colors group",
                    isActive ? "bg-[#303030]" : "hover:bg-white/5"
                 )}
               >
                 <div className={clsx("w-[17px] h-[17px] flex items-center justify-center mr-[14px]", 
                    isActive ? "text-[#C7FFBF]" : "text-[#959595] group-hover:text-white"
                 )}>
                     <item.Icon className="size-full transition-colors" />
                 </div>
                 <p className={clsx(
                    "font-['Roboto:Medium',sans-serif] font-medium text-[11px] transition-colors mt-0.5",
                     isActive ? "text-white" : "text-[#959595] group-hover:text-white"
                 )}>
                    {item.label}
                 </p>
               </div>
             );
          })}
      </div>
      
      {/* Arrow Decoration - Repositioned to sit between Night Mode and Settings visually if needed, or just below */}
      <ArrowCaretUpMd1 />

      {/* Bottom Divider */}
      <div className="absolute h-px left-0 top-[800px] w-[245px] bg-[#282828]" />
    </div>
  );
}