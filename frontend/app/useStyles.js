import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
    screenFormat: {
        height: "100vh",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
    },
    backgroundImage: {
        width: "100%",
        height: "100%"
    },
    center: {
        height: "100%"
    },
}));