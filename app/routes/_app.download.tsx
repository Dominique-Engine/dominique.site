import styles from "~/styles/download.module.css";
import {sdk} from "~/graphql/client";
import {BASE_KEYWORDS, DOWNLOAD_DESCRIPTION, DOWNLOAD_TITLE} from "~/constants/client";
import type {MetaFunction} from "@remix-run/node";
import {Link, Outlet, useLoaderData, useLocation} from "@remix-run/react";
import hstyles from "~/styles/home.module.css";

export const meta: MetaFunction = () => {
    return [
        {title: DOWNLOAD_TITLE},
        {name: "description", content: DOWNLOAD_DESCRIPTION},
        {name: "keywords", content: BASE_KEYWORDS.join(",")},
    ];
};

export async function loader() {
    const data = await sdk.Downloads();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.downloadVersions};
}

export default function _appDownload() {
    const {data} = useLoaderData<typeof loader>();

    const {pathname} = useLocation();

    const cleanPath = decodeURIComponent(pathname.replace("/download/", ""));

    return (
        <main className="main-content">
            <article className={styles.section}>
                <aside className={styles.sidebar}>
                    <ul className={styles.links}>
                        {data.map((version) => (
                            <li
                                key={version.id}
                            >
                                <Link
                                    viewTransition
                                    to={
                                        version.pVersion?.version
                                            ? `/download/${encodeURIComponent(version.pVersion?.version)}`
                                            : "#"
                                    }
                                    className={`${styles.link}
                                                ${
                                                    version.pVersion
                                                        ?.version === cleanPath
                                                        ? styles.active
                                                        : ""
                                                }`}
                                >
                                    {version.pVersion?.version}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <section className={styles.content}>
                    <Outlet />
                </section>
            </article>
            <div className={hstyles.endBannerBgSmall}></div>
        </main>
    );
}
