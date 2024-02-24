import { prisma } from "@/lib/db";
import { getSession } from "@/lib/ironSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// create poll
export async function POST(req: NextRequest) {
    const session = await getSession(cookies());
    if (!session.isLoggedIn) return new Response("Unauthorized", { status: 401 });

    const formData = await req.formData();
    const question = formData.get("question")?.toString();
    const options = formData.getAll("options").map((option) => option.toString());
    if (!question || options.length < 2) return new Response("Invalid input", { status: 400 });

    // Save poll to database
    const newPoll = await prisma.poll.create({
        data: {
            question,
            author: session.username,
        },
    });

    // Save options to database
    const newOptions = [];
    for (const option of options) {
        const newOption = await prisma.pollOption.create({
            data: {
                text: option,
                pollId: newPoll.id,
            },
        });
        newOptions.push(newOption);
    }

    return Response.json({ poll: newPoll, options: newOptions }, { status: 201 });
}