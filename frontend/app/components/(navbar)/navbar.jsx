"use client"

import {
    Header,
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem, Title
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import Link from "next/link";
import { useStyles } from "@/app/components/(navbar)/useStyles";


export function Navigation() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes, theme } = useStyles(undefined, undefined);

    return (
        <Box>
            <Header height={60} px="md">
                <Group position="apart" sx={{ height: '100%' }}>
                    <Link href="/" className={classes.linkStyling}>
                        <Title  
                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} 
                            size="h3">
                            Todo Application
                        </Title>
                    </Link>

                    <Group className={classes.hiddenMobile}>
                        <Link href="/login" passHref>
                            <Button variant="default">Log in</Button>
                        </Link>
                        <Link href="/signup" passHref>
                            <Button>Sign up</Button>
                        </Link>
                    </Group>
                    
                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                title="Navigation"
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">

                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

                    <Group position="center" grow pb="xl" px="md">
                        <Button component="a" href="/login" variant="default">Login</Button>
                        <Button component="a" href="/signup">Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}