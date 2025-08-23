import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import {
  Home,
  PlusSquare,
  BookOpen,
  BriefcaseBusiness,
  LibraryBig,
  DiamondPlus,
  Wrench,
} from "lucide-react"; // icons
import { CiLogout } from "react-icons/ci";
import useAuth from "../../Hooks/useAuth";
// import logo from "./../../assets/logo.png";

export function AppSidebar() {
  const { user, logOut } = useAuth();
  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader>
        <div className="flex items-center ">
          {/* <img className="w-12 h-16" src={logo} alt="" /> */}
          <h2 className="text-md font-semibold px-4 py-2">Benzine Prokashon</h2>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard">
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Add Books */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/add-books">
                    <PlusSquare className="mr-2 h-4 w-4" /> Add Books
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Manage Books */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/manage-books">
                    <BookOpen className="mr-2 h-4 w-4" /> Manage Books
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Input Sell Details */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/input-selling-details">
                    <DiamondPlus className="mr-2 h-4 w-4" />
                    Add Sell Details
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Sell Details */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/sell-details">
                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                    Sell Details
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* Banner Manager */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/manage-banners">
                    <Wrench className="mr-2 h-4 w-4" />
                    Manage Banners
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Add Books */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard/add-books">
                    <PlusSquare className="mr-2 h-4 w-4" /> Add Books
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              {/* All Books */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/all-books">
                    <LibraryBig className="mr-2 h-4 w-4" />
                    All Books
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {/* <div className="px-4 py-2 text-sm">© 2025 benzine prokashon</div> */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-2xl hover:bg-opacity-90 transition flex items-center justify-end"
        >
          <CiLogout />
        </button>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu> */}
      </SidebarFooter>
    </Sidebar>
  );
}
