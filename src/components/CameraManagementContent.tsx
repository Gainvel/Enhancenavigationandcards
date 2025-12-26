import React from "react";
import { Camera } from "./CameraCard";

interface CameraManagementContentProps {
  camera: Camera;
}

export function CameraManagementContent({ camera }: CameraManagementContentProps) {
  return (
    <div className="h-full flex flex-col bg-[#232323] p-8">
      {/* Camera Feed Display with 16:9 aspect ratio */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}> {/* 16:9 aspect ratio */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#333] flex items-center justify-center bg-[#0F0F0F]">
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