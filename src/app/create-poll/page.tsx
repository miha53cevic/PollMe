'use client'
import PageContent from "@/components/PageContent";
import { Box, Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import { FieldArray, Formik } from "formik";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const defualtValues = {
    question: "",
    options: [
        "",
        "",
    ],
};

export default function CreatePollPage() {
    return (
        <PageContent my={4}>
            <Paper>
                <Formik
                    initialValues={defualtValues}
                    onSubmit={async (values, actions) => {
                        console.log(values);
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
                                            <Stack direction='row' justifyContent='end'>
                                                <IconButton onClick={() => arrayHelpers.push('')}>
                                                    <AddIcon color="action" />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    )}
                                />
                                <Button type="submit" variant="contained">Create Poll</Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </Paper>
        </PageContent>
    );
}