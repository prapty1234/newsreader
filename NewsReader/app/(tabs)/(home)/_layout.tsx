// app/(tabs)/(home)/_layout.tsx

import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#0D1F4E" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            <Stack.Screen name="index" options={{ title: "Top Stories" }} />
            <Stack.Screen name="[id]" options={{ title: "Article" }} />
        </Stack>
    );
}
