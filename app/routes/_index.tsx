import {sdk} from "~/graphql/client";
import {useLoaderData} from "@remix-run/react";

export async function loader() {
    const data = await sdk.Features();
    if (data.errors || !data.data) {
        throw new Response(`Not found`, {status: 404});
    }
    return {data: data.data.features};
}

export default function Index() {
    const {data} = useLoaderData<typeof loader>();
    return <main className="main-content"></main>;
}
