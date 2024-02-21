'use client'
import { SessionData } from "@/CustomTypes";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

async function sessionFetcher(url: string) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return await response.json();
}

const defaultSession: SessionData = {
    username: '',
    isLoggedIn: false,
};

async function loginFetcher(url: string, { arg }: { arg: { username: string, password: string } }) {
    const formData = new FormData();
    formData.append('username', arg.username);
    formData.append('password', arg.password);
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
    });
    return await response.json();
}

async function logoutFetcher(url: string) {
    const response = await fetch(url, {
        method: 'DELETE',
    });
}

export default function useAuth() {
    const { data: session, isLoading } = useSWR<SessionData>('/api/auth', sessionFetcher, {
        fallbackData: defaultSession,
    });

    const { trigger: login } = useSWRMutation('/api/auth', loginFetcher);
    const { trigger: logout } = useSWRMutation('/api/auth', logoutFetcher);

    return {
        session,
        isLoading,
        login,
        logout,
    };
}