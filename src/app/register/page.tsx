
'use client'
import PageContent from "@/components/PageContent";
import useAuth from "@/hooks/useAuth";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { Formik, FormikErrors } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const defaultValues = {
    username: "",
    password: "",
    repeatPassword: "",
};

export default function RegisterPage() {
    const { session, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (session?.isLoggedIn && isLoading === false) {
            router.replace('/');
        }
    });

    return (
        <PageContent centerY>
            <Formik
                initialValues={defaultValues}
                onSubmit={async (values, actions) => {
                    const formData = new FormData();
                    formData.append('username', values.username);
                    formData.append('password', values.password);

                    try {
                        const response = await fetch('/api/auth/register', {
                            method: 'POST',
                            body: formData,
                        });
                        router.push('/login');
                    } catch (err) {
                        actions.resetForm();
                        actions.setFieldError('username', 'Username already exists');
                    }
                }}
                validate={(values) => {
                    const errors: FormikErrors<typeof defaultValues> = {};
                    if (values.password !== values.repeatPassword) {
                        errors.repeatPassword = "Passwords do not match";
                    }
                    return errors;
                }}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction='row' justifyContent='center'>
                            <Paper>
                                <Stack direction='column' gap={2} padding={4}>
                                    <Box textAlign='center'>
                                        <Typography variant="h2">Register</Typography>
                                    </Box>
                                    <TextField id='username' label='Username' {...formik.getFieldProps('username')} required />
                                    <TextField id='password' label='Password' type="password" {...formik.getFieldProps('password')} required />
                                    <TextField id='password' label='Password' type="password" {...formik.getFieldProps('repeatPassword')} required />
                                    <Button type="submit" variant="contained">Register</Button>
                                    {formik.errors.repeatPassword && formik.touched.repeatPassword &&
                                        <Typography textAlign='center' color='error'>{formik.errors.repeatPassword}</Typography>
                                    }
                                    <Box textAlign='center'>
                                        <Link href="/login">{"Already have an account?"}</Link>
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