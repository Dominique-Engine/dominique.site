import {ReactNode} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {atomDark as style} from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeProps {
    children?: ReactNode | ReactNode[];
    className?: string;
}

export function Code({children, className, ...rest}: CodeProps) {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
        <SyntaxHighlighter
            {...rest}
            PreTag="div"
            language={match[1]}
            style={style}
            wrapLongLines
        >
            {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
    ) : (
        <code {...rest} className={className}>
            {children}
        </code>
    );
}
