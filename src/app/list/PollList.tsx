'use client'
import { PreviewPoll } from "@/CustomTypes";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import useSWR from "swr";

async function fetcher(url: string): Promise<PreviewPoll[]> {
    const res = await fetch(url);
    return res.json();
}

export default function PollList() {
    const router = useRouter();
    const openPoll = (id: number) => {
        router.push(`/poll/${id}`);
    };

    const { data, error, isLoading } = useSWR("api/polls", fetcher, {
        refreshInterval: 1000 * 60, // refresh every minute
    });    
    if (isLoading) return <Stack alignItems='center'><CircularProgress /></Stack>;
    if (error || !data) return <div>Error loading polls</div>;
    else return (
        <Stack direction='column' gap={2}>
            <table>
                <tbody>
                    {data.map((poll: PreviewPoll) => (
                        <Fragment key={poll.id}>
                            <Paper component='tr' style={{ cursor: 'pointer' }} onClick={() => openPoll(poll.id)}>
                                <td style={{ padding: '1rem' }}>
                                    <Typography variant='h6'>{poll.question}</Typography>
                                </td>
                                <td style={{ textAlign: 'end', padding: '1rem' }}>
                                    <Typography variant='body2'>Total votes: <b>{poll.totalVotes}</b></Typography>
                                    <Typography variant='body2'>Created by: <b>{poll.author}</b></Typography>
                                </td>
                            </Paper>
                            <tr>
                                <td style={{ padding: '0.5rem' }}></td>
                                <td style={{ padding: '0.5rem' }}></td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </Stack>
    );
}