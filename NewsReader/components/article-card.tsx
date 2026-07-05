// components/article-card.tsx

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Article } from "../data/articles";

interface ArticleCardProps {
    article: Article;
    onPress: (article: Article) => void;
}

const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
    Tech: { bg: "#EFF6FF", text: "#1D4ED8" },
    Policy: { bg: "#F0FDF4", text: "#15803D" },
    Research: { bg: "#FDF4FF", text: "#7E22CE" },
    Industry: { bg: "#FFF7ED", text: "#C2410C" },
    AI: { bg: "#E1F5EE", text: "#0F6E56" },
    Business: { bg: "#FEFCE8", text: "#854D0E" },
};
const DEFAULT_COLOUR = { bg: "#F1F5F9", text: "#475569" };

export default function ArticleCard({ article, onPress }: ArticleCardProps) {
    const colour = CATEGORY_COLOURS[article.category] ?? DEFAULT_COLOUR;

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(article)} activeOpacity={0.7}>
            <View style={styles.meta}>
                <View style={[styles.badge, { backgroundColor: colour.bg }]}>
                    <Text style={[styles.badgeText, { color: colour.text }]}>{article.category}</Text>
                </View>
                <Text style={styles.date}>{article.date}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
                {article.title}
            </Text>
            <Text style={styles.summary} numberOfLines={2}>
                {article.summary}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.author}>{article.author}</Text>
                <Text style={styles.readMore}>Read more</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
    badgeText: { fontSize: 11, fontWeight: "600" },
    date: { fontSize: 11, color: "#94A3B8" },
    title: { fontSize: 15, fontWeight: "700", color: "#0D1F4E", lineHeight: 22, marginBottom: 6 },
    summary: { fontSize: 13, color: "#64748B", lineHeight: 19, marginBottom: 12 },
    footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    author: { fontSize: 12, color: "#94A3B8", fontStyle: "italic" },
    readMore: { fontSize: 12, color: "#0D9488", fontWeight: "600" },
});
