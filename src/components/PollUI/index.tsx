import { PollData } from "@/CustomTypes";

export interface PollUIProps {
    data: PollData,
}

export default function PollUI({ data }: PollUIProps) {
    return (
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
    );
}