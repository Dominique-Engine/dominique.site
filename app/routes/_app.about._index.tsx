import {TextBanner} from "~/components/TextBanner";
import {
    ABOUT_DESCRIPTION,
    ABOUT_TITLE,
    BASE_KEYWORDS,
} from "~/constants/client";
import {MetaFunction, useLoaderData} from "@remix-run/react";
import styles from "~/styles/about.module.css";
import hstyles from "~/styles/home.module.css";
import {sdk} from "~/graphql/client";
import {Elephant} from "~/components/Elephant";

export const meta: MetaFunction = () => {
    return [
        {title: ABOUT_TITLE},
        {name: "description", content: ABOUT_DESCRIPTION},
        {name: "keywords", content: BASE_KEYWORDS.join(",")},
    ];
};

export async function loader() {
    const data = await sdk.Contributors();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.contributors};
}

export default function Index() {
    const {data} = useLoaderData<typeof loader>();

    return (
        <>
            <main className="main-content">
                <article>
                    <div className={styles.grid}>
                        <div className={styles.logo}>
                            <img src={"/DEngineNoBg.png"} alt={"Hero"} />
                        </div>
                        <TextBanner
                            title={`Meet the guys that made it possible`}
                            description={`Dominique is aiming to bump your skill to the next level and we are open to any feedback and contribution`}
                            titleHighlights={[]}
                            descriptionHighlights={[]}
                            sectionClassName={styles.banner}
                        />
                    </div>

                    <div className={styles.contributors}>
                        {data.map(contributor => (
                            <div
                                key={contributor.name}
                                className={styles.contributor}
                            >
                                <h3>{contributor.name}</h3>
                                <p>{contributor.role}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.farewell}>
                        <p className={styles.farewellText}>
                            Dominique comes with no warranties, but we promise
                            you will have a great time using it, it is built by
                            developers for developers with love.
                            {/*<br />*/}
                            {/*<br />*/}
                            {/*How else can you explain this guy?*/}
                        </p>
                        {/*<Elephant />*/}
                    </div>
                </article>
                <div className={hstyles.endBannerBgSmall}></div>
            </main>
        </>
    );
}
