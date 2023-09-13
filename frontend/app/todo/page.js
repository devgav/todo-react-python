"use client"
import { Box, Paper, Container, SimpleGrid, Center } from "@mantine/core";
import Todo from "@/app/todo/todo";
import { useStyles } from "@/app/todo/useStyles";
import { useViewportSize } from "@mantine/hooks";
import TodoForm from "@/app/components/(mantine)/TodoForm";

export default function Todos() {
    const { classes } = useStyles(undefined, undefined);
    const { height, width } = useViewportSize();
    const length = () => {
        const a = []
        for(let i = 0; i < 10; i++) {
            a.push(i);
        }
        return a;
    }
    return (
        <Box mt={30}>
            <Container>
                <SimpleGrid>
                    <TodoForm 
                        className={classes.todoMobile} 
                    />
                    <Paper shadow="md" p="md" mb={20}>
                        <Center>
                            <SimpleGrid cols={1}>
                                {
                                    length().map((index) => (
                                        <Todo task="Some task 1asdfasdfasdfasdfasdf"
                                              key={index}
                                              deadline="09/22/2023 12:00AM"
                                              viewPortSize={{height, width}}
                                              
                                        />
                                    ))
                                }
                            </SimpleGrid>
                        </Center>
                    </Paper>
                </SimpleGrid>
            </Container>
        </Box>
    )
}