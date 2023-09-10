"use client"
import FullContainer from "@/app/components/(mantine)/fullContainer";
import { Box, Button, Group, Paper, TextInput, Text, Container, Grid, SimpleGrid, Center } from "@mantine/core";
import { useState } from "react";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import Todo from "@/app/todo/todo";

export default function Todos() {
    const [value, setValue] = useState(null);
    const [isError, setError] = useState(false);
    const form = useForm({
        initialValues: {
            date: '',
        },

        validate: {
            date: (value) => {
                const now = new Date();
                if (now > value) {
                    setError(true)
                    return "This date is in the past"
                }
                setError(false)
                return null
            },
        },
        validateInputOnChange: true
    });
    return (
        <Box mt={30}>
            <Container>
                <SimpleGrid>
                    <Paper shadow="md" p="md">
                        <Group>
                            <TextInput
                                miw={500}
                                placeholder="Your amazing task... "
                            />
                            <DateTimePicker
                                clearable
                                valueFormat="MMM DD YYYY hh:mm A"
                                miw={150}
                                mt={isError ? 17 : 0}
                                defaultValue={new Date()}
                                placeholder="Deadline"
                                mx="auto"
                                {...form.getInputProps('date')}
                            />
                            <Button>Create New Todo</Button>
                        </Group>
                    </Paper>
                    <Paper shadow="md" p="md">
                        <Center>
                            <Text size="lg">No Todo</Text>
                        </Center>
                        <Todo/>
                    </Paper>
                </SimpleGrid>
            </Container>
        </Box>
    )
}