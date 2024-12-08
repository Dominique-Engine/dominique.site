import styles from "./FeatureSection.module.css";
import Markdown from "react-markdown";
import {TextWithHighlights} from "~/components/TextWithHighlights";
import {CSSProperties} from "react";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import glsl from "highlight.js/lib/languages/glsl";

interface FeatureSectionProps {
    title: string;
    description: string;
    code: string;
    highlights?: string[];
    sectionStyles?: CSSProperties;
}

export function FeatureSection({
    title,
    description,
    code,
    highlights = [],
    sectionStyles,
}: FeatureSectionProps) {
    return (
        <section style={sectionStyles} className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h1 className={styles.title}>
                        <TextWithHighlights
                            text={title}
                            highlights={highlights}
                        />
                    </h1>

                    <p className={styles.description}>
                        <TextWithHighlights
                            text={description}
                            highlights={highlights}
                        />
                    </p>
                </div>
                <div className={styles.right}>
                    <Markdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>
                        {code}
                    </Markdown>
                </div>
            </div>
        </section>
    );
}
