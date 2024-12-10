import {useLoaderData, MetaFunction} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {sdk} from "~/graphql/client";
import {BlogPost} from "~/components/BlogPost";
import styles from "~/styles/blogpost.module.css";
import {Tag} from "~/components/Tag";
import {Markdown} from "~/components/Markdown/Markdown";
import {generateRemixMeta} from "~/utils/meta";
import hstyles from "~/styles/home.module.css";

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return generateRemixMeta({
        title: data?.title,
        description: data?.meta?.description,
        keywords: data?.meta?.keywords,
        image: data?.meta?.image?.url,
    });
};

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.slug) {
        throw new Response(`Not found`, {status: 404});
    }
    const data = await sdk.BlogPost({slug: params.slug});
    if (!data) {
        throw new Response(`Not found`, {status: 404});
    }
    return data.data.page;
}

export default function BlogEntry() {
    const data = useLoaderData<typeof loader>();

    if (!data) return null;
    return (
        <main className="main-content">
            <section className={styles.section}>
                <BlogPost
                    image={data.meta?.image?.url || "/hero_engine.jpeg"}
                    title={data.title}
                    pubDate={new Date(data.createdAt)}
                >
                    {!!data.tags.length && (
                        <div className={styles.tags}>
                            {data.tags.map(tag => (
                                <Tag key={tag.text} text={tag.text} />
                            ))}
                        </div>
                    )}
                    {data.content && <Markdown content={data.content} />}
                </BlogPost>
            </section>
            <div className={hstyles.endBannerBgSmall}>
            </div>
        </main>
    );
}
