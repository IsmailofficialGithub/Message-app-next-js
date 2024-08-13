"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const { setTheme } = useTheme();

  const handleLogout = async () => {
    await signOut();
    redirect("/sign-in");
  };
  const { data: session } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md ">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        <Link href="/" className="text-xl font-bold mb-4 md:mb-0">
          Next - Project
        </Link>
        <span>
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
            </span>
        {session ? (
          <>
            <span className="mr-4">Wellcome , {user?.username || user?.email}</span>
           
            <Button className="w-full md:w-auto cursor-pointer" onClick={handleLogout}>
              Log-Out
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
        
      </div>
    </nav>
  );
};

export default NavBar;
