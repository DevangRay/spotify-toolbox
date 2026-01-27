"use client";

import { ThemeToggleButton } from "./ThemeToggleButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu, LogOut, Music, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function NavBar() {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Detect screen width changes at 900px breakpoint
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 900);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-dropdown]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    const handleSignOut = () => {
        setIsOpen(false);
        signOut();
    };

    return (
        <>
            <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
                    {/* Logo/Title */}
                    <div className="flex items-center gap-2">
                        <Music className="h-6 w-6 text-spotify-foreground" />
                        <span className="text-lg font-semibold">Spotify Toolbox</span>
                    </div>

                    {/* Desktop Navigation (>= 900px) */}
                    {!isMobile && (
                        <div className="flex items-center gap-3">
                            <ThemeToggleButton />
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                className="cursor-pointer gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu Button (< 900px) */}
                    {isMobile && (
                        <div data-dropdown>
                            <Button
                                variant="outline"
                                size="icon"
                                className="cursor-pointer"
                                aria-label="Toggle navigation menu"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? (
                                    <X className="h-5 w-5" />
                                ) : (
                                    <Menu className="h-5 w-5" />
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Dropdown Panel */}
            {isMobile && (
                <div
                    data-dropdown
                    className={`
                        fixed left-0 right-0 z-40 
                        border-b border-border bg-background/95 backdrop-blur 
                        supports-[backdrop-filter]:bg-background/60
                        shadow-lg
                        transition-all duration-300 ease-in-out
                        ${isOpen
                            ? 'top-16 opacity-100'
                            : '-top-full opacity-0 pointer-events-none'
                        }
                    `}
                >
                    <div className="container max-w-screen-2xl px-4 py-4">
                        <div className="flex flex-col gap-4">
                            {/* Theme Toggle */}
                            <div className="flex items-center justify-between rounded-lg border border-border p-3">
                                <span className="text-sm font-medium">Theme</span>
                                <ThemeToggleButton />
                            </div>

                            <Separator />

                            {/* Sign Out Button */}
                            <Button
                                onClick={handleSignOut}
                                variant="outline"
                                className="w-full cursor-pointer justify-start gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Backdrop Overlay */}
            {isMobile && isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}