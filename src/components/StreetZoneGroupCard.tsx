import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { StreetZoneGroup } from "./CameraManagementView";
import { StreetSegmentCard } from "./StreetSegmentCard";

interface StreetZoneGroupCardProps {
  group: StreetZoneGroup;
  isSelected: boolean;
  onSelect: () => void;
}

export function StreetZoneGroupCard({ group, isSelected, onSelect }: StreetZoneGroupCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const occupiedCount = group.segments.filter(s => s.status === "Occupied").length;
  const availableCount = group.segments.filter(s => s.status === "Available").length;
  const allSegmentsOccupied = group.segments.every(s => s.status === "Occupied" || s.status === "Blocked");

  // Calculate total width from segments
  const totalWidth = group.segments.reduce((sum, seg) => sum + seg.size, 0) + 
                    (group.segments[group.segments.length - 1]?.position || 0);

  const handleHeaderClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      onSelect();
    }
  };

  return (
    <div 
      className={clsx(
        "rounded-xl border transition-all overflow-hidden",
        isSelected && allSegmentsOccupied
          ? "bg-[#2A2A2A] border-[#FFB4B4]"
          : isSelected 
          ? "bg-[#2A2A2A] border-[#C7FFBF]"
          : allSegmentsOccupied
          ? "bg-[#1E1E1E] border-[#FFB4B4]"
          : "bg-[#1E1E1E] border-[#2A2A2A]"
      )}
    >
      {/* Header */}
      <button
        onClick={handleHeaderClick}
        className="w-full px-3 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={clsx(
            "w-5 h-5 rounded-md flex items-center justify-center transition-colors",
            isExpanded ? "bg-[#C7FFBF] text-black" : "bg-[#333] text-[#959595]"
          )}>
            {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </div>
          <span className={clsx(
            "font-['Chillax:Semibold',sans-serif] text-sm transition-colors",
            isSelected ? "text-white" : "text-[#CCCCCC]"
          )}>
            {group.name}
          </span>
        </div>

        {/* Summary badges */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFB4B4]/10 border border-[#FFB4B4]/30">
            <span className="text-[9px] font-bold text-[#FFB4B4]">{occupiedCount}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#C7FFBF]/10 border border-[#C7FFBF]/30">
            <span className="text-[9px] font-bold text-[#C7FFBF]">{availableCount}</span>
          </div>
        </div>
      </button>

      {/* Expandable Segments */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-2 space-y-1.5 border-t border-[#333] pt-2">
              {group.segments.map((segment, index) => (
                <motion.div
                  key={`${segment.id}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <StreetSegmentCard segment={segment} totalWidth={totalWidth} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}