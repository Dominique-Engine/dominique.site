import styles from "~/styles/docs.module.css";
import {sdk} from "~/graphql/client";
import {redirect} from "@remix-run/router";

export async function loader() {
    const data = await sdk.DocEntries();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    const firstSlug = data.data.pages[0].slug;
    if (!firstSlug) {
        return null;
    }
    return redirect(`/docs/${encodeURIComponent(firstSlug)}`);
}

export default function Docs() {
    return <article className={styles.section}></article>;
}
