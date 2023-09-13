import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    todoMobile: {
        [theme.fn.smallerThan('sm')]: {
            width: '400px',
        },
    },
    todoTaskMobile: {
        [theme.fn.smallerThan('sm')]: {
            width: '300px',
        },
    },
    todoPointer : {
        cursor: "pointer"
    },
}));