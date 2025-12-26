import React from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { Ban } from "lucide-react";
import { StreetSegment } from "./types";

interface StreetSegmentCardProps {
  segment: StreetSegment;
  totalWidth: number; // Total street width for percentage calculation
}

export function StreetSegmentCard({ segment, totalWidth }: StreetSegmentCardProps) {
  const isOccupied = segment.status === "Occupied";
  const isBlocked = segment.status === "Blocked";
  const isAvailable = segment.status === "Available";

  // Calculate position and width percentages for the bar
  const startPercent = (segment.position / totalWidth) * 100;
  const widthPercent = (segment.size / totalWidth) * 100;

  return (
    <div 
      className={clsx(
        "rounded-lg border-2 p-2.5 transition-all relative overflow-hidden",
        isOccupied && "border-[#FFB4B4] bg-[#FFB4B4]/5",
        isAvailable && "border-[#C7FFBF] bg-[#C7FFBF]/5",
        isBlocked && "border-[#606060] bg-[#606060]/5"
      )}
    >
      {/* Content */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isBlocked && <Ban size={12} className="text-[#808080]" />}
            <span className={clsx(
              "text-[10px] font-medium",
              isOccupied && "text-[#FFB4B4]",
              isAvailable && "text-[#C7FFBF]",
              isBlocked && "text-[#808080]"
            )}>
              {/* Display vehicleId directly if available, otherwise id. No 'Vehicle - ' prefix. */}
              {segment.vehicleId ? segment.vehicleId : segment.id}
            </span>
          </div>
          <span className="text-[9px] text-[#808080] font-mono">
            {segment.size}px
          </span>
        </div>

        <div className={clsx(
          "px-2 py-1 rounded text-[8px] font-bold uppercase tracking-wide",
          isOccupied && "bg-[#FFB4B4] text-black",
          isAvailable && "bg-[#C7FFBF] text-black",
          isBlocked && "bg-[#606060] text-white"
        )}>
          {segment.status === "Blocked" ? "Blocked" : segment.status}
        </div>
      </div>

      {/* Position Bar - Cumulative positioning */}
      <div className="relative h-3 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#2A2A2A]">
        {/* Segment indicator - positioned cumulatively */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute h-full rounded-full origin-left"
          style={{ 
            left: `${startPercent}%`,
            width: `${widthPercent}%`,
            background: isOccupied 
              ? "#FFB4B4"
              : isAvailable
              ? "#C7FFBF"
              : "#606060",
            boxShadow: isOccupied 
              ? "0 0 6px #FFB4B4"
              : isAvailable
              ? "0 0 6px #C7FFBF"
              : "none"
          }}
        />
      </div>
    </div>
  );
}