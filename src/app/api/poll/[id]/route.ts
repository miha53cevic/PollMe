import { PollData } from "@/CustomTypes";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

// get specific poll by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    
    const poll = await prisma.poll.findUnique({
        where: {
            id: +id,
        },
        include: {
            options: {
                select: {
                    id: true,
                    text: true,
                    votes: true,
                }
            },
        },
    });
    if (!poll) return new Response("Poll not found", { status: 404 });
    
    return Response.json(poll as PollData);
}