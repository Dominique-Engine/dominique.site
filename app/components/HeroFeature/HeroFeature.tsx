import styles from "./HeroFeature.module.css";
import Markdown from "react-markdown";
import {TextWithHighlights} from "~/components/TextWithHighlights";
import {LinkButton} from "~/components/LinkButton";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

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
                    <LinkButton to={"/docs/introduction%2Finstallation"}>
                        Get started
                    </LinkButton>
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
