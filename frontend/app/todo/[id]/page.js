"use client"
import FullContainer from "@/app/components/(mantine)/fullContainer";
import { Box, Button, Group } from "@mantine/core";

export default function TodoCreate() {
    return (
        <FullContainer h={600} mah={700}>
            <Box>
                <Group>
                    <Button>Create New Todo</Button>
                </Group>
                <h1>Individual todo</h1>
            </Box>
        </FullContainer>
    )
}