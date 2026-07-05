import { Stack } from "expo-router";

export default function SettingLayout() {
    return (
        <Stack screenOptions={{ headerShown: true }}>
            <Stack.Screen name="index"></Stack.Screen>
            <Stack.Screen name="account-settings"></Stack.Screen>
            <Stack.Screen name="theme-settings" 
			options={{title: "Change your theme"}}></Stack.Screen>
        </Stack>
    );
}
