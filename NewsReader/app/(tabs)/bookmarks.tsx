// app/(tabs)/bookmarks.tsx

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookmarks() {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.icon}>🔖</Text>
                <Text style={styles.title}>Bookmarks</Text>
                <Text style={styles.subtitle}>Articles you save will appear here.{"\n"}Coming in a future week.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    content: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
    icon: { fontSize: 48, marginBottom: 16 },
    title: { fontSize: 20, fontWeight: "700", color: "#0D1F4E", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#94A3B8", textAlign: "center", lineHeight: 22 },
});
