'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { BookAudio, HeartHandshake } from "lucide-react";
import { ThemeToggleButton } from "@/app/ThemeToggleButton";
import { SpotifyLoginButton } from "@/components/spotify-login-button";

export default function LoginCard() {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <ThemeToggleButton className="absolute top-5 right-5" />
            <div className="min-h-[80vh] p-5 flex items-center justify-center">
                <div
                    role="region"
                    aria-label="Login card"
                    className="w-full max-w-[720px] bg-card rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-9 text-center border border-white/5"
                >
                    <div className="inline-block px-3 py-1.5 bg-spotify-background text-spotify-foreground rounded-full font-extrabold text-[30px] mb-4">
                        Welcome
                    </div>

                    <h1 className="m-0 text-[28px] font-extrabold tracking-tight">
                        Explore your music with Spotify Toolbox
                    </h1>

                    <p className="mt-3 mb-5 text-[15px] leading-[1.4]">
                        Sign in with your Spotify account to analyze playlists, discover recommendations,
                        and build personalized listening experiences.
                    </p>

                    <div className="flex flex-row max-sm:flex-col justify-center gap-3">
                        <SpotifyLoginButton />

                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="ghost" className="inline-flex items-center gap-2 rounded-full text-sm cursor-pointer">
                                    <BookAudio data-icon="inline-start" />
                                    <span>
                                        Learn more
                                    </span>
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="bg-sidebar">
                                <DrawerHeader>
                                    <DrawerTitle>Logging in with Spotify lets me unlock cool functions with your Spotify</DrawerTitle>
                                    <DrawerDescription>This website uses OAuth2 standard flow to let you authorize access to your Spotify account.</DrawerDescription>
                                </DrawerHeader>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="outline" className="inline-flex mx-auto items-center gap-2 cursor-pointer w-fit px-100">
                                            <span>Good talk</span>
                                            <HeartHandshake data-icon="inline-end" />
                                        </Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                        We only request the permissions needed to enhance your experience.
                    </p>
                </div>
            </div>
        </>
    );
}
