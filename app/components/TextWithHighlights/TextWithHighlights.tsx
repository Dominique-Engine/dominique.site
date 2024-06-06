import styles from "./TextWithHighlights.module.css";

interface TextWithHighlightsProps {
    text: string;
    highlights: string[];
}

const highlightsNumber = 3;

export function TextWithHighlights({
    text,
    highlights,
}: TextWithHighlightsProps) {
    const textSplitted = text.split(
        new RegExp(`(${highlights.join("|")})`, "gi")
    );
    return (
        <span>
            {textSplitted.map((part, index) => {
                const highlightIndex = highlights.indexOf(part);
                return (
                    <span
                        key={index}
                        className={
                            highlightIndex !== -1
                                ? styles[
                                      `highlight${(highlightIndex % highlightsNumber) + 1}`
                                  ]
                                : ""
                        }
                    >
                        {part}
                    </span>
                );
            })}
        </span>
    );
}
