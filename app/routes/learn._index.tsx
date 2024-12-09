import {sdk} from "~/graphql/client";
import {useLoaderData} from "@remix-run/react";
import {BlogCard} from "~/components/BlogCard";
import styles from "~/styles/blogs.module.css";
import type {MetaFunction} from "@remix-run/node";
import {BLOG_DESCRIPTION, BLOG_TITLE} from "~/constants/client";
import hstyles from "~/styles/home.module.css";

export const meta: MetaFunction = () => {
    return [
        {title: BLOG_TITLE},
        {name: "description", content: BLOG_DESCRIPTION},
    ];
};

export async function loader() {
    const data = await sdk.BlogPosts();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.pages};
}

export default function Blog() {
    const {data} = useLoaderData<typeof loader>();
    return (
        <main className="main-content">
            <article className={styles.section}>
                <ul className={styles.grid}>
                    {data.map(post => (
                        <li key={post.id}>
                            <BlogCard
                                slug={post.slug}
                                description={post.meta?.description}
                                date={new Date(post.createdAt)}
                                title={post.title}
                                image={
                                    post.meta?.image?.url || "/hero_engine.jpeg"
                                }
                            />
                        </li>
                    ))}
                </ul>
            </article>
            <div className={hstyles.endBannerBgSmall}>
            </div>
        </main>
    );
}
