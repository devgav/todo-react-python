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
import { useDispatch, useSelector } from 'react-redux';
import { userLoginState, userSelector } from "@/features/user/userSlice";


export function Navigation() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const userLoggedIn = useSelector(userSelector)
    const { classes, theme } = useStyles(undefined, undefined);
    const dispatch = useDispatch();
    function userLogout() {
        dispatch(userLoginState(false));
        localStorage.removeItem('refresh_key');
        localStorage.removeItem('access_key');
    }
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
                        {
                            userLoggedIn ? (
                                <Link href="/" passHref>
                                    <Button variant="default" onClick={userLogout}>Log out</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" passHref>
                                        <Button variant="default">Log in</Button>
                                    </Link>
                                    <Link href="/signup" passHref>
                                        <Button>Sign up</Button>
                                    </Link>
                                </>
                            )
                        }
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
                        {
                            userLoggedIn ? (
                                <Button component="a" href="/" variant="default" onClick={userLogout}>Log Out</Button>
                            ) : (
                                <>
                                    <Button component="a" href="/login" variant="default">Login</Button>
                                    <Button component="a" href="/signup">Sign up</Button>
                                </>
                            )
                        }
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}