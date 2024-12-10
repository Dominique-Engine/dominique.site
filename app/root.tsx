import {ReactNode} from "react";
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "@remix-run/react";
import {LinksFunction} from "@remix-run/server-runtime";
import type {MetaFunction} from "@remix-run/node";
import {BASE_KEYWORDS, SITE_DESCRIPTION, SITE_TITLE} from "~/constants/client";

import "~/styles/reset.css";
import "~/styles/global.css";
import "~/styles/typography.css";
import "~/styles/vars.css";

import "highlight.js/styles/atom-one-dark.css";

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
        {name: "keywords", content: BASE_KEYWORDS.join(",")},
    ];
};

// export function headers() {
//     return {
//         "Cache-Control": "public, max-age=30, s-maxage=3600",
//     };
// }

export async function loader() {
    return {
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
                {children}
                <ScrollRestoration />
                {data?.ENV && <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
                    }}
                />}
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}