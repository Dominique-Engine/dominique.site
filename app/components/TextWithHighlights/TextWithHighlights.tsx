import styles from "./TextWithHighlights.module.css";

interface TextWithHighlightsProps {
    text: string;
    highlights: string[];
    highlightsOffset?: number;
}

const highlightsNumber = 3;

export function TextWithHighlights({
    text,
    highlights,
    highlightsOffset = 0,
}: TextWithHighlightsProps) {
    function escapeRegExp(str: string) {
        return str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }

    const escapedHighlights = highlights.map(escapeRegExp);
    const textSplitted = text.split(
        new RegExp(`(${escapedHighlights.join("|")})`, "gi")
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
                                      `highlight${((highlightIndex + highlightsOffset) % highlightsNumber) + 1}`
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
