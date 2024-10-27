import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image src={logo} width={90} height={40} alt="logo"/>
            <span className="ml-4 text-lg font-semibold">USER PORTAL</span>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              View Public Profile
            </Button>
            <SignedOut>
              <SignInButton forceRedirectUrl={"/forms/personal"} />
              <SignUpButton forceRedirectUrl={"/forms/personal"} />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
