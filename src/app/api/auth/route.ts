import { SessionData } from "@/CustomTypes";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/ironSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import argon2 from "argon2";

export async function GET(req: NextRequest) {
    const session = await getSession(cookies());
    
    const defaultSessionData: SessionData = {
        username: "",
        isLoggedIn: false,
    };
    if (!session.isLoggedIn) return Response.json(defaultSessionData);

    return Response.json(session);
}

export async function POST(req: NextRequest) {
    const session = await getSession(cookies());
    
    if (session.isLoggedIn) return new Response("Already logged in", { status: 400 });

    // const username = await req.json(); // get body of request
    const formData = await req.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) return new Response("No username or password provided", { status: 400 });

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });
    if (!user) return new Response("Username or password do not match", { status: 400 });
    if (!await argon2.verify(user.password, password)) return new Response("Username or password do not match", { status: 400 });

    session.username = username;
    session.isLoggedIn = true;
    await session.save();

    return Response.json(session);
}

export async function DELETE(req: NextRequest) {
    const session = await getSession(cookies());
    
    if (!session.isLoggedIn) return new Response("Not logged in", { status: 400 });

    session.destroy();

    return new Response("Logged out", { status: 200});
}