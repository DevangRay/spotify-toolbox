'use client';
import { useState } from "react";

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
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh',
                padding: 20,
            }}
        >
            <div
                role="region"
                aria-label="Login card"
                style={{
                    width: '100%',
                    maxWidth: 720,
                    background: 'linear-gradient(180deg,#0b0b0b,#050505)',
                    color: '#fff',
                    borderRadius: 14,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                    padding: '36px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.04)',
                }}
            >
                <div
                    style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        background: 'rgba(29,185,84,0.12)',
                        color: '#1DB954',
                        borderRadius: 999,
                        fontWeight: 700,
                        fontSize: 30,
                        marginBottom: 18,
                    }}
                >
                    Welcome
                </div>

                <h1
                    style={{
                        margin: 0,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: -0.5,
                        color: '#fff',
                    }}
                >
                    Explore your music with Spotify Toolbox
                </h1>

                <p
                    style={{
                        marginTop: 12,
                        marginBottom: 22,
                        color: 'rgba(255,255,255,0.72)',
                        fontSize: 15,
                        lineHeight: 1.4,
                    }}
                >
                    Sign in with your Spotify account to analyze playlists, discover recommendations,
                    and build personalized listening experiences.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                    {
                        loading ?
                            <>
                                <Button
                                    disabled
                                    aria-label="Continue with Spotify"
                                    style={{
                                        background: '#1DB954',
                                        color: '#000',
                                        border: 'none',
                                        padding: '12px 20px',
                                        borderRadius: 999,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        fontSize: 15,
                                        boxShadow: '0 10px 30px rgba(29,185,84,0.16)',
                                    }}
                                >
                                    <Spinner data-icon="inline-start" />
                                    Loading
                                </Button>
                            </> :
                            <>
                                <Button
                                    onClick={() => startOAuthProcess()}
                                    aria-label="Continue with Spotify"
                                    style={{
                                        background: '#1DB954',
                                        color: '#000',
                                        border: 'none',
                                        padding: '12px 20px',
                                        borderRadius: 999,
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        fontSize: 15,
                                        boxShadow: '0 10px 30px rgba(29,185,84,0.16)',
                                    }}
                                >
                                    Continue with Spotify
                                </Button>
                            </>
                    }

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost">
                                <BookAudio data-icon="inline-start" />
                                <span>
                                    Learn more
                                </span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent >
                            <DrawerHeader>
                                <DrawerTitle>Logging in with Spotify lets me unlock cool functions with your Spotify</DrawerTitle>
                                <DrawerDescription>This website uses OAuth2 standard flow to let you authorize access to your Spotify account.</DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="outline">
                                        <span>Good talk</span>
                                        <HeartHandshake data-icon="inline-end" />
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>

                <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
                    We only request the permissions needed to enhance your experience.
                </p>
            </div>
        </div>
    );
}