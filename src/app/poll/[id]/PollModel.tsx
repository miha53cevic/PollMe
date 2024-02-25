'use client'
import { PollData } from "@/CustomTypes";
import { CircularProgress, Stack } from "@mui/material";
import useSWR from "swr";

export interface PollModelProps {
    pollId: string,
    children: (data: PollData) => JSX.Element,
}

async function fetcher(url: string): Promise<PollData> {
    const response = await fetch(url);
    if (response.ok) return await response.json();
    throw new Error(await response.text());
}

export default function PollModel(props: PollModelProps) {
    const { data, error, isLoading } = useSWR(`/api/poll/${props.pollId}`, fetcher, {
        refreshInterval: 1000, // refresh every 1 second
    });
    if (isLoading) return <Stack alignItems='center'><CircularProgress /></Stack>;
    if (error || !data) return <div>Error loading poll: {props.pollId}</div>;
    else return (
        <div>
            {props.children(data)}
        </div>
    );
}