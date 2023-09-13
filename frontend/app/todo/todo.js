import { Box, Group, Paper, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useStyles } from "@/app/todo/useStyles";
import TodoForm from "@/app/components/(mantine)/TodoForm";
import { isSmallScreen } from "@/app/utilities/utilities";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function Todo({ task, viewPortSize, deadline }) {
    const router = useRouter();
    const { classes } = useStyles(undefined, undefined);
    const [todoOpened, { toggle: todoToggleHandler }] = useDisclosure(true);
    function taskClipper(task) {
        let taskArr = task.split('');
        if (isSmallScreen(viewPortSize) && task.length > 22) {
            taskArr.splice(23, task.length - 1, "...");
        }
        return taskArr.join('');
    }
    
    function onTrashClick() {
        console.log("trash can clicked")
    }
    
    function onEditClick() {
        todoToggleHandler();
        console.log("edit clicked")
    }
    
    function onTaskView(e) {
        e.preventDefault();
        router.push('/todo/[id]');
    }
    
    return (
        <Box className={classes.todoPointer} >
            {
                todoOpened ?  (
                    <Paper onDoubleClick={onTaskView} shadow="sm" p="md" w={850} className={classes.todoTaskMobile}>
                        <Group position="apart" grow>
                            <Text>{ taskClipper(task) }</Text>
                            {
                                isSmallScreen(viewPortSize) ? null : (
                                    <Group position="right">
                                        <Text>
                                            { deadline }
                                        </Text>
                                    </Group>
                                )
                            }
                            <Group position="right">
                                <IconTrash color="red" onClick={onTrashClick}></IconTrash>
                                <IconPencil onClick={onEditClick}/>
                            </Group>
                        </Group>
                    </Paper>
                ) : <TodoForm className={classes.todoMobile} create={todoOpened} closeEdit={todoToggleHandler} />
                    
            }
        </Box>
    )
}