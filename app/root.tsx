import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import {NavBar} from "~/components/NavBar";
import {Footer} from "~/components/Footer";
import {LinksFunction} from "@remix-run/server-runtime";
import type {MetaFunction} from "@remix-run/node";
import {SITE_DESCRIPTION, SITE_TITLE} from "~/constants/client";
import {useRouteError} from "react-router";
import {ErrorResponseImpl} from "@remix-run/router/utils";

import "~/styles/reset.css";
import "~/styles/global.css";
import "~/styles/typography.css";
import "~/styles/vars.css";

export const links: LinksFunction = () => [];

export const meta: MetaFunction = () => {
    return [
        {title: SITE_TITLE},
        {name: "description", content: SITE_DESCRIPTION},
    ];
};

export function Layout({children}: {children: React.ReactNode}) {
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
            <body
                style={{
                    minHeight: "100vh",
                }}
            >
                <NavBar />
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <main className="main-content">
            <h1>{(error as ErrorResponseImpl).data}</h1>
        </main>
    );
}

export default function App() {
    return <Outlet />;
}
