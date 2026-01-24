'use client';
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Spinner } from "@/components/ui/spinner";
import { BookAudio, HeartHandshake } from "lucide-react";

export default function LoginCard() {
    const [loading, setLoading] = useState(false);

    function generateRandomString(length: number): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    async function hashWithSHA256(plainText: string): Promise<ArrayBuffer> {
        const encoder = new TextEncoder()
        const data = encoder.encode(plainText)
        return window.crypto.subtle.digest('SHA-256', data)
    }

    function getBase64EncodedStringOfHash(input: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    async function startOAuthProcess(): Promise<void> {
        try {
            setLoading(true);
            const codeVerifier = generateRandomString(128);
            console.log("Code Verifier:", codeVerifier);

            const hashed = await hashWithSHA256(codeVerifier);
            console.log("SHA-256 Hash:", new Uint8Array(hashed));

            const codeChallenge = getBase64EncodedStringOfHash(hashed);
            console.log("Code Challenge:", codeChallenge);

            // make GET request to /authorize endpoint
            await new Promise(resolve => setTimeout(resolve, 5000));
        } catch (error) {
            const errorString = `[LoginCard][startOAuthProcess] ${error}`;
            console.error(errorString);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[80vh] p-5 flex items-center justify-center">
            <div
                role="region"
                aria-label="Login card"
                className="w-full max-w-[720px] bg-gradient-to-b from-[#0b0b0b] to-[#050505] text-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-9 text-center border border-white/5"
            >
                <div className="inline-block px-3 py-1.5 bg-[rgba(29,185,84,0.12)] text-[#1DB954] rounded-full font-extrabold text-[30px] mb-4">
                    Welcome
                </div>

                <h1 className="m-0 text-[28px] font-extrabold tracking-tight text-white">
                    Explore your music with Spotify Toolbox
                </h1>

                <p className="mt-3 mb-5 text-[15px] leading-[1.4] text-white/70">
                    Sign in with your Spotify account to analyze playlists, discover recommendations,
                    and build personalized listening experiences.
                </p>

                <div className="flex justify-center gap-3">
                    {loading ? (
                        <Button
                            disabled
                            aria-label="Continue with Spotify"
                            className="bg-[#1DB954] text-black border-0 px-5 py-3 rounded-full font-extrabold text-sm shadow-[0_10px_30px_rgba(29,185,84,0.16)] inline-flex items-center gap-2"
                        >
                            <Spinner data-icon="inline-start" />
                            Loading
                        </Button>
                    ) : (
                        <Button
                            onClick={() => startOAuthProcess()}
                            aria-label="Continue with Spotify"
                            className="bg-[#1DB954] text-black border-0 px-5 py-3 rounded-full font-extrabold text-sm shadow-[0_10px_30px_rgba(29,185,84,0.16)]"
                        >
                            <span>
                                Continue with Spotify
                            </span>
                            <Image
                                src="/spotify-icon-png-15404.png"
                                alt="Spotify Logo"
                                width={20}
                                height={20}
                                className="inline-block"
                                data-icon="inline-start"
                            />
                        </Button>
                    )}

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" className="inline-flex items-center gap-2">
                                <BookAudio data-icon="inline-start" />
                                <span>
                                    Learn more
                                </span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Logging in with Spotify lets me unlock cool functions with your Spotify</DrawerTitle>
                                <DrawerDescription>This website uses OAuth2 standard flow to let you authorize access to your Spotify account.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="inline-flex items-center gap-2">
                                        <span>Good talk</span>
                                        <HeartHandshake data-icon="inline-end" />
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>

                <p className="mt-4 text-white/50 text-xs">
                    We only request the permissions needed to enhance your experience.
                </p>
            </div>
        </div>
    );
}
