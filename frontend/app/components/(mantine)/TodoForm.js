import { Button, Center, Group, Paper, TextInput } from "@mantine/core";
import DeadlineDatePicker from "@/app/components/(mantine)/DeadlineDatePicker";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { todoForm } from "@/app/utilities/utilities";
import { useState } from "react";

export default function TodoForm({  className, create = true, closeEdit }) {
    const [isDateError, setDateError] = useState(false);
    const form = useForm(todoForm(setDateError));

    return (
        <Paper shadow="md" p="md">
            <form onSubmit={form.onSubmit((values,event) => {
                event.preventDefault();
                if (!create) {
                    closeEdit();
                }
                console.log(values)
            })}>
                <Group>
                    <TextInput
                        w={500}
                        className={className}
                        placeholder={ create ? "Your amazing task... " : "Edit your task..."}
                        {...form.getInputProps("task")}
                    />
                    <DeadlineDatePicker form={form} dateError={isDateError}/>
                    {
                        create ? (
                            <Button type="submit">Create New Todo</Button>
                        ) : (
                            <Button type="submit"><IconDeviceFloppy/></Button>
                        )
                    }
                </Group>
            </form>
        </Paper>
    )
}