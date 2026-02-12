import { getSession } from "@/lib/auth-helpers";
import LoginCard from "@/app/LoginCard";
import HomePage from "@/app/HomePage";

export default async function HomeView() {
    const session = await getSession();
    const isAuthenticated = !!session;

    return (
        <>
            {
                isAuthenticated ? <HomePage /> : <LoginCard />
            }
        </>
    )
}