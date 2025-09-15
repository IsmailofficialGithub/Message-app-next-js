"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const handleLogout = async () => {
    await signOut();
    router.replace("/sign-in");
  };

  // Theme toggle button
  const ThemeToggle = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Navigation links
  const NavLinks = (
    <>
      {session ? (
        <>
          <span className="mr-4">Welcome, {user?.username || user?.email}</span>
          <Button className="w-full md:w-auto cursor-pointer" onClick={handleLogout}>
            Log-Out
          </Button>
        </>
      ) : (
        <Link href="/sign-in">
          <Button className="w-full md:w-auto">Login</Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          True Feedback
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex gap-4 items-center">
          {ThemeToggle}
          {NavLinks}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 p-6">
              {ThemeToggle}
              {NavLinks}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
