import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import Markdown from "react-markdown";
import {sdk} from "~/graphql/client";
import {Code} from "~/components/Code";
import styles from "~/styles/docentry.module.css";

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

export default function About() {
    const data = useLoaderData<typeof loader>();

    if (!data) return null;
    return (
        <section className={styles.section}>
            {data.content && (
                <Markdown components={{code: Code}}>{data.content}</Markdown>
            )}
        </section>
    );
}
