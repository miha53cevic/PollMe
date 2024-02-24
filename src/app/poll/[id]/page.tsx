'use client'
import PageContent from "@/components/PageContent";
import PollModel from "./PollModel";

export interface PollPageProps {
    params: {
        id: string,
    }
}

export default function PollPage({ params }: PollPageProps) {
    const pollId = params.id;
    return (
        <PageContent>
            <PollModel pollId={pollId}>
                {(data) => (
                    <div>
                        <h1>Question: {data.question}</h1>
                        <p>Created by: {data.author}</p>
                        <ul>
                            {data.options.map((option) => (
                                <li key={option.id}>
                                    {option.text} - {option.votes.length} votes
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </PollModel>
        </PageContent>
    );
}