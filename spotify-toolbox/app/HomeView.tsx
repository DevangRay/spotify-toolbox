import { auth } from "@/app/auth";
import LoginCard from "./LoginCard";
import HomePage from "./HomePage";

export default async function HomeView() {
    const session = await auth()

    if (!session) {
        // User is not authenticated, landing page
        return (
            <>
                <LoginCard />
            </>
        )
    }

    // User is authenticated, show home page
    return (
        <>
            <HomePage />
        </>
    )
}