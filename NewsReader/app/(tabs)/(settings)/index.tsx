import { router } from "expo-router";
import { Pressable, TouchableOpacity, View } from "react-native";

export default function SettingsHome() {
    const handlePress = (article: Article) => {
        router.navigate({
            pathname: "/(settings)/theme-settings",
        });
    };
	return (
		<View>
			<TouchableOpacity onPress={handlePress}
			style={{backgroundColor: '#ffffff'}}>Theme Settings</TouchableOpacity>
		</View>
	);
}