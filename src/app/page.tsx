import { PollData } from "@/CustomTypes";
import PageContent from "@/components/PageContent";
import PollUI from "@/components/PollUI";
import { Grid, Stack, Typography } from "@mui/material";

const examplePollData: PollData = {
    id: 1,
    question: "What is your favorite programming language?",
    author: 'exampleUser',
    options: [
        { 
            id: 1, 
            text: 'Python', 
            votes: [
                { id: 1, optionId: 1, voter: 'exampleUser2' },
                { id: 2, optionId: 1, voter: 'exampleUser2' },
                { id: 3, optionId: 1, voter: 'exampleUser2' },
                { id: 3, optionId: 1, voter: 'exampleUser2' },
                { id: 3, optionId: 1, voter: 'exampleUser2' },
            ]
        },
        { 
            id: 2, 
            text: 'Typescript', 
            votes: [
                { id: 3, optionId: 1, voter: 'exampleUser3' },
                { id: 4, optionId: 1, voter: 'exampleUser3' },
                { id: 4, optionId: 1, voter: 'exampleUser3' },
            ] 
        },
        { id: 3, text: 'C', votes: [{ id: 5, optionId: 1, voter: 'exampleUser4' }] },
    ]
};

export default function HomePage() {
    return (
        <PageContent centerY>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Stack direction='row' alignItems='center' height='100%'>
                        <Typography variant='h2'>
                            A <u>simple</u> poll creator for anyones needs
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction='row' alignItems='center' height='100%'>
                        <PollUI data={examplePollData} disableVoting />
                    </Stack>
                </Grid>
            </Grid>
        </PageContent>
    );
}
