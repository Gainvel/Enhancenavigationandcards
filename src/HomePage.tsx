import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { OccupancyCard } from "./components/OccupancyCard";
import { RecentActivityCard } from "./components/RecentActivityCard";
import { PeakHoursChart } from "./components/PeakHoursCard";
import { DailyTrafficCard } from "./components/DailyTrafficCard";
import { motion, AnimatePresence } from "motion/react";

import { CamerasView } from "./components/CamerasView";

import { IncidentsView } from "./components/IncidentsView";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)] text-[#606060]">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#959595] uppercase tracking-widest mb-4">
          {title}
        </h2>
        <div className="h-1 w-12 bg-[#303030] mx-auto rounded-full mb-4"></div>
        <p className="text-xs font-mono">
          Module not yet loaded
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div
      className="bg-[#232323] overflow-hidden relative w-full h-full min-h-screen font-sans"
      data-name="Home Page"
    >
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main Content Area */}
      {/* Positioned to the right of sidebar (245px) */}
      <div className="absolute left-[245px] top-0 right-0 bottom-0 overflow-hidden flex flex-col">
        {/* Top Navigation Bar */}
        <TopNav />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activePage === "home" && (
                <div className="p-8 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1400px]">
                  {/* Row 1 */}
                  <div className="h-[300px]">
                    <OccupancyCard />
                  </div>
                  <div className="h-[300px]">
                    <RecentActivityCard />
                  </div>

                  {/* Row 2 */}
                  <div className="h-[415px]">
                    <PeakHoursChart />
                  </div>
                  <div className="h-[415px]">
                    <DailyTrafficCard />
                  </div>
                </div>
              )}

              {activePage === "console" && (
                <PlaceholderPage title="System Console" />
              )}
              {activePage === "cameras" && <CamerasView />}
              {activePage === "incidents" && <IncidentsView />}
              {activePage === "map" && (
                <PlaceholderPage title="Facility Map" />
              )}
              {activePage === "status" && (
                <PlaceholderPage title="System Status" />
              )}
              {activePage === "bugs" && (
                <PlaceholderPage title="Bug Reports" />
              )}

              {/* Bottom Links */}
              {activePage === "alerts" && (
                <PlaceholderPage title="System Alerts" />
              )}
              {activePage === "settings" && (
                <PlaceholderPage title="System Settings" />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Background Gradient Effect - Only visible if content scrolls behind it */}
          <div className="fixed bottom-0 left-[245px] right-0 pointer-events-none bg-gradient-to-t from-[rgba(25,25,25,0.9)] to-transparent h-[128px]" />
        </div>
      </div>
    </div>
  );
}