// data/articles.ts

export interface Article {
    id: string;
    title: string;
    category: string;
    author: string;
    date: string;
    summary: string;
    body: string;
}

export const ARTICLES: Article[] = [
    {
        id: "1",
        title: "React Native 0.75 Brings New Architecture by Default",
        category: "Tech",
        author: "Sarah Chen",
        date: "June 15, 2025",
        summary: "The latest React Native release enables the New Architecture for all new projects, promising significant performance improvements.",
        body: "React Native 0.75 marks a major milestone for the framework. The New Architecture, which replaces the JavaScript bridge with a direct C++ interface called JSI, is now enabled by default.\n\nThe New Architecture brings synchronous communication between JavaScript and native code, eliminating the asynchronous serialization overhead of the old bridge. Early benchmarks show up to 40% faster startup times on complex screens.",
    },
    {
        id: "2",
        title: "Bangladesh Launches National AI Strategy for 2025-2030",
        category: "Policy",
        author: "Rashida Khanam",
        date: "June 10, 2025",
        summary: "The government has released a five-year roadmap for artificial intelligence adoption across education, healthcare, and public services.",
        body: "Bangladesh's ICT Division has published the National Artificial Intelligence Strategy 2025-2030, covering AI adoption in six key sectors: education, agriculture, healthcare, financial inclusion, public administration, and manufacturing.\n\nThe strategy includes a target to train 500,000 AI-skilled workers by 2028 through university curriculum reform. Funding of BDT 2,000 crore has been earmarked for a national AI research centre.",
    },
    {
        id: "3",
        title: "Expo Router 4.0 Introduces Server Components",
        category: "Tech",
        author: "James Watkins",
        date: "June 5, 2025",
        summary: "Expo Router's latest major release brings React Server Components to mobile, enabling server-side rendering for React Native apps.",
        body: "Expo Router 4.0 is the first mobile framework to bring React Server Components to native apps. Server components allow parts of a screen to be rendered on the server and streamed to the device, reducing bundle size.\n\nThe release also introduces API Routes — server-side endpoints defined inside the app/ folder — enabling full-stack React Native development without a separate backend server.",
    },
    {
        id: "4",
        title: "AIUB Research Team Publishes NLP Study on Bangla Text",
        category: "Research",
        author: "Dr. Fahmida Akter",
        date: "May 28, 2025",
        summary: "A team from AIUB's CS department has published a benchmark dataset and transformer model for low-resource Bangla NLP tasks.",
        body: "Researchers from AIUB have released BanglaBERT-v2, a fine-tuned transformer model trained on a 12-billion-token Bangla corpus. The model outperforms previous state-of-the-art results on sentiment analysis, NER, and question answering in Bangla.\n\nThe team also released BanglaGLUE — a benchmark containing 8 tasks with human-annotated data. The work was presented at ACL 2025 and has been cited by researchers at Google DeepMind.",
    },
    {
        id: "5",
        title: "TypeScript 5.6 Adds Pattern Matching Proposal",
        category: "Tech",
        author: "Elena Vasquez",
        date: "May 20, 2025",
        summary: "TypeScript 5.6 includes an early implementation of the TC39 pattern matching proposal, bringing switch-expression syntax to JavaScript.",
        body: "TypeScript 5.6 beta includes an experimental implementation of the TC39 pattern matching proposal, introducing a match expression as a more powerful alternative to switch statements.\n\nPattern matching allows destructuring and type narrowing in a single expression. The syntax is similar to pattern matching in Rust and F#.",
    },
    {
        id: "6",
        title: "Mobile Internet Penetration in Bangladesh Reaches 70%",
        category: "Industry",
        author: "Tanvir Hossain",
        date: "May 14, 2025",
        summary: "BTRC data shows mobile internet subscriptions have crossed 130 million, making Bangladesh one of the fastest-growing mobile markets in South Asia.",
        body: "The Bangladesh Telecommunication Regulatory Commission reports mobile internet subscriptions crossed 130 million in April 2025, representing 70% of the population. 4G coverage now reaches 97% of populated areas.\n\nThe growth creates a significant opportunity for mobile-first applications. Developers who can build performant React Native apps are in high demand across fintech, e-commerce, and healthcare delivery.",
    },
    {
        id: "7",
        title: "Meta Open-Sources Llama 4 Multimodal Model",
        category: "AI",
        author: "Marcus Johnson",
        date: "May 8, 2025",
        summary: "Meta has released Llama 4, a multimodal foundation model capable of processing text, images, and audio, under an open research licence.",
        body: "Meta AI has released Llama 4, a multimodal large language model capable of understanding text, images, and audio. The model is available in 8B, 70B, and 405B parameter sizes under the Llama Community Licence.\n\nFor mobile developers, the 8B model can run on-device on flagship smartphones, opening possibilities for privacy-preserving AI features that do not require a server roundtrip.",
    },
    {
        id: "8",
        title: "Dhaka Startup Ecosystem Raises Record $240M in 2025 H1",
        category: "Business",
        author: "Nadia Islam",
        date: "May 1, 2025",
        summary: "Venture capital investment in Bangladesh-based startups reached a record high in the first half of 2025, led by fintech, health tech, and agritech companies.",
        body: "Bangladesh-based startups raised $240 million in the first half of 2025 across 47 deals, a 180% increase over the same period in 2024. The largest rounds were raised by bKash ($60M), iFarmer ($22M), and Maya ($18M).\n\nThe growth is increasing demand for mobile developers, with companies like Pathao, Shohoz, and Chaldal actively hiring React Native engineers.",
    },
];
