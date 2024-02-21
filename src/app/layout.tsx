import type { Metadata } from "next";
import { AppRouterCacheProvider  } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import Theme from "../Theme";
import { CssBaseline } from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TopAppBar from "@/components/TopAppBar";

export const metadata: Metadata = {
    title: "PollMe",
    description: "Simple and easy to use polling app",
    icons: {
        icon: "/favicon.svg",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AppRouterCacheProvider>
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <body>
                        <TopAppBar />
                        <main>
                            {children}
                        </main>
                    </body>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </html>
    );
}
