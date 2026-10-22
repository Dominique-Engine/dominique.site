import {createRequestHandler} from "@remix-run/server-runtime";
import * as build from "./build/server/index.js";

const handleRemixRequest = createRequestHandler(build, "production");

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.hostname === "dengine.site") {
            url.protocol = "https:";
            url.hostname = "www.dengine.site";
            url.port = "";
            return Response.redirect(url.toString(), 308);
        }

        const asset = await env.ASSETS.fetch(request);
        if (asset.status !== 404) {
            return asset;
        }

        return handleRemixRequest(request, {
            cloudflare: {env, cf: request.cf, ctx},
        });
    },
} satisfies ExportedHandler<Env>;
