import { PreviewPoll } from "@/CustomTypes";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

// fetch all polls
export async function GET(req: NextRequest) {
    const polls = await prisma.poll.findMany({
        select: {
            id: true,
            question: true,
            author: true,
            options: {
                select: {
                    votes: {
                        select: {
                            id: true,
                        }
                    },
                },
            }
        },
    });
    const previewPolls: PreviewPoll[] = polls.map(poll => ({
        author: poll.author,
        id: poll.id,
        question: poll.question,
        totalVotes: poll.options.reduce((acc, option) => acc + option.votes.length, 0),
    }));
    return Response.json(previewPolls);
}