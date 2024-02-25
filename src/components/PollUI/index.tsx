'use client'
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import ProgressBar from "./ProgressBar";
import { PollData } from "@/CustomTypes";
import { mutate } from "swr";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface PollUIProps {
    data: PollData,
    disableVoting?: boolean,
}

export default function PollUI({ data, disableVoting }: PollUIProps) {
    const pathname = usePathname();
    const { session, isLoading } = useAuth();

    const totalVotes = data.options.reduce((acc, option) => acc + option.votes.length, 0);

    const vote = async (optionId: number) => {
        const formData = new FormData();
        formData.append('optionId', optionId.toString());
        try {
            const res = await fetch(`/api/poll/vote`, {
                method: 'POST',
                body: formData,
            });
            mutate(`/api/poll/${data.id}`); // update the poll data
        } catch (err) {
            console.error(err);
        }
    }

    const hasVoted = () => {
        return data.options.some(option => option.votes.some(vote => vote.voter === session?.username));
    }
    const getVotedOption = () => {
        return data.options.find(option => option.votes.some(vote => vote.voter === session?.username));
    }

    return (
        <Box>
            <Typography variant="h4">{data.question}</Typography>
            <Typography variant="body1">Created by: <b>{data.author}</b></Typography>
            <Typography variant="body1">Total votes: <b>{totalVotes}</b></Typography>
            <br />
            <Stack direction='column' gap={2}>
                {data.options.map((option) => (
                    <Box key={option.id}>
                        <Typography variant="h6">{option.text}</Typography>
                        <ProgressBar progress={totalVotes ? option.votes.length / totalVotes * 100 : 0} />
                    </Box>
                ))}
            </Stack>
            <br />
            {!disableVoting &&
                <Stack direction='column' alignItems='center' gap={2}>
                    <Typography variant="h6">Vote for an option:</Typography>
                    {isLoading ?
                        <CircularProgress />
                        :
                        session?.isLoggedIn ?
                        <Stack direction='row' gap={2} justifyContent='center'>
                            {data.options.map((option) => (
                                <Button
                                    key={option.id}
                                    variant="contained"
                                    disabled={hasVoted()}
                                    onClick={() => vote(option.id)}
                                >
                                    {option.text}
                                </Button>
                            ))}
                        </Stack>
                        :
                        <Link href={`/login?returnUrl=${pathname}`}>
                            <Button variant="contained">Login to vote</Button>
                        </Link>
                    }
                    {hasVoted() &&
                        <Typography variant="body1">You voted for: <b>{getVotedOption()?.text}</b></Typography>
                    }
                </Stack>
            }
        </Box>
    );
}