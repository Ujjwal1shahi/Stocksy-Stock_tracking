import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  LayoutDashboard,
  Search,
  Star,
  LogOut,
  ChevronDown,
  UserRound,
  Settings,
} from "lucide-react";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout clicked");
    // Add your authentication logout logic here.
  };

  const itemClass =
    "flex cursor-pointer items-center rounded-lg px-3 py-2 text-[#F4EDF4] outline-none focus:bg-[#48213F] focus:text-[#E7C68B]";

  return (
    <DropdownMenu>
      {/* Profile trigger */}
      <DropdownMenuTrigger
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#F4EDF4] transition-colors hover:bg-[#48213F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E7C68B]"
      >
        <Avatar className="h-9 w-9 border border-[#E7C68B]">
          <AvatarFallback className="bg-[#E7C68B] font-bold text-[#260B20]">
            U
          </AvatarFallback>
        </Avatar>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold">Ujjwal</p>
          <p className="text-xs text-[#C7A6C8]">
            Stocksy Account
          </p>
        </div>

        <ChevronDown className="h-4 w-4 text-[#C7A6C8]" />
      </DropdownMenuTrigger>

      {/* Dropdown panel */}
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-50 w-64 rounded-xl border border-[#48213F] bg-[#160D1B] p-2 text-[#F4EDF4] shadow-xl shadow-black/30"
      >
        {/* Account header: normal div, not DropdownMenuLabel */}
        <div className="flex items-center gap-3 px-2 py-3">
          <Avatar className="h-11 w-11 border border-[#E7C68B]">
            <AvatarFallback className="bg-[#E7C68B] text-lg font-bold text-[#260B20]">
              U
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Ujjwal Shahi
            </p>
            <p className="text-xs text-[#C7A6C8]">
              Stocksy Account
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="my-1 bg-[#48213F]" />

        <DropdownMenuItem
          className={itemClass}
          onClick={() => navigate("/profile")}
        >
          <UserRound className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => navigate("/explore")}
        >
          <Search className="mr-2 h-4 w-4" />
          Explore Stocks
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => navigate("/watchlist")}
        >
          <Star className="mr-2 h-4 w-4" />
          Watchlist
        </DropdownMenuItem>

        <DropdownMenuItem
          className={itemClass}
          onClick={() => navigate("/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-[#48213F]" />

        <DropdownMenuItem
          className="flex cursor-pointer items-center rounded-lg px-3 py-2 text-[#FF7D91] outline-none focus:bg-[#48213F] focus:text-[#FF7D91]"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;