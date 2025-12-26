import React from "react";
import clsx from "clsx";

interface Zone {
  id: string;
  status: "Occupied" | "Available";
}

interface DesignatedZoneItemProps {
  zone: Zone;
  isSelected: boolean;
  onSelect: () => void;
}

export function DesignatedZoneItem({ zone, isSelected, onSelect }: DesignatedZoneItemProps) {
  const isOccupied = zone.status === "Occupied";

  return (
    <button
      onClick={onSelect}
      className={clsx(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all group",
        isSelected 
          ? "bg-[#2A2A2A] border-[#C7FFBF]"
          : "bg-[#1E1E1E] border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525]"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={clsx(
          "w-1.5 h-1.5 rounded-full shadow-[0_0_4px_currentColor]",
          isOccupied ? "bg-[#FFB4B4]" : "bg-[#C7FFBF]"
        )} 
        style={{ 
          color: isOccupied ? "#FFB4B4" : "#C7FFBF" 
        }}
        />
        <span className={clsx(
          "text-[10px] font-mono tracking-tight transition-colors",
          isSelected ? "text-white" : "text-[#AAAAAA] group-hover:text-white"
        )}>
          {zone.id}
        </span>
      </div>

      <div className={clsx(
        "flex items-center gap-1.5 px-2 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wide",
        isOccupied 
          ? "border-[#FFB4B4] text-[#FFB4B4] bg-[#FFB4B4]/5" 
          : "border-[#C7FFBF] text-[#C7FFBF] bg-[#C7FFBF]/5"
      )}>
        {isOccupied ? "Occupied" : "Available"}
      </div>
    </button>
  );
}
