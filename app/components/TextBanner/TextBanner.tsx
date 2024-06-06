import {TextWithHighlights} from "~/components/TextWithHighlights";
import styles from "./TextBanner.module.css";
import {CSSProperties, ReactElement} from "react";

interface TextBannerProps {
    title?: string;
    description?: string;
    titleHighlights?: string[];
    descriptionHighlights?: string[];
    sectionStyle?: CSSProperties;
    titleStyle?: CSSProperties;
    children?: ReactElement | ReactElement[];
}

export function TextBanner({
    title,
    description,
    titleHighlights = [],
    descriptionHighlights = [],
    sectionStyle,
    titleStyle,
    children,
}: TextBannerProps) {
    return (
        <section className={styles.banner} style={sectionStyle}>
            {title && (
                <div className={styles.title} style={titleStyle}>
                    <TextWithHighlights
                        text={title}
                        highlights={titleHighlights}
                    />
                </div>
            )}
            {description && (
                <div className={styles.description}>
                    <TextWithHighlights
                        text={description}
                        highlights={descriptionHighlights}
                    />
                </div>
            )}
            {children}
        </section>
    );
}
