"use client"
import { Box, Button, Center, Flex, Group, Header, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { passwordErrors } from "@/app/utilities/utilities";
import FullContainer from "@/app/components/(mantine)/fullContainer";

export default function SignUp() {
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => {
                return passwordErrors(value)
            },
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
                        Create Account
                    </Text>
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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