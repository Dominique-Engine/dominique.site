import styles from "~/styles/download.module.css";
import {sdk} from "~/graphql/client";
import {DOWNLOAD_DESCRIPTION, DOWNLOAD_TITLE} from "~/constants/client";
import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Markdown} from "~/components/Markdown";
import {useEffect, useState} from "react";
import {LinkButton} from "~/components/LinkButton";
import hstyles from "~/styles/home.module.css";

export const meta: MetaFunction = () => {
    return [
        {title: DOWNLOAD_TITLE},
        {name: "description", content: DOWNLOAD_DESCRIPTION},
    ];
};

export async function loader() {
    const data = await sdk.Downloads();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.downloadVersions};
}

export default function Download() {
    const {data} = useLoaderData<typeof loader>();
    const [changeLog, setChangeLog] = useState<number | null>(null);

    useEffect(() => {
        setChangeLog(data.length ? 1 : null);
    }, []);

    return (
        <main className="main-content">
            <article className={styles.section}>
                <aside className={styles.sidebar}>
                    <ul className={styles.links}>
                        {data.map((version, index) => (
                            <li
                                className={`${styles.link}
                                                ${
                                    index ===
                                    (changeLog || -10) - 1
                                        ? styles.active
                                        : ""
                                }`}
                                key={version.id}
                                value={version.id}
                                onClick={() => {
                                    setChangeLog(index + 1);
                                }}
                            >
                                {version.pVersion?.version}
                            </li>
                        ))}
                    </ul>
                </aside>
                <section className={styles.content}>
                    <Markdown
                        content={
                            changeLog ? data[changeLog - 1].changeLog || "" : ""
                        }
                    />
                    <br />
                    <br />
                    {changeLog && (
                        <LinkButton
                            to={data[0].downloadUrl || ""}
                            target="_blank"
                        >
                            Download
                        </LinkButton>
                    )}
                </section>
            </article>
            <div className={hstyles.endBannerBgSmall}>
            </div>
        </main>
    );
}
