import {MetaFunction, useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {sdk} from "~/graphql/client";
import styles from "~/styles/docentry.module.css";
import {useRouteError} from "react-router";
import {ErrorResponseImpl} from "@remix-run/router/utils";
import {Tag} from "~/components/Tag";
import {Markdown} from "~/components/Markdown";
import {generateRemixMeta} from "~/utils/meta";

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
    const data = await sdk.DocEntry({slug: params.slug});
    if (!data) {
        throw new Response(`Not found`, {status: 404});
    }
    return data.data.page;
}

export default function DocEntry() {
    const data = useLoaderData<typeof loader>();

    if (!data) return null;

    return (
        <section className={styles.section}>
            {!!data.tags.length && (
                <div className={styles.tags}>
                    {data.tags.map(tag => (
                        <Tag key={tag.text} text={tag.text} />
                    ))}
                </div>
            )}
            {data.content && <Markdown content={data.content} />}
        </section>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <main className="main-content">
            <section className={styles.section}>
                <h1>{(error as ErrorResponseImpl).data}</h1>
            </section>
        </main>
    );
}
