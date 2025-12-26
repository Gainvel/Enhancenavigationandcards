import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera } from "./CameraCard";
import { CameraManagementSidebar } from "./CameraManagementSidebar";
import { ZoneMode, StreetZoneGroup } from "./types";

interface CameraManagementViewProps {
  camera: Camera;
  onBack: () => void;
}

// Mock data for demonstration
const MOCK_DESIGNATED_ZONES = [
  { id: "A01-Z01", status: "Occupied" as const },
  { id: "A01-Z02", status: "Available" as const },
  { id: "A01-Z03", status: "Available" as const },
  { id: "A01-Z04", status: "Occupied" as const },
];

const MOCK_STREET_ZONES: StreetZoneGroup[] = [
  {
    id: "A01",
    name: "Zone A01",
    segments: [
      { id: "No Parking", status: "Blocked", position: 0, size: 30 },
      { id: "C01", status: "Occupied", vehicleId: "C01", position: 30, size: 199 },
      { id: "No Parking", status: "Blocked", position: 229, size: 9 },
      { id: "C02", status: "Occupied", vehicleId: "C02", position: 238, size: 229 },
      { id: "No Parking", status: "Blocked", position: 467, size: 31 },
    ]
  },
  {
    id: "A02",
    name: "Zone A02",
    segments: [
      { id: "No Parking", status: "Blocked", position: 0, size: 45 },
      { id: "Available Space", status: "Available", position: 45, size: 180 },
      { id: "No Parking", status: "Blocked", position: 225, size: 15 },
    ]
  }
];

export function CameraManagementView({ camera, onBack }: CameraManagementViewProps) {
  const [zoneMode, setZoneMode] = useState<ZoneMode>("designated");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex overflow-hidden">
      {/* Transformed Sidebar */}
      <CameraManagementSidebar 
        camera={camera}
        zoneMode={zoneMode}
        onZoneModeChange={setZoneMode}
        designatedZones={MOCK_DESIGNATED_ZONES}
        streetZones={MOCK_STREET_ZONES}
        selectedZone={selectedZone}
        onZoneSelect={setSelectedZone}
        onBack={onBack}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Camera ID Header */}
        <div className="h-[66px] flex items-center px-8 border-b border-[#282828]">
          <h1 className="font-['Chillax:Semibold',sans-serif] text-white text-2xl tracking-tight">
            {camera.id}
          </h1>
        </div>

        {/* Canvas/Display Area */}
        <div className="flex-1 bg-[#1A1A1A] p-8 overflow-auto">
          <div className="w-full h-full rounded-2xl border-2 border-dashed border-[#333] flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#606060] text-sm font-medium mb-2">
                Camera Feed Display
              </p>
              <p className="text-[#404040] text-xs font-mono">
                Zone visualization canvas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}