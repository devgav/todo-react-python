"use client"
import { Box, Button, Flex, Group, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import FullContainer from "@/app/components/(mantine)/fullContainer";

export default function Login() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),            
            password: (value) => (value.length === 0) ? 'No password entered' : null,
        },
        validateInputOnChange: true
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
                    <form onSubmit={form.onSubmit((values) => {
                        if (form.isValid) {
                            console.log(values.email);
                            console.log(values.password);
                            router.push("/todo")
                        }
                    })}>
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