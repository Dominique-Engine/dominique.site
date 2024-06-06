import styles from "./FeatureSection.module.css";
import {Code} from "~/components/Code";
import Markdown from "react-markdown";
import {TextWithHighlights} from "~/components/TextWithHighlights";
import {CSSProperties} from "react";

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
                    <Markdown components={{code: Code}}>{code}</Markdown>
                </div>
            </div>
        </section>
    );
}
