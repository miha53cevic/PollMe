import { prisma } from "@/lib/db";
import { getSession } from "@/lib/ironSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    const session = await getSession(cookies());
    if (!session.isLoggedIn) return new Response('Unauthorized', { status: 401 });

    const formData = await req.formData();
    const optionId = formData.get('optionId')?.toString();
    if (!optionId) return new Response('Invalid or missing optionId paramater', { status: 400 });

    const pollVote = await prisma.pollVote.create({
        data: {
            optionId: +optionId,
            voter: session.username,
        }
    });

    return Response.json(pollVote, { status: 201 });
}