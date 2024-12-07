import {ReactNode} from "react";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import {NavBar} from "~/components/NavBar";
import {Footer} from "~/components/Footer";
import {LinksFunction} from "@remix-run/server-runtime";
import type {MetaFunction} from "@remix-run/node";
import {SITE_DESCRIPTION, SITE_TITLE} from "~/constants/client";
import {sdk} from "~/graphql/client";

import "~/styles/reset.css";
import "~/styles/global.css";
import "~/styles/typography.css";
import "~/styles/vars.css";
// import "~/styles/transitioning.css";

import "highlight.js/styles/atom-one-dark.css";
import {LookingGlass} from "~/components/LookingGlass";
import {FullscreenScroll} from "~/components/FullscreenScroll";
import {ScrollToTop} from "~/components/ScrollToTop";
import {BgGrid} from "~/components/BgGrid";

declare global {
    interface Window {
        ENV: {
            ALGOLIA_APP_ID: string;
            ALGOLIA_SEARCH_API_KEY: string;
        };
    }
}

export const links: LinksFunction = () => [];

export const meta: MetaFunction = () => {
    return [
        {title: SITE_TITLE},
        {name: "description", content: SITE_DESCRIPTION},
    ];
};

export async function loader() {
    const data = await sdk.SocialNetworks();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {
        socialNetworks: data.data.socialNetworks,
        ENV: {
            ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
            ALGOLIA_SEARCH_API_KEY: process.env.ALGOLIA_SEARCH_API_KEY,
        },
    };
}

export function Layout({children}: {children: ReactNode}) {
    const data = useLoaderData<typeof loader>();
    return (
        <html lang="en" data-theme="light">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" type="image/png" href="/icon.png" />
                <Meta />
                <Links />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <FullscreenScroll />
                <BgGrid />
                <NavBar />
                {children}
                <Footer
                    github={
                        data?.socialNetworks.find(
                            el => el.platform === "github"
                        )?.url
                    }
                />
                <LookingGlass />
                {/*<ScrollToTop />*/}
                <ScrollRestoration />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                    }}
                />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
