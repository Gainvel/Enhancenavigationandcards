import React from "react";
import { Camera, CameraCard, Zone } from "./CameraCard";
import { motion, AnimatePresence } from "motion/react";

// --- Helper to generate zones ---
const generateZones = (
  camId: string,
  count: number,
): Zone[] => {
  // Convert CAM-A01-001 to ZN-A01-001 base
  const zoneBase = camId.replace("CAM", "ZN");

  return Array.from({ length: count }).map((_, i) => ({
    // Generates ZN-A01-001-01, ZN-A01-001-02, etc.
    id: `${zoneBase}-${(i + 1).toString().padStart(2, "0")}`,
    status: Math.random() > 0.6 ? "Occupied" : "Available",
  }));
};

// --- Mock Data ---
const MOCK_CAMERAS: Camera[] = [
  {
    id: "CAM-A01-001",
    status: "Online",
    lastUpdated: "Just now",
    zones: generateZones("CAM-A01-001", 18),
  },
  {
    id: "CAM-A01-002",
    status: "Online",
    lastUpdated: "12s ago",
    zones: generateZones("CAM-A01-002", 24),
  },
  {
    id: "CAM-B02-104",
    status: "Maintenance",
    lastUpdated: "45m ago",
    zones: generateZones("CAM-B02-104", 12),
  },
  {
    id: "CAM-B02-105",
    status: "Offline",
    lastUpdated: "2h ago",
    zones: generateZones("CAM-B02-105", 8),
  },
  {
    id: "CAM-C03-055",
    status: "Online",
    lastUpdated: "5s ago",
    zones: generateZones("CAM-C03-055", 22),
  },
  {
    id: "CAM-EXT-001",
    status: "Online",
    lastUpdated: "Just now",
    zones: generateZones("CAM-EXT-001", 15),
  },
  {
    id: "CAM-EXT-002",
    status: "Online",
    lastUpdated: "3m ago",
    zones: generateZones("CAM-EXT-002", 6),
  },
  {
    id: "CAM-Z99-999",
    status: "Online",
    lastUpdated: "1m ago",
    zones: generateZones("CAM-Z99-999", 25),
  },
];

export function CamerasView() {
  const filteredCameras = MOCK_CAMERAS;

  return (
    <div className="h-full flex flex-col p-8 pt-6 max-w-[1800px] mx-auto w-full relative">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
        <AnimatePresence>
          {filteredCameras.map((camera) => (
            <motion.div
              key={camera.id}
              layoutId={camera.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <CameraCard camera={camera} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}