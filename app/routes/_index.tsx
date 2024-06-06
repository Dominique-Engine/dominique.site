import {sdk} from "~/graphql/client";
import {useLoaderData} from "@remix-run/react";
import {HeroFeature} from "~/components/HeroFeature";
import {FeatureSection} from "~/components/FeatureSection";
import {TextBanner} from "~/components/TextBanner";
import {LinkButton} from "~/components/LinkButton";

export async function loader() {
    const data = await sdk.Features();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.features};
}

export default function Index() {
    const {data} = useLoaderData<typeof loader>();
    const [highlight, second, ...rest] = data;
    return (
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
                title={`Go and seize it`}
                titleHighlights={["seize it"]}
                titleStyle={{
                    fontSize: "100px",
                }}
                sectionStyle={{
                    scrollSnapAlign: "end",
                }}
            >
                <LinkButton
                    style={{
                        margin: "50px auto",
                        fontSize: "30px",
                    }}
                    to={"/docs"}
                >
                    {"Start learning ->"}
                </LinkButton>
            </TextBanner>
        </main>
    );
}
