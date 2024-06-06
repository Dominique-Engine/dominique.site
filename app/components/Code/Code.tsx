import {ReactNode} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark as style} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeProps {
    children?: ReactNode | ReactNode[];
    className?: string;
}

export function Code({children, className}: CodeProps) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
        <SyntaxHighlighter
            PreTag="div"
            language={match[1]}
            style={style}
            wrapLongLines
            wrapLines
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    ) : (
        <code className={className}>{children}</code>
    );
}
