'use client'
import useAuth from '@/hooks/useAuth';
import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

export interface TopAppBarProps {
    color?: "inherit" | "primary" | "secondary" | "default" | "transparent",
    elevation?: number,
}

type NavigationPath = {
    path: string,
    label: string,
};
const navigationPaths: NavigationPath[] = [
    { path: '/', label: 'Home' },
    { path: '/create-poll', label: 'Create Poll' },
    { path: '/list', label: 'List' },
];

export default function TopAppBar({ color, elevation }: TopAppBarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? '#000' : '#fff';
    }

    const { session, isLoading, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
    }

    return (
        <AppBar position="static" color={color} elevation={elevation} id='appBar'>
            <Toolbar>
                <Stack alignItems='center' sx={{ marginRight: 2 }}>
                    <Image src='/favicon.svg' alt='logo' width={50} height={50} />
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                    {navigationPaths.map(navPath => (
                        <Link key={navPath.path} href={navPath.path}>
                            <Button sx={{ color: isActive(navPath.path) }}>{navPath.label}</Button>
                        </Link>
                    ))}
                </Box>
                <Box>
                    {!session?.isLoggedIn ?
                        <Link href='/login'>
                            <Button variant='contained' color='secondary' disabled={isLoading}>Login</Button>
                        </Link>
                        :
                        <Stack direction='row' gap={2} alignItems='center'>
                            Greetings, {session?.username}
                            <Button variant='contained' color='secondary' disabled={isLoading} onClick={handleLogout}>Logout</Button>
                        </Stack>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
}
