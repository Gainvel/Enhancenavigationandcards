import { Bell, Search, User } from "lucide-react";

export function TopNav() {
  return (
    <div className="flex items-center justify-end gap-6 w-full p-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-[#959595] group-focus-within:text-white transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search cameras, incidents..."
          className="bg-[#242424] text-white text-sm rounded-full pl-10 pr-4 py-2.5 w-[320px] focus:outline-none focus:ring-1 focus:ring-[#C7FFBF] placeholder-[#606060] transition-all shadow-sm"
        />
      </div>
      
      <button className="relative p-2 text-[#959595] hover:text-white transition-colors rounded-full hover:bg-[#303030]">
        <Bell className="h-5 w-5" />
        <span className="absolute top-2 right-2 h-2 w-2 bg-[#C7FFBF] rounded-full border border-[#242424]"></span>
      </button>
      
      <div className="flex items-center gap-3 pl-2 border-l border-[#303030]">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-white">Admin User</p>
          <p className="text-[10px] text-[#959595]">Security Manager</p>
        </div>
        <button className="h-9 w-9 bg-[#303030] rounded-full flex items-center justify-center text-white hover:bg-[#404040] transition-colors ring-2 ring-transparent hover:ring-[#C7FFBF]/20">
          <User className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
