import { Poll } from "@prisma/client";

export interface SessionData {
    username: string,
    isLoggedIn: boolean,
}

export interface PreviewPoll extends Poll {
    totalVotes: number,
}

export type PollData = {
    options: {
        text: string;
        id: number;
        votes: {
            id: number;
            optionId: number;
            voter: string;
        }[];
    }[];
} & {
    id: number;
    question: string;
    author: string;
}