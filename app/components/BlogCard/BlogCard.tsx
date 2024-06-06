import {FormattedDate} from "~/components/FormattedDate";
import {Link} from "@remix-run/react";
import styles from "./BlogCard.module.css";

interface BlogCardProps {
    slug: string;
    title: string | null;
    description?: string | null;
    date: Date;
    image?: string | null;
}

export function BlogCard({
    title,
    image,
    slug,
    date,
    description,
}: BlogCardProps) {
    return (
        <div className={styles.container}>
            {image && (
                <Link
                    unstable_viewTransition
                    className={styles.title}
                    to={`/blog/${slug}`}
                >
                    <img className={styles.image} src={image} alt="" />
                </Link>
            )}
            <div className={styles.time}>
                <FormattedDate date={date} />
            </div>
            <div className={styles.details}>
                <Link
                    unstable_viewTransition
                    className={styles.title}
                    to={`/blog/${slug}`}
                >
                    {title}
                </Link>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </div>
        </div>
    );
}
