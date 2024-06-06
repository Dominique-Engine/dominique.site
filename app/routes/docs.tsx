import {sdk} from "~/graphql/client";
import {useLoaderData, Link, Outlet, useLocation} from "@remix-run/react";
import styles from "~/styles/docs.module.css";
import {DOC_DESCRIPTION, DOC_TITLE} from "~/constants/client";
import type {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        {title: DOC_TITLE},
        {name: "description", content: DOC_DESCRIPTION},
    ];
};

export async function loader() {
    const data = await sdk.DocEntries();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.pages};
}

export default function Blog() {
    const {data} = useLoaderData<typeof loader>();
    const {pathname} = useLocation();

    const cleanPath = decodeURIComponent(pathname.replace("/docs/", ""));

    const sections: Record<string, (typeof data)[0][]> = {};
    data.forEach(page => {
        const title = page.title.split("/")[0];
        if (!sections[title]) {
            sections[title] = [];
        }
        sections[title].push(page);
    });
    return (
        <main className="main-content">
            <article className={styles.section}>
                <aside className={styles.sidebar}>
                    <nav className={styles.linksGroups}>
                        {Object.entries(sections).map(([title, pages]) => (
                            <details key={title} open>
                                <summary>{title}</summary>
                                <ul className={styles.links}>
                                    {pages.map(page => (
                                        <li key={page.slug}>
                                            <Link
                                                unstable_viewTransition
                                                to={`/docs/${encodeURIComponent(page.slug)}`}
                                                className={`${styles.link}
                                                ${
                                                    page.slug === cleanPath
                                                        ? styles.active
                                                        : ""
                                                }`}
                                            >
                                                {page.title
                                                    .split("/")
                                                    .slice(1)
                                                    .join("/")}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </nav>
                </aside>
                <section className={styles.content}>
                    <Outlet />
                </section>
            </article>
        </main>
    );
}
