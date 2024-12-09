import {sdk} from "~/graphql/client";
import {DOWNLOAD_DESCRIPTION, DOWNLOAD_TITLE} from "~/constants/client";
import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {Markdown} from "~/components/Markdown";
import {LinkButton} from "~/components/LinkButton";
import {LoaderFunctionArgs} from "@remix-run/router";

export const meta: MetaFunction = () => {
    return [
        {title: DOWNLOAD_TITLE},
        {name: "description", content: DOWNLOAD_DESCRIPTION},
    ];
};

export async function loader({params}: LoaderFunctionArgs) {
    if (!params.slug) {
        throw new Response(`Not found`, {status: 404});
    }
    const data = await sdk.Download({version: params.slug});
    if (!data) {
        throw new Response(`Not found`, {status: 404});
    }
    return data.data.downloadVersions[0];
}

export default function Download() {
    const {changeLog, downloadUrl} = useLoaderData<typeof loader>();

    return (
        <>
            <Markdown content={changeLog || ""} />
            <br />
            <br />
            {changeLog && (
                <LinkButton to={downloadUrl || ""} target="_blank">
                    Download
                </LinkButton>
            )}
        </>
    );
}
