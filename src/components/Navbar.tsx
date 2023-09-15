"use client";

import { FC } from "react";

import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Command, CommandInput } from "@/components/ui/Command";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { cn } from "@/lib/utils";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  Bell,
  ChevronDown,
  LogOut,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

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
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: activeTab === "home" ? "default" : "ghost",
            }),
            "w-20 rounded-[40px] text-base font-semibold",
            activeTab === "home" ? "" : "hover:bg-white hover:text-foreground",
          )}
          href="/"
        >
          Home
        </Link>
        <Link
          className={cn(
            buttonVariants({
              size: "lg",
              variant: activeTab === "explore" ? "default" : "ghost",
            }),
            "w-20 rounded-[40px] text-base font-semibold",
            activeTab === "explore"
              ? ""
              : "hover:bg-white hover:text-foreground",
          )}
          href="/"
        >
          Explore
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={activeTab === "idea-pin-builder" ? "default" : "ghost"}
              size="lg"
              className={cn(
                "w-20 rounded-[40px] text-base font-semibold",
                activeTab === "idea-pin-builder"
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
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/zebermvp.png" alt="zebermvp" />
          <AvatarFallback>RZ</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-[40px] text-base font-semibold hover:bg-background hover:text-secondary"
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Rubén Zafra</p>
                <p className="pt-0.5 text-xs font-normal leading-none text-muted-foreground">
                  ruben@email.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/sign-out">
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  );
};

export default Navbar;
