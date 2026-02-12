import { getSession } from "@/lib/auth-helpers";
import NavBar from "@/app/NavBar";

export default async function HomePage() {
    const session = await getSession();
    console.dir(session);
    
    return (
        <>
            <div>
                <NavBar />
                <div className="min-h-[900] w-[50]">
                    Scroll me
                </div>
                <h1>Hello, {session?.user?.name}</h1>
                <h2>Be warned, I can contact you at {session?.user?.email} whenever I want...</h2>
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