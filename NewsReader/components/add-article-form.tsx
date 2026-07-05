// components/add-article-form.tsx

import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Article } from "../data/articles";
import FormField from "./form-field";

interface AddArticleFormProps {
    onSubmitSuccess: (article: Article) => void;
    onCancel: () => void;
}

// Shape of the form's own state
interface FormData {
    title: string;
    category: string;
    author: string;
    email: string;
    summary: string;
    body: string;
}

interface FormErrors {
    title?: string;
    category?: string;
    author?: string;
    email?: string;
    summary?: string;
    body?: string;
}

// Validation logic — pure function, easy to test and reason about
function validateForm(data: FormData): FormErrors {
    const newErrors: FormErrors = {};

    // Required field checks
    if (data.title.trim().length === 0) {
        newErrors.title = "Title is required.";
    } else if (data.title.trim().length < 10) {
        newErrors.title = "Title must be at least 10 characters.";
    }

    if (data.category.trim().length === 0) {
        newErrors.category = "Category is required.";
    }

    if (data.author.trim().length === 0) {
        newErrors.author = "Author name is required.";
    } else if (data.author.trim().length < 3) {
        newErrors.author = "Author name must be at least 3 characters.";
    }

    // Email validation with regex
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (data.email.trim().length === 0) {
        newErrors.email = "Email is required.";
    } else if (!emailPattern.test(data.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
    }

    if (data.summary.trim().length === 0) {
        newErrors.summary = "Summary is required.";
    } else if (data.summary.trim().length < 20) {
        newErrors.summary = "Summary must be at least 20 characters.";
    }

    if (data.body.trim().length === 0) {
        newErrors.body = "Article body is required.";
    } else if (data.body.trim().length < 50) {
        newErrors.body = "Article body must be at least 50 characters.";
    } else if (data.body.trim().length > 200) {
        newErrors.body = "Article body must not exceed 200 characters.";
    }

    return newErrors;
}

export default function AddArticleForm({ onSubmitSuccess, onCancel }: AddArticleFormProps) {
    // Combined state — all 6 text fields live together
    const [formData, setFormData] = useState<FormData>({
        title: "",
        category: "",
        author: "",
        email: "",
        summary: "",
        body: "",
    });

    // Separate state — unrelated to form field values
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Tracks which fields have been touched (blurred) by the user
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Tracks whether the user has attempted to submit the form
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const [submitTrigger, setSubmitTrigger] = useState(false);

    // Generic field updater — one function handles all 6 fields
    const updateField = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const markTouched = (field: keyof FormData) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    // Re-validate automatically whenever any field changes.
    // The dependency array [formData] means: run this effect
    // again whenever formData is a new object (i.e. on every keystroke).
    useEffect(() => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);
    }, [formData]);

    // Derived value — not state, computed fresh every render
    const isFormValid =
        Object.keys(errors).length === 0 &&
        formData.title.length > 0 &&
        formData.category.length > 0 &&
        formData.author.length > 0 &&
        formData.email.length > 0;

    const handleSubmitPress = () => {
        // Mark every field touched so any remaining errors show
        setTouched({
            title: true,
            category: true,
            author: true,
            email: true,
            summary: true,
            body: true,
        });
        setSubmitAttempted(true);

        if (isFormValid) {
            setIsSubmitting(true);
            setSubmitTrigger(true);
        }
    };

    const handleCancelPress = () => {
        // Check if any field has been filled
        const hasData = Object.values(formData).some((value) => value.trim().length > 0);

        if (hasData) {
            Alert.alert(
                "Discard Article?",
                "You have unsaved changes. Are you sure you want to discard this article?",
                [
                    { text: "Keep Editing", style: "cancel" },
                    {
                        text: "Discard",
                        style: "destructive",
                        onPress: () => onCancel(),
                    },
                ]
            );
        } else {
            onCancel();
        }
    };

    // Submit effect
    // This effect runs when the user presses the submit button.
    // It simulates a network request and calls onSubmitSuccess with
    // the new article data after a 1.5 second delay.
    useEffect(() => {
        if (!submitTrigger) return;

        // Simulate a 1.5 second network request
        const timeoutId = setTimeout(() => {
            const newArticle: Article = {
                id: Date.now().toString(),
                title: formData.title.trim(),
                category: formData.category.trim(),
                author: formData.author.trim(),
                date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
                summary: formData.summary.trim(),
                body: formData.body.trim(),
            };

            setIsSubmitting(false);
            setSubmitTrigger(false);
            onSubmitSuccess(newArticle);
        }, 1500);

        // Cleanup: if the component unmounts (user navigates away)
        // before the timeout fires, cancel it. Without this, the
        // setTimeout callback would try to update state on an
        // unmounted component — a common source of bugs and warnings.
        return () => {
            clearTimeout(timeoutId);
        };
    }, [submitTrigger]);

    // Character counter for body field
    const bodyLength = formData.body.length;
    const bodyMaxLength = 200;
    const bodyExceedsLimit = bodyLength > bodyMaxLength;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Submit Your Article</Text>
            <Text style={styles.subheading}>
                Fill in the details below to add your article to the NewsReader directory.
            </Text>

            <FormField
                label="Article Title"
                value={formData.title}
                onChangeText={(text) => updateField("title", text)}
                onBlur={() => markTouched("title")}
                placeholder="e.g. Breaking News in Mobile Development"
                error={touched.title || submitAttempted ? errors.title : undefined}
            />

            <FormField
                label="Category"
                value={formData.category}
                onChangeText={(text) => updateField("category", text)}
                onBlur={() => markTouched("category")}
                placeholder="e.g. Tech, Policy, Research, Industry, AI, Business"
                error={touched.category || submitAttempted ? errors.category : undefined}
            />

            <FormField
                label="Author Name"
                value={formData.author}
                onChangeText={(text) => updateField("author", text)}
                onBlur={() => markTouched("author")}
                placeholder="e.g. John Doe"
                error={touched.author || submitAttempted ? errors.author : undefined}
            />

            <FormField
                label="Author Email"
                value={formData.email}
                onChangeText={(text) => updateField("email", text)}
                onBlur={() => markTouched("email")}
                placeholder="e.g. author@example.com"
                autoCapitalize="none"
                error={touched.email || submitAttempted ? errors.email : undefined}
            />

            <FormField
                label="Summary"
                value={formData.summary}
                onChangeText={(text) => updateField("summary", text)}
                onBlur={() => markTouched("summary")}
                placeholder="A brief summary of your article..."
                multiline
                error={touched.summary || submitAttempted ? errors.summary : undefined}
            />

            <FormField
                label="Article Body"
                value={formData.body}
                onChangeText={(text) => updateField("body", text)}
                onBlur={() => markTouched("body")}
                placeholder="The main content of your article..."
                multiline
                error={touched.body || submitAttempted ? errors.body : undefined}
            />

            {/* Character counter for body */}
            <Text style={[styles.characterCounter, bodyExceedsLimit && styles.characterCounterError]}>
                {bodyLength} / {bodyMaxLength} characters
            </Text>

            <View style={styles.buttonRow}>
                <Pressable
                    style={[styles.button, styles.buttonCancel]}
                    onPress={handleCancelPress}
                    disabled={isSubmitting}
                >
                    <Text style={styles.buttonCancelText}>Cancel</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.buttonSubmit, !isFormValid && styles.buttonDisabled]}
                    onPress={handleSubmitPress}
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonSubmitText}>Submit Article</Text>
                    )}
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
    heading: { fontSize: 20, fontWeight: "800", color: "#0D1F4E", marginBottom: 4 },
    subheading: { fontSize: 13, color: "#64748B", marginBottom: 24, lineHeight: 19 },
    characterCounter: {
        fontSize: 11,
        color: "#64748B",
        textAlign: "right",
        marginTop: -12,
        marginBottom: 16,
    },
    characterCounterError: {
        color: "#DC2626",
        fontWeight: "600",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
        marginBottom: 32,
    },
    button: {
        flex: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    buttonCancel: {
        backgroundColor: "#F1F5F9",
        borderWidth: 1,
        borderColor: "#CBD5E1",
    },
    buttonCancelText: {
        color: "#475569",
        fontSize: 15,
        fontWeight: "700",
    },
    buttonSubmit: {
        backgroundColor: "#0D9488",
    },
    buttonDisabled: {
        backgroundColor: "#CBD5E1",
    },
    buttonSubmitText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
});
