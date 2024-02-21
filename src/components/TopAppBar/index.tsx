'use client'
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface TopAppBarProps {
    color?: "inherit" | "primary" | "secondary" | "default" | "transparent",
    elevation?: number,
}

type NavigationPath = {
    path: string,
    label: string,
};
const navigationPaths = [
    { path: '/', label: 'Home' },
    { path: '/create-poll', label: 'Create Poll' },
    { path: '/list', label: 'List' },
];

export default function TopAppBar({ color, elevation }: TopAppBarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? '#000' : '#fff';
    }

    return (
        <AppBar position="static" color={color} elevation={elevation} id='appBar'>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    Logo
                </Box>
                <Box>
                    {navigationPaths.map(navPath => (
                        <Link key={navPath.path} href={navPath.path}>
                            <Button sx={{ color: isActive(navPath.path) }}>{navPath.label}</Button>
                        </Link>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
