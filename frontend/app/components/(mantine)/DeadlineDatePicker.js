import { DateTimePicker } from "@mantine/dates";
import { useStyles } from "@/app/todo/useStyles";

export default function DeadlineDatePicker({ dateError, form }) {
    const { classes } = useStyles(undefined, undefined);
    return (
        <DateTimePicker
            clearable
            valueFormat="MM/DD/YYYY hh:mm A"
            className={classes.todoMobile}
            w={200}
            mt={dateError ? 17 : undefined}
            defaultValue={new Date()}
            placeholder="Deadline"
            mx="auto"
            {...form.getInputProps('date')}
        />
    )
}