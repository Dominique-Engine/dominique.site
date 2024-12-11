import {TextBanner} from "~/components/TextBanner";
import styles from "~/styles/presentation.module.css";
import {LoaderFunctionArgs} from "@remix-run/router";
import {DEV_MODE_KEY} from "~/constants/server";
import {useRouteError} from "react-router";
import {ErrorResponseImpl} from "@remix-run/router/utils";
import {FullscreenScroll} from "~/components/FullscreenScroll";
import {BgGrid} from "~/components/BgGrid";
import {useEffect, useRef, useState} from "react";
import {Footer} from "~/components/Footer";
import {sdk} from "~/graphql/client";
import {useLoaderData} from "@remix-run/react";
import {LookingGlass} from "~/components/LookingGlass";
import {Elephant} from "~/components/Elephant";

export async function loader({request}: LoaderFunctionArgs) {
    const {searchParams} = new URL(request.url);
    const k = searchParams.get("k");
    if (!k || k !== DEV_MODE_KEY) {
        throw new Response(`Not found`, {status: 404});
    }
    const data = await sdk.SocialNetworks();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {
        socialNetworks: data.data.socialNetworks,
    };
}

export default function Index() {
    const data = useLoaderData<typeof loader>();

    const mainRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [sectionsAmount, setSectionsAmount] = useState(0);

    const heavyIndex = 10;

    // Handle key events
    useEffect(() => {
        const sections = mainRef.current?.querySelectorAll("article") || [];
        setSectionsAmount(sections.length);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "Backspace"
            ) {
                e.preventDefault();
                setCurrentSection(prev => Math.max(prev - 1, 0));
            } else if (
                e.key === "ArrowDown" ||
                e.key === "ArrowRight" ||
                e.key === "Enter" ||
                e.key === " "
            ) {
                e.preventDefault();
                setCurrentSection(prev =>
                    Math.min(prev + 1, sections.length - 1)
                );
            }
        };

        // const onScroll = (e: Event) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }

        // window.addEventListener("scroll", onScroll);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            // window.removeEventListener("scroll", onScroll);
        };
    }, [sectionsAmount]);

    // Scroll effect
    useEffect(() => {
        window.scrollTo({
            top: window.innerHeight * currentSection,
            behavior: "smooth",
        });
    }, [currentSection]);

    // Add overflow hiden to body
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    console.log(currentSection);
    return (
        <>
            <FullscreenScroll heavy={heavyIndex === currentSection} />
            <LookingGlass />
            <BgGrid heavy={heavyIndex === currentSection} />
            <main ref={mainRef} className={styles.main}>
                <article className={styles.article}>
                    <div className={styles.openingGrid}>
                        <div className={styles.textWrapper}>
                            <p className={styles.text}>
                                <b className={styles.name}>Darián López</b>
                                <br />
                                <br />
                                Mathematician
                                <br />
                                Software Engineer
                            </p>
                        </div>
                        <div className={styles.photo}>
                            <img
                                src={
                                    "https://www.darodev.site/placeholder-about.jpg"
                                }
                                alt={"Hero"}
                            />
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.qr}>
                        <img src={"/qr.png"} alt="" />
                    </div>
                    <div className={styles.openingGrid}>
                        <TextBanner
                            title={`Dominique Engine Website`}
                            description={``}
                            titleHighlights={[]}
                            descriptionHighlights={[]}
                            sectionClassName={styles.banner}
                        />

                        <div className={styles.logo}>
                            <img src={"/DEngineNoBg.png"} alt={"Hero"} />
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.grid2}>
                        <div className={styles.gridItem}>
                            <h3>Values</h3>
                            <p>
                                - Modern
                                <br />
                                - Technical
                                <br />
                                - Smart
                                <br />
                                - Simple
                                <br />- Accessible
                            </p>
                        </div>
                        <div className={styles.gridItem}>
                            <h3>Web</h3>
                            <p>
                                - Clear
                                <br />
                                - Performant
                                <br />- Scalable
                                <br />- Green 🌱
                            </p>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Two Faced</h2>
                        <p>Maybe the hardest part is balancing things 🤹‍♂</p>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.grid2}>
                        <div className={styles.gridItem}>
                            <h3>Learn</h3>
                            <p>
                                - Availability
                                <br />
                                - Documentation
                                <br />- Community 😵‍💫
                            </p>
                        </div>
                        <div className={styles.gridItem}>
                            <h3>Product</h3>
                            <p>
                                - Greener alternative 🌱
                                <br />
                                - Breaking changes
                                <br />- Not backwards compatible 🤯
                            </p>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Solution scope (The Hub)</h2>
                        <div className={styles.grid1}>
                            <div className={styles.gridItem}>
                                <p>
                                    - Pretty landing
                                    <br />- Learn section (blogs style)
                                    <br />- Docs
                                    <br />- Download
                                    <br />- About (Just to show off the talents
                                    behind the scene)
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Decisions</h2>
                        <p>The juicy part now 🥩</p>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.grid2}>
                        <div className={styles.gridItem}>
                            <h2>Inter</h2>
                            <p>
                                - Aesthetic
                                <br />
                                - Modern
                                <br />
                                - Legible
                                <br />
                                - Familiar
                                <br />- We like it 🫶
                            </p>
                        </div>
                        <div className={styles.gridItem}>
                            <h2>Colors</h2>
                            <div className={styles.colors}>
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                                <div />
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Minimalistic vs Aesthetic</h2>
                        <div className={styles.grid2}>
                            <div className={styles.gridItem}>
                                <h2>Pages flow</h2>
                                <p>
                                    - Sell: Emotional {"->"} rational 👍
                                    <br />
                                    - We: Emo-Rational 🙌
                                    <br />- Non-fixed navbar
                                </p>
                            </div>
                            <div className={styles.gridItem}>
                                <h2>Interactivity</h2>
                                <p>
                                    - Micro-interactions
                                    <br />
                                    - Fullscreen scroll (progress)
                                    <br />
                                    - Dashed lines guides (structured)
                                    <br />- (storytelling for 🤓)
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <div
                        className={styles.gridItem}
                        style={{
                            maxWidth: 700,
                            width: "100%",
                        }}
                    >
                        <h3>Showcasing always on screen elements</h3>
                    </div>
                </article>

                <article className={styles.article}>
                    <div
                        className={styles.gridItem}
                        style={{
                            maxWidth: 700,
                            width: "100%",
                        }}
                    >
                        <h3>
                            And how cool is to use the same app for presenting
                        </h3>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Going technical</h2>
                        <p>Who wants to be a designer anyways? 🙈</p>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>The usual suspects +</h2>
                        <div className={styles.grid1}>
                            <div className={styles.gridItem}>
                                <p>
                                    - React with Remix (because)
                                    {/*We need to deploy fast, and keep content hyper fresh*/}
                                    <br />- Hygraph CMS (📉 costs)
                                    {/*We are laze so wee need low maintenance*/}
                                    <br />
                                    - Search with Algolia (typesense is costly
                                    to deploy 🥲)
                                    <br />- CSS modules (vars everywhere)
                                    <br />- Zero deps (except for the ones we
                                    need)
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <article className={styles.article}>
                    <iframe
                        width="100%"
                        height="500px"
                        style={{
                            borderRadius: "15px",
                            height: "100%",
                            width: "90vw",
                            zIndex: 1000,
                        }}
                        // allowTransparency
                        allowFullScreen
                        title="Embedded DrawSQL IFrame"
                        src="https://drawsql.app/teams/potatobite/diagrams/dominique/embed"
                    ></iframe>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>harder that it seems</h2>
                        <p>
                            - Balancing two main "branches" of Dominique Engine
                            <br />- Always keep in mind SEO and accessibility
                        </p>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Next</h2>
                        <p>
                            - Showcase projects (A must)
                            <br />- Versioning to docs (When API gets stable is
                            mandatory)
                            <br />- Proper help to build Community
                        </p>
                    </div>
                </article>

                <article className={styles.article}>
                    <div className={styles.gridItem}>
                        <h2>Q & A</h2>
                        <Elephant />
                    </div>
                </article>

                <div className={styles.fullscreenEverlay}>
                    <Footer
                        github={
                            data?.socialNetworks.find(
                                el => el.platform === "github"
                            )?.url
                        }
                        scrollTop={false}
                    />
                </div>
            </main>
        </>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <main className="main-content">
            <section className={styles.section}>
                <h1>{(error as ErrorResponseImpl).data}</h1>
            </section>
        </main>
    );
}
