import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function SettingsHome() {
    return (
        <View>
            <TouchableOpacity style={{ backgroundColor: "#ffffff" }} onPress={router.back}>
                Back
            </TouchableOpacity>
        </View>
    );
}
