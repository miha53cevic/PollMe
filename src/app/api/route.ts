import { getSession } from "@/lib/ironSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getSession(cookies());
    
    if (!session.isLoggedIn) return new Response("Unauthorized", { status: 401 });
    else return Response.json(session);
}

export async function POST(req: NextRequest) {
    const session = await getSession(cookies());
    
    if (session.isLoggedIn) return new Response("Already logged in", { status: 400 });

    // const username = await req.json(); // get body of request
    const formData = await req.formData();
    const username = formData.get("username")?.toString();
    if (!username) return new Response("No username provided", { status: 400 });

    session.username = username;
    session.isLoggedIn = true;
    await session.save();

    return Response.json(session);
}