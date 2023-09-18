"use client";
import { Box, Button, Group, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import FullContainer from "@/app/components/(mantine)/fullContainer";
import { userValidation } from "@/app/utilities/utilities";
import { usePostLoginUserMutation } from "@/features/apiSlice";
import { useDispatch } from "react-redux";
import { userLoginState } from "@/features/user/userSlice";

export default function Login() {
    const router = useRouter();
    const form = useForm(userValidation(false));
    const [postLoginUser, { isLoading }] = usePostLoginUserMutation();
    const dispatch = useDispatch();
    const loginFormSubmission = form.onSubmit(async ({ email, password}) => {
        if (form.isValid) {
            try {
                const payload = await postLoginUser({ username: email, password}).unwrap();
                localStorage.setItem('refresh_key', payload.refresh);
                localStorage.setItem('access_key', payload.access);                
                dispatch(userLoginState(true));
                router.push('/todo');
            } catch (e) {
                console.log('Error trying to login user', e);
            }         
        }
    });
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
                        Login
                    </Text>
                    <form onSubmit={loginFormSubmission}>
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
                            radius="sm"
                            withAsterisk
                            {...form.getInputProps('password')}
                        />
                        <Group position="right" mt="md">
                            <Button type="submit">Login</Button>
                        </Group>
                    </form>
                </Paper>
            </Box>
        </FullContainer>
    )
}