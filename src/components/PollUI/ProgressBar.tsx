import { Box } from "@mui/material";

export interface ProgressBarProps {
    progress: number,
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <Box sx={{ 
            width: "100%",
            height: "1rem",
            backgroundColor: "grey",
            position: "relative",
            borderRadius: "0.5rem",
         }}>
            <Box sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: `${progress}%`,
                backgroundColor: "green",
                borderRadius: "0.5rem",
                textAlign: "center",
                lineHeight: "1rem",
                color: "white",
                fontWeight: "bold",
            }}>{progress ? `${progress.toFixed(1)}%` : ''}</Box>
        </Box>
    );
}