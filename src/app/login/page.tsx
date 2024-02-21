'use client'
import useAuth from "@/hooks/useAuth";
import { Button, Paper, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const defaultValues = {
    username: "",
    password: "",
};

export default function LoginPage() {
    const { session, isLoading, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (session?.isLoggedIn && isLoading === false) {
            router.push('/');
        }
    });

    return (
        <Formik
            initialValues={defaultValues}
            onSubmit={async (values, actions) => {
                await login({ username: values.username, password: values.password });
                actions.setSubmitting(false);  
                router.push('/');
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='column' alignItems='center' gap={2}>
                        <TextField id='username' placeholder="Username" {...formik.getFieldProps('username')} />
                        <TextField id='password' placeholder="Password" type="password" {...formik.getFieldProps('password')} />
                        <Button type="submit" variant="contained">Login</Button>
                    </Stack>
                </form>
            )}
        </Formik>
    );
}