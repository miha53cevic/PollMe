'use client'
import PageContent from "@/components/PageContent";
import useAuth from "@/hooks/useAuth";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const defaultValues = {
    username: "",
    password: "",
};

export default function LoginPage() {
    const { session, isLoading, login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnUrl = searchParams.get('returnUrl'); // get the returnUrl from the query string, /login?returnUrl=/some/path

    // Redirect to returnUrl if the user is already logged in
    useEffect(() => {
        if (session?.isLoggedIn && isLoading === false) {
            if (returnUrl) router.push(returnUrl ? returnUrl : '/'); // send back to returnUrl if it exists
            else router.replace('/');
        }
    }, [isLoading, session, router, returnUrl]);

    return (
        <PageContent centerY>
            <Formik
                initialValues={defaultValues}
                onSubmit={async (values, actions) => {
                    try {
                        await login({ username: values.username, password: values.password });
                        router.push(returnUrl ? returnUrl : '/'); // send back to returnUrl if it exists
                    } catch (err) {
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
                                    <Button type="submit" variant="contained" disabled={formik.isSubmitting}>Login</Button>
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
        </PageContent>
    );
}