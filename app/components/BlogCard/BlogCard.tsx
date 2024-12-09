import {FormattedDate} from "~/components/FormattedDate";
import {Link} from "@remix-run/react";
import styles from "./BlogCard.module.css";
import {useViewTransitionState} from "react-router-dom";

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
    const isTransitioning = useViewTransitionState(`/learn/${slug}`);

    return (
        <div className={styles.container}>
            {image && (
                <Link
                    viewTransition
                    className={styles.title}
                    to={`/learn/${slug}`}
                >
                    <img
                        className={styles.image}
                        src={image}
                        alt=""
                        style={{
                            viewTransitionName: isTransitioning
                                ? "image"
                                : undefined,
                        }}
                    />
                </Link>
            )}
            <div className={styles.time}>
                <FormattedDate date={date} />
            </div>
            <div className={styles.details}>
                <Link
                    viewTransition
                    className={styles.title}
                    to={`/learn/${slug}`}
                    style={{
                        viewTransitionName: isTransitioning
                            ? "title"
                            : undefined,
                    }}
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
