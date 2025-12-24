import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, CheckCircle2, XCircle, Ban, HelpCircle, AlertOctagon } from "lucide-react";
import img1 from "figma:asset/97a5c672291b3f25c970e08c0923aea1dd29da35.png";
import img2 from "figma:asset/581075418fb241dc1283362696adcfbcd978a553.png";
import img3 from "figma:asset/b4add5981d004bb1f6e7d6fc69c579a126d31742.png";

// --- Types ---
interface Incident {
  id: string;
  type: "LowConfidence" | "Anomaly" | "Obstructed" | "SystemError";
  camera: string;
  zone: string;
  timestamp: string;
  snapshotUrl?: string;
}

// --- Mock Data ---
const MOCK_INCIDENTS: Incident[] = [
  {
    id: "INC-001",
    type: "LowConfidence",
    camera: "CAM-A01-001",
    zone: "ZN-A01-001-04",
    timestamp: "2m ago",
    snapshotUrl: img1
  },
  {
    id: "INC-002",
    type: "Anomaly",
    camera: "CAM-B02-104",
    zone: "ZN-B02-104-12",
    timestamp: "5m ago",
    snapshotUrl: img2
  },
  {
    id: "INC-003",
    type: "Obstructed",
    camera: "CAM-C03-055",
    zone: "ZN-C03-055-01",
    timestamp: "12m ago",
    snapshotUrl: img3
  },
  {
    id: "INC-004",
    type: "LowConfidence",
    camera: "CAM-EXT-001",
    zone: "ZN-EXT-001-08",
    timestamp: "15m ago",
    snapshotUrl: img1
  },
  {
    id: "INC-005",
    type: "SystemError",
    camera: "CAM-Z99-999",
    zone: "ZN-Z99-999-25",
    timestamp: "1h ago",
    snapshotUrl: img2
  }
];

export function IncidentsView() {
  const [incidents, setIncidents] = useState<Incident[]>(MOCK_INCIDENTS);
  const [resolving, setResolving] = useState<string | null>(null);

  const handleResolve = (id: string, action: "occupied" | "available" | "clear") => {
    setResolving(id);
    // Simulate API call/delay
    setTimeout(() => {
      setIncidents((prev) => prev.filter((i) => i.id !== id));
      setResolving(null);
    }, 400);
  };

  const getIcon = (type: Incident["type"]) => {
    switch (type) {
      case "LowConfidence": return <HelpCircle className="text-yellow-400" size={18} />;
      case "Anomaly": return <AlertOctagon className="text-orange-400" size={18} />;
      case "Obstructed": return <Ban className="text-red-400" size={18} />;
      case "SystemError": return <AlertTriangle className="text-purple-400" size={18} />;
      default: return <AlertTriangle className="text-gray-400" size={18} />;
    }
  };

  const getTitle = (type: Incident["type"]) => {
    switch (type) {
      case "LowConfidence": return "Low Confidence";
      case "Anomaly": return "Unidentified Object";
      case "Obstructed": return "View Obstructed";
      case "SystemError": return "Sensor Error";
      default: return "Unknown Incident";
    }
  };

  return (
    <div className="h-full flex flex-col p-8 pt-6 max-w-[1800px] mx-auto w-full relative">
       {/* Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-6">
          <AnimatePresence mode="popLayout">
            {incidents.map((incident) => (
               <motion.div
                 key={incident.id}
                 layout
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 transition={{ duration: 0.3 }}
                 className="group bg-[#2A2A2A] rounded-2xl border border-[#333] overflow-hidden flex flex-col hover:border-[#606060] transition-colors"
               >
                 {/* Card Header */}
                 <div className="px-5 py-4 border-b border-[#333] bg-[#252525] flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-[#1A1A1A] rounded-lg border border-[#333]">
                          {getIcon(incident.type)}
                       </div>
                       <div>
                          <h3 className="text-white text-sm font-bold tracking-wide">
                             {getTitle(incident.type)}
                          </h3>
                       </div>
                    </div>
                    <span className="text-[10px] text-[#606060] font-mono">{incident.timestamp}</span>
                 </div>

                 {/* Visual Snapshot */}
                 <div className="h-48 bg-[#151515] relative group-hover:bg-[#121212] transition-colors flex items-center justify-center border-b border-[#333] overflow-hidden">
                     {incident.snapshotUrl && (
                        <img 
                            src={incident.snapshotUrl} 
                            alt={`Snapshot from ${incident.camera}`}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                     )}
                     
                     {/* Scanline/Grid Effect Overlay */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-30 mix-blend-overlay" />
                 </div>

                 {/* Action Area */}
                 <div className="p-5 flex flex-col gap-4 bg-[#2A2A2A] flex-1">
                    
                    {/* ID Info Stacked */}
                    <div className="flex flex-col gap-1">
                       <div className="flex justify-between items-center text-[10px] text-[#808080] font-mono border-b border-[#333] pb-2 mb-1">
                          <span className="uppercase tracking-wider">Camera ID</span>
                          <span className="text-[#C7FFBF]">{incident.camera}</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] text-[#808080] font-mono">
                          <span className="uppercase tracking-wider">Zone ID</span>
                          <span className="text-white">{incident.zone}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-auto">
                       <button 
                          onClick={() => handleResolve(incident.id, "occupied")}
                          disabled={resolving === incident.id}
                          className="h-10 rounded-xl bg-[#FFB4B4] hover:bg-[#ffcccc] text-black border border-[#FFB4B4] text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_10px_rgba(255,180,180,0.1)] w-full"
                       >
                          <XCircle size={14} className="group-hover/btn:scale-110 transition-transform" />
                          <span className="truncate">Occupied</span>
                       </button>
                       <button 
                          onClick={() => handleResolve(incident.id, "available")}
                          disabled={resolving === incident.id}
                          className="h-10 rounded-xl bg-[#C7FFBF] hover:bg-[#b0f2a6] text-black border border-[#C7FFBF] text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_10px_rgba(199,255,191,0.1)] w-full"
                       >
                          <CheckCircle2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                          <span className="truncate">Vacant</span>
                       </button>
                    </div>
                    
                    <button 
                       onClick={() => handleResolve(incident.id, "clear")}
                       className="w-full h-8 mt-1 rounded-lg bg-transparent hover:bg-red-500/10 hover:text-red-400 text-[#606060] text-[9px] font-bold uppercase tracking-widest transition-all"
                    >
                       Report System Fault
                    </button>
                 </div>
               </motion.div>
            ))}
          </AnimatePresence>

          {incidents.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="col-span-full h-64 flex flex-col items-center justify-center text-[#606060] border border-dashed border-[#333] rounded-2xl bg-[#1A1A1A]"
             >
                <CheckCircle2 size={32} className="text-[#C7FFBF] mb-4 opacity-50" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#959595]">All Clear</h3>
                <p className="text-xs mt-2">No anomalies requiring verification.</p>
             </motion.div>
          )}
       </div>
    </div>
  );
}
