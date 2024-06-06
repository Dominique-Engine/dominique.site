import {FormattedDate} from "~/components/FormattedDate";
import {ReactElement, ReactNode} from "react";
import styles from "./BlogPost.module.css";

interface BlogPostProps {
    title?: string | null;
    pubDate: Date;
    image?: string;
    children: ReactElement[] | ReactElement | ReactNode | ReactNode[];
}

export function BlogPost({title, pubDate, children, image}: BlogPostProps) {
    return (
        <article className={styles.container}>
            {image && (
                <img
                    style={{viewTransitionName: `image`}}
                    className={styles.img}
                    src={image}
                    alt=""
                />
            )}
            <h1 className={styles.title} style={{viewTransitionName: "title"}}>
                {title}
            </h1>
            <div>
                <FormattedDate date={pubDate} />
            </div>
            <hr className={styles.hr} />
            <div className={styles.content}>{children}</div>
        </article>
    );
}
