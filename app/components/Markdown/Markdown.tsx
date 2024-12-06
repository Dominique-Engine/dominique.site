import RMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import styles from "./Markdown.module.css";

export function Markdown({content}: {content: string}) {
    return (
        <RMarkdown
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
                ul: props => <ul {...props} className={styles.ul} />,
                ol: props => <ol {...props} className={styles.ul} />,
                pre: props => <pre {...props} className={styles.pre} />,
            }}
        >
            {content}
        </RMarkdown>
    );
}
