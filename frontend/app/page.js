"use client"

import  {
    BackgroundImage,
    Box, Button,
    Center,
    Divider,
    Flex,
    Paper,
    Space,
    Text
} from "@mantine/core";
import Link from "next/link";
import { useStyles } from "@/app/useStyles";



export default function Home() {
    const { classes } = useStyles(undefined, undefined)
    return (
        <Box className={classes.screenFormat}>
            <BackgroundImage
                src="https://img.freepik.com/free-photo/top-view-notebooks-desk-with-succulent-plant-paper-clips_23-2148415025.jpg?w=1380&t=st=1694048529~exp=1694049129~hmac=8e366e2f04778d4cc7498f2f6e97fd036a704a07cfb05f0e1508db715c60dc44"
                className={classes.backgroundImage}
            >
                <Center className={classes.center}>
                    <Paper p="lg" shadow="sm">
                        <Text size="xl" p="lg">
                            Ready to start making a change?
                            
                        </Text>
                        <Divider size="xs"/>
                        <Space h="xs"/>
                        <Flex
                            wrap="wrap"
                            justify="center"
                            align="center"
                        >
                            <Link href="/signup">
                                <Button>
                                    <Text>Start Now!</Text>
                                </Button>
                            </Link>    
                        </Flex>
                    </Paper>
                </Center>
            </BackgroundImage>
        </Box>
    )
}