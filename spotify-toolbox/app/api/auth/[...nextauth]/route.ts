// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/app/auth"; // Referring to the auth.ts file

export const { GET, POST } = handlers;
