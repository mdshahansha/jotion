"use client"

import { useScrollTop } from "@/hooks/use-scroll-top"
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import { useEffect } from "react";

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScrollTop();
    console.log("isAuthenticated", isAuthenticated, "  -  ", isLoading);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
        console.log("isLoading:", isLoading);
    }, [isAuthenticated, isLoading]);  // Track changes to auth state


    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center  w-full p-6",
            scrolled && "border-b shadow-md"
        )}>

            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner />
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                        </SignInButton>

                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get Jotion Free
                            </Button>
                        </SignInButton>
                    </>
                )}

                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/documents">Enter Jotion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />


                    </>
                )}

                <ModeToggle />
            </div>
        </div>
    )
}

