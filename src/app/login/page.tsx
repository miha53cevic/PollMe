'use client'
import useAuth from "@/hooks/useAuth";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
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
                try {
                    await login({ username: values.username, password: values.password });
                    router.push('/');
                } catch(err) {
                    actions.resetForm({ values: { ...values, password: '' } });
                    actions.setFieldError('username', 'Username or password do not match');
                }
            }}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction='row' justifyContent='center'>
                        <Paper>
                            <Stack direction='column' gap={2} padding={4}>
                                <Box textAlign='center'>
                                    <Typography variant="h2">Login</Typography>
                                </Box>
                                <TextField id='username' label='Username' {...formik.getFieldProps('username')} required />
                                <TextField id='password' label='Password' type="password" {...formik.getFieldProps('password')} required />
                                <Button type="submit" variant="contained">Login</Button>
                                {formik.errors.username && 
                                    <Typography textAlign='center' color='error'>{formik.errors.username}</Typography>
                                }
                                <Box textAlign='center'>
                                    <Link href="/register">{"Don't have an account?"}</Link>
                                </Box>
                            </Stack>
                        </Paper>
                    </Stack>
                </form>
            )}
        </Formik>
    );
}