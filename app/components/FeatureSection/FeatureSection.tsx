import styles from "./FeatureSection.module.css";
import Markdown from "react-markdown";
import {TextWithHighlights} from "~/components/TextWithHighlights";
import {CSSProperties} from "react";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

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
                    <p className={styles.description}>{description}</p>
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
