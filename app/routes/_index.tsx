import {sdk} from "~/graphql/client";
import {useLoaderData, Link} from "@remix-run/react";
import {HeroFeature} from "~/components/HeroFeature";
import {FeatureSection} from "~/components/FeatureSection";
import {TextBanner} from "~/components/TextBanner";
import styles from "~/styles/home.module.css";
import {Commends} from "~/components/Commends";
import {BlurredBalls} from "~/components/BlurredBalls";

export async function loader() {
    const data = await sdk.Landing();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.features, commends: data.data.commends};
}

export default function Index() {
    const {data, commends} = useLoaderData<typeof loader>();
    const [highlight, second, ...rest] = data;
    return (
        <>
            <main className="main-content">
                <HeroFeature
                    title={highlight.title}
                    description={highlight.description}
                    code={highlight.content}
                    highlights={highlight.highlights}
                />
                <TextBanner
                    title={`Modular and simple game engine`}
                    description={`Focus on modules independence to aid learning game engine
                development or any independent module (rendering, physics, etc). Typescript first and webgl based.`}
                    titleHighlights={["Modular", "simple", "game engine"]}
                    descriptionHighlights={["modules", "Typescript", "webgl"]}
                />
                <FeatureSection
                    key={second.id}
                    title={second.title}
                    description={second.description}
                    code={second.content}
                    highlights={second.highlights}
                />
                <TextBanner
                    title={`Module plug and play`}
                    description={`Bring your own module and plug it in the engine.
                The engine will just work. Interfaces is the only thing you need to implement.`}
                    titleHighlights={["Module", "plug", "play"]}
                    descriptionHighlights={["Interfaces", "implement"]}
                />
            </main>
            <Commends commends={commends} />
            <div className="main-content">
                {rest.map(feature => (
                    <FeatureSection
                        key={feature.id}
                        title={feature.title}
                        description={feature.description}
                        code={feature.content}
                        highlights={feature.highlights}
                    />
                ))}
                <TextBanner
                    title={`Creative coding reimagined`}
                    description={`Performant and easy prototyping or full lifecycle
                    development for stunning data visualization and generative art.
                    Ship tailored experiences without the hassle.`}
                    titleHighlights={["Creative", "reimagined"]}
                    descriptionHighlights={[
                        "Performant",
                        "data visualization",
                        "generative art",
                        "Ship",
                        "tailored experiences",
                    ]}
                />
                <TextBanner sectionClassName={styles.endBanner}>
                    <div className={styles.endBannerBg}>
                        <BlurredBalls />
                        <p className={styles.endBannerText}>
                            Go and{" "}
                            <Link
                                className={styles.seizeIt}
                                to={"/docs/introduction%2Finstallation"}
                            >
                                seize it
                            </Link>
                        </p>
                    </div>
                </TextBanner>
            </div>
        </>
    );
}
