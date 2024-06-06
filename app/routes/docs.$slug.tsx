import {useLoaderData} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import Markdown from "react-markdown";
import {sdk} from "~/graphql/client";
import {Code} from "~/components/Code";
import styles from "~/styles/docentry.module.css";
import {useRouteError} from "react-router";
import {ErrorResponseImpl} from "@remix-run/router/utils";

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
