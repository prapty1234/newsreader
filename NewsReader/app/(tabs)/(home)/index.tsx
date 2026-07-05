// app/(tabs)/(home)/index.tsx

import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddArticleForm from "../../../components/add-article-form";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";

export default function ArticleList() {
    // Local copy of the article list so we can add to it
    const [articles, setArticles] = useState<Article[]>(ARTICLES);
    const [showForm, setShowForm] = useState(false);

    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(home)/[id]",
            params: { id: article.id, title: article.title },
        });
    };

    const handleNewArticle = (newArticle: Article) => {
        // Lifting state up in action: the form hands the new
        // article back to this parent screen, which prepends
        // it to the list.
        setArticles((prev) => [newArticle, ...prev]);
        setShowForm(false);
    };

    const handleCancelForm = () => {
        setShowForm(false);
    };

    if (showForm) {
        return <AddArticleForm onSubmitSuccess={handleNewArticle} onCancel={handleCancelForm} />;
    }

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={articles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ArticleCard article={item} onPress={handlePress} />}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View style={styles.listHeader}>
                        <View style={styles.headerRow}>
                            <Text style={styles.listHeaderText}>{articles.length} stories</Text>
                            <Pressable style={styles.addButton} onPress={() => setShowForm(true)}>
                                <Text style={styles.addButtonText}>+ Add Article</Text>
                            </Pressable>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#F0F4F8" },
    list: { paddingTop: 12, paddingBottom: 32 },
    listHeader: { paddingHorizontal: 16, paddingBottom: 8 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    listHeaderText: { fontSize: 12, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 1 },
    addButton: {
        backgroundColor: "#0D9488",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },
});
