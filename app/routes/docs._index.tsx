import {sdk} from "~/graphql/client";
import {useLoaderData} from "@remix-run/react";
import styles from "~/styles/docs.module.css";

export async function loader() {
    const data = await sdk.DocEntries();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.pages};
}

export default function Blog() {
    const {data} = useLoaderData<typeof loader>();
    return (
        <main className="main-content">
            <article className={styles.section}>Docs</article>
        </main>
    );
}
