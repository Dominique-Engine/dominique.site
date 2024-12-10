import styles from "~/styles/playground.module.css";
import Editor from "@monaco-editor/react";
import {useEffect, useState} from "react";
import {sdk} from "~/graphql/client";
import {BASE_KEYWORDS, PLAYGROUND_DESCRIPTION, PLAYGROUND_TITLE} from "~/constants/client";
import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {extractCode} from "~/utils/code";
import {redirect} from "@remix-run/router";

export const meta: MetaFunction = () => {
    return [
        {title: PLAYGROUND_TITLE},
        {name: "description", content: PLAYGROUND_DESCRIPTION},
        {name: "keywords", content: BASE_KEYWORDS.join(",")},
    ];
};

export async function loader() {
    return redirect("/");

    const data = await sdk.Features();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.features};
}

export default function Portfolio() {
    const {data} = useLoaderData<typeof loader>();
    const highlight = data[0];

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(true);
    }, []);

    return (
        <main className={styles.main}>
            <article className={styles.section}>
                <div className={styles.editor}>
                    {enabled && (
                        <Editor
                            height="100%"
                            defaultLanguage="typescript"
                            defaultValue={extractCode(highlight.content)}
                            theme="vs-dark"
                            options={{
                                fontSize: 18,
                                padding: {top: 16, bottom: 16},
                            }}
                        />
                    )}
                </div>
                <div className={styles.result}>Coming soon...</div>
            </article>
        </main>
    );
}
