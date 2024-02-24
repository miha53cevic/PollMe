'use client'
import PageContent from "@/components/PageContent";
import { Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { FieldArray, Formik, FormikErrors } from "formik";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/navigation";

const defualtValues = {
    question: "",
    options: [
        "",
        "",
    ],
};

export default function CreatePollPage() {
    const router = useRouter();
    return (
        <PageContent my={4}>
            <Paper>
                <Formik
                    initialValues={defualtValues}
                    onSubmit={async (values, actions) => {
                        const formData = new FormData();
                        formData.append('question', values.question);
                        for (const option of values.options) {
                            formData.append('options', option);
                        }
                        try {
                            const response = await fetch('/api/poll', {
                                method: 'POST',
                                body: formData,
                            });
                            if (!response.ok) throw new Error(await response.text());
                            
                            // Redirect to the new poll
                            const pollId = (await response.json()).poll.id;
                            router.push('/poll/' + pollId);
                        } catch (err) {
                            console.error(err);
                            actions.setFieldError('question', 'Failed to create poll');
                        }
                    }}
                    validate={values => {
                        const errors: FormikErrors<typeof defualtValues> = {};

                        if (values.options.length < 2) errors.options = 'At least 2 options are required';
                        return errors;
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <Stack direction='column' gap={2} padding={4}>
                                <TextField id="question" label="Question" required {...formik.getFieldProps('question')} />
                                <FieldArray
                                    name="options"
                                    render={arrayHelpers => (
                                        <Stack direction='column' gap={2}>
                                            {formik.values.options.map((option, index) => (
                                                <Stack direction='row' gap={2} key={index}>
                                                    <TextField
                                                        label={`Option ${index + 1}`}
                                                        {...formik.getFieldProps(`options.${index}`)}
                                                        fullWidth
                                                        required
                                                    />
                                                    <Box>
                                                        <IconButton onClick={() => arrayHelpers.remove(index)}>
                                                            <DeleteIcon color='error' />
                                                        </IconButton>
                                                    </Box>
                                                </Stack>
                                            ))}
                                            <Stack direction='row' gap={1} justifyContent='end' alignItems='center'>
                                                <Typography variant='caption'>Add Option</Typography>
                                                <IconButton onClick={() => arrayHelpers.push('')}>
                                                    <AddIcon color="action" />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    )}
                                />
                                <Button type="submit" variant="contained" disabled={formik.isSubmitting}>Create Poll</Button>
                                {formik.errors.question &&
                                    <Box textAlign='center'>
                                        <Typography color='error'>{formik.errors.question}</Typography>
                                    </Box>
                                }
                                {formik.errors.options && formik.touched.options &&
                                    <Box textAlign='center'>
                                        <Typography color='error'>{formik.errors.options}</Typography>
                                    </Box>
                                }
                            </Stack>
                        </form>
                    )}
                </Formik>
            </Paper>
        </PageContent>
    );
}