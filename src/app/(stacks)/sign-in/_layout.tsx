import { Stack } from 'expo-router';

export default function StackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="home" />
            <Stack.Screen name="model" />
        </Stack>
    );
}
