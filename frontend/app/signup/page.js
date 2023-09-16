"use client"
import { Box, Button, Center, Flex, Group, Header, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { userValidation } from "@/app/utilities/utilities";
import FullContainer from "@/app/components/(mantine)/fullContainer";
import { usePostCreateUserMutation } from "@/features/apiSlice";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginState, userSelector } from '@/features/user/userSlice';

export default function SignUp() {
    const userLoggedIn = useSelector(userSelector);
    const form = useForm(userValidation());
    const router = useRouter();
    const [postCreateUser, { isLoading }] = usePostCreateUserMutation();
    const dispatch = useDispatch();
    console.log(userLoggedIn + " Before click: ")
    const createUserFormSubmission = form.onSubmit(async ({ email, password}) => {
        if (form.isValid) {
            try {
                const payload = await postCreateUser({ username: email, password }).unwrap();
                localStorage.setItem('refresh_key', payload.refresh);
                router.push('/todo');
            } catch(e) {
                dispatch(userLoginState(true));
                console.log(userLoggedIn + " After click: ")
                console.log('Error trying to login user', e);
            }
        }
    })

    return (
        <FullContainer h={600} mah={700}>
            <Box w={400}>
                <Paper radius="sm" shadow="lg" p="md" withBorder>
                    <Text
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        ta="center"
                        fz="xl"
                        fw={700}
                    >
                        Create Account
                    </Text>
                    <form onSubmit={createUserFormSubmission}>
                        <TextInput
                            withAsterisk
                            required
                            label="Email"
                            placeholder="your@email.com"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput
                            pt={10}
                            placeholder="Password"
                            label="Password"
                            description="Password must include at least one letter, number and special character"
                            radius="sm"
                            withAsterisk
                            {...form.getInputProps('password')}

                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Create Account</Button>
                        </Group>
                    </form>
                </Paper>
            </Box>
        </FullContainer>
    )
}