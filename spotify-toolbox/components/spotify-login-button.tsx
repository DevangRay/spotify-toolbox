'use client';
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpotifyLoginButton() {
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setLoading(true);

        try {
            await authClient.signIn.social({
                provider: "spotify",
                callbackURL: "/"
            })
        } catch (error) {
            console.error("Spotify login failed:", error);
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Button
                    disabled
                    aria-label="Continue with Spotify"
                    className="bg-spotify-background border-0 px-5 py-3 rounded-full font-extrabold text-sm shadow-[0_10px_30px_rgba(29,185,84,0.16)] inline-flex items-center gap-2"
                >
                    <Spinner data-icon="inline-start" />
                    Loading
                </Button>
            ) : (
                <Button
                    onClick={handleLogin}
                    aria-label="Spotify Login Button"
                    className="bg-spotify-foreground hover:bg-spotify-background text-black hover:text-white border-0 px-5 py-3 rounded-full font-extrabold text-sm shadow-[0_10px_30px_rgba(29,185,84,0.16)] cursor-pointer"
                >
                    <span>
                        Continue with Spotify
                    </span>
                    <Image
                        src="/spotify-icon-png-15404.png"
                        alt="Spotify Logo"
                        width={30}
                        height={30}
                        className="inline-block ml-[-7] mr-[-7]"
                    />
                </Button>
            )}
        </>
    )
}