"use client"
import FullContainer from "@/app/components/(mantine)/fullContainer";
import { Button, Container, Group, Paper, TextInput } from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";

export default function Todo() {
    return (
        <FullContainer h={600} mah={700}>
            <Paper shadow="md" p="md">
                <Group>
                    <TextInput miw={500} placeholder="Your amazing task... " rightSection={<IconCalendarEvent/>}></TextInput>
                    <Button>Create New Todo</Button>
                </Group>
                
            </Paper>
        </FullContainer>
    )
}