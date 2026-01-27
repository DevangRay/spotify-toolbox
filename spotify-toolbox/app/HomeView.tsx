import { auth } from "@/app/auth";
import LoginCard from "@/app/LoginCard";
import HomePage from "@/app/HomePage";
import { ThemeToggleButton } from "@/app/ThemeToggleButton";

export default async function HomeView() {
    const session = await auth()

    return (
        <>
            {
                session ? <HomePage /> : <LoginCard />
            }
        </>
    )
}