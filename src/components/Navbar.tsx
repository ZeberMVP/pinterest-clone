import { FC } from "react";

import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Command, CommandInput } from "@/components/ui/Command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";
import {
  Bell,
  ChevronDown,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import NavAccountAvatar from "@/components/NavAccountAvatar";
import NavAccountDropdown from "@/components/NavAccountDropdown";
import { Sign } from "crypto";
import SignInButton from "./SignInButton";

interface NavBarProps {
  activeTab: string;
}

const Navbar: FC<NavBarProps> = ({ activeTab }) => {
  return (
    <nav className="flex items-center gap-2 p-6">
      <section className="flex items-center justify-center gap-2">
        <Link
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-[40px] hover:bg-black/10",
          )}
          href="/"
        >
          <Icons.pinterest />
        </Link>
        {/* Desktop */}
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: activeTab === "Home" ? "default" : "ghost",
            }),
            "hidden w-20 rounded-[40px] text-base font-semibold md:flex",
            activeTab === "Home" ? "" : "hover:bg-white hover:text-foreground",
          )}
          href="/"
        >
          Home
        </Link>
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: activeTab === "Today" ? "default" : "ghost",
            }),
            "hidden w-20 rounded-[40px] text-base font-semibold md:flex",
            activeTab === "Today" ? "" : "hover:bg-white hover:text-foreground",
          )}
          href="/today"
        >
          Explore
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={activeTab === "Create" ? "default" : "ghost"}
              size="lg"
              className={cn(
                "hidden w-20 rounded-[40px] text-base font-semibold md:flex",
                activeTab === "Create"
                  ? ""
                  : "hover:bg-white hover:text-foreground",
              )}
            >
              Create{" "}
              <div>
                <ChevronDown />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Link href="/idea-pin-builder">Create Idea Pin</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/pin-builder">Create Pin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Mobile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="w-20 rounded-[40px] text-base font-semibold md:hidden"
            >
              {activeTab}{" "}
              <div>
                <ChevronDown />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-32" align="end">
            <DropdownMenuItem
              className={activeTab === "Home" ? "bg-popover" : ""}
            >
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={activeTab === "Today" ? "bg-popover" : ""}
            >
              <Link href="/today">Today</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={activeTab === "Create" ? "bg-popover" : ""}
            >
              <Link href="/idea-pin-builder">Create</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      <SearchBar />
      <section className="flex items-center justify-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-[40px] hover:bg-black/10"
            >
              <Bell className="fill-secondary text-secondary" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <h3 className="pt-4 text-center text-lg">Updates</h3>
            <p className="pt-8 text-center text-sm font-light">
              Nothing new here yet. Check back later!
            </p>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-[40px] hover:bg-black/10"
            >
              <MessageCircle className="fill-secondary text-secondary" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <h3 className="pt-8 text-center text-lg">Inbox</h3>
            <div className="absolute right-8 top-[52px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full font-semibold"
                  >
                    <MoreHorizontal className="fill-secondary text-secondary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>Mark all as read</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Command className="mt-8 h-10 rounded-[40px]">
              <CommandInput
                className="border-none outline-none ring-0 focus:border-none focus:outline-none"
                placeholder="Search by name or email"
              />
            </Command>

            <div className="mt-8 flex cursor-pointer gap-4">
              <div className="h-12 w-12 rounded-full bg-[#e60023]">
                <Pencil className="mx-auto mt-3 text-white" />
              </div>
              <p className="pt-3 font-semibold">New message</p>
            </div>
            <div className="mt-8 flex cursor-pointer gap-4">
              <div className="h-12 w-12 rounded-full bg-popover">
                <UserPlus className="mx-auto mt-3 fill-foreground text-foreground" />
              </div>
              <div>
                <p className="font-semibold">Invite your friends</p>
                <p>Connect to start chatting</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        {/* User is signed in */}
        <NavAccountAvatar />
        <NavAccountDropdown />
        {/* User is not signed in */}
        <SignInButton />
      </section>
    </nav>
  );
};

export default Navbar;
