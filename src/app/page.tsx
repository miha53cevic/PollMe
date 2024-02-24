import PageContent from "@/components/PageContent";
import { Box, Grid, Stack, Typography } from "@mui/material";

export default function HomePage() {
    return (
        <PageContent centerY>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Typography variant='h2'>
                        A <u>simple</u> poll creator for anyones needs
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction='row' alignItems='center' height='100%'>
                        Sample Poll component
                    </Stack>
                </Grid>
            </Grid>
        </PageContent>
    );
}
