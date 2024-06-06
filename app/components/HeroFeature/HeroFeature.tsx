import styles from "./HeroFeature.module.css";
import {Code} from "~/components/Code";
import Markdown from "react-markdown";
import {TextWithHighlights} from "~/components/TextWithHighlights";
import {LinkButton} from "~/components/LinkButton";

interface HeroFeatureProps {
    title: string;
    description: string;
    code: string;
    highlights?: string[];
}

export function HeroFeature({
    title,
    description,
    code,
    highlights = [],
}: HeroFeatureProps) {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h1 className={styles.title}>
                        <TextWithHighlights
                            text={title}
                            highlights={highlights}
                        />
                    </h1>
                    <p className={styles.description}>{description}</p>
                    <LinkButton to={"/docs"}>Get started</LinkButton>
                </div>
                <div className={styles.right}>
                    <Markdown components={{code: Code}}>{code}</Markdown>
                </div>
            </div>
        </section>
    );
}
