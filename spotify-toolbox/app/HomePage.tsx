import { auth } from "@/app/auth"
import { signOut } from "@/app/auth";
import NavBar from "@/app/NavBar";

export default async function HomePage() {
    const session = await auth();

    console.dir(session);
    return (
        <>
            <div>
                <NavBar />
                <div className="min-h-[900] w-[50]">
                    Scroll me
                </div>
                <h1>Hello, {session?.user?.name}</h1>
                <img
                    src={session?.user?.image || ""}
                    alt="User Avatar"
                    width={100}
                    height={100}
                />

            </div>
        </>
    )
}