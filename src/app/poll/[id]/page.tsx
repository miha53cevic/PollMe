export interface PollPageProps {
    params: {
        id: string,
    }
}

export default function PollPage({ params }: PollPageProps) {
    return (
        <div>
            <h1>Poll {params.id}</h1>
        </div>
    );
}