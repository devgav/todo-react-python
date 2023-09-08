import { Box, Container, Flex } from "@mantine/core";

export default function FullContainer({ children, h, mah }) {
    return (
        <Flex
            justify="center"
            align="center"
            h={h}
            mah={mah}
            p="xs"
        >
            {children}
        </Flex>
    )
}