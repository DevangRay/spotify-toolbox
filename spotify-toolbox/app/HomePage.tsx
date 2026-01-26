import { auth } from "@/app/auth"
import { signOut } from "@/app/auth";

export default async function HomePage() {
    const session = await auth();

    console.dir(session);
    return (
        <>
            <h1>Hello, {session?.user?.name}</h1>
            <img
                src={session?.user?.image || ""}
                alt="User Avatar"
                width={100}
                height={100}
            />

            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </>
    )
}