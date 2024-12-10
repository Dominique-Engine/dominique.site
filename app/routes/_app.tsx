import {ReactNode} from "react";
import {Outlet, useLoaderData, useNavigation} from "@remix-run/react";
import {NavBar} from "~/components/NavBar";
import {Footer} from "~/components/Footer";
import {sdk} from "~/graphql/client";

import "~/styles/reset.css";
import "~/styles/global.css";
import "~/styles/typography.css";
import "~/styles/vars.css";
import "highlight.js/styles/atom-one-dark.css";
import {LookingGlass} from "~/components/LookingGlass";
import {FullscreenScroll} from "~/components/FullscreenScroll";
import {BgGrid} from "~/components/BgGrid";
import {useRouteError} from "react-router";
import styles from "~/styles/error.module.css";
import {ErrorResponseImpl} from "@remix-run/router/utils";
import {Loading} from "~/components/Loading";

export async function loader() {
    const data = await sdk.SocialNetworks();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {
        socialNetworks: data.data.socialNetworks,
    };
}

export function Layout({children}: {children: ReactNode}) {
    const data = useLoaderData<typeof loader>();
    const navigation = useNavigation();

    return (
        <>
            <Loading enabled={navigation.state === "loading"} />
            <FullscreenScroll />
            <BgGrid />
            <NavBar />
            {children}
            <Footer
                github={
                    data?.socialNetworks.find(el => el.platform === "github")
                        ?.url
                }
                discord={"/#"}
                x={"/#"}
            />
            <LookingGlass />
        </>
    );
}

export default function App() {
    return (
        <Layout>
            <Outlet />
        </Layout>
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
