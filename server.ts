import {createRequestHandler} from "@remix-run/server-runtime";
import * as build from "./build/server/index.js";

const handleRemixRequest = createRequestHandler(build, "production");

function preserveTransportSecurity(response: Response): Response {
    const headers = new Headers(response.headers);
    headers.set("Strict-Transport-Security", "max-age=63072000");
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (
            url.hostname === "dengine.site" ||
            (url.hostname === "www.dengine.site" && url.protocol === "http:")
        ) {
            url.protocol = "https:";
            url.hostname = "www.dengine.site";
            url.port = "";
            return preserveTransportSecurity(Response.redirect(url.toString(), 308));
        }

        const asset = await env.ASSETS.fetch(request);
        if (asset.status !== 404) {
            return preserveTransportSecurity(asset);
        }

        const response = await handleRemixRequest(request, {
            cloudflare: {env, cf: request.cf, ctx},
        });
        return preserveTransportSecurity(response);
    },
} satisfies ExportedHandler<Env>;
