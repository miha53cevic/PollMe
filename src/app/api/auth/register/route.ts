import { prisma } from "@/lib/db";
import { getSession } from "@/lib/ironSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import argon2 from "argon2";

export async function POST(req: NextRequest) {
    const session = await getSession(cookies());

    if (session.isLoggedIn) return new Response("Already logged in", { status: 400 });

    const formData = await req.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();
    if (!username || !password) return new Response("No username or password provided", { status: 400 });

    const hash = await argon2.hash(password);

    const user = await prisma.user.create({
        data: {
            username: username,
            password: hash,
        }
    });

    return new Response(user.username, { status: 201 });
}