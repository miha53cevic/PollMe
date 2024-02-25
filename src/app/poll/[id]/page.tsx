'use client'
import PageContent from "@/components/PageContent";
import PollModel from "./PollModel";
import PollUI from "@/components/PollUI";

export interface PollPageProps {
    params: {
        id: string,
    }
}

export default function PollPage({ params }: PollPageProps) {
    const pollId = params.id;
    return (
        <PageContent my={4}>
            <PollModel pollId={pollId}>
                {(data) => (
                    <PollUI data={data} />
                )}
            </PollModel>
        </PageContent>
    );
}