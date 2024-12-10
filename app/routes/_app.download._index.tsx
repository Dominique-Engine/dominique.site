import styles from "~/styles/download.module.css";
import {sdk} from "~/graphql/client";
import {redirect} from "@remix-run/router";

export async function loader() {
    const data = await sdk.Downloads();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    const firstVersion = data.data.downloadVersions[0].pVersion?.version;
    if (!firstVersion) {
        return null;
    }
    return redirect(`/download/${data.data.downloadVersions[0].pVersion?.version}`);
}

export default function Download() {
    return <section className={styles.content}></section>;
}
