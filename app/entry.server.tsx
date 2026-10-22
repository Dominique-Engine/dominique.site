import type {EntryContext} from "@remix-run/server-runtime";
import {RemixServer} from "@remix-run/react";
import {isbot} from "isbot";
import {renderToReadableStream} from "react-dom/server.browser";

const ABORT_DELAY = 5_000;

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);

    try {
        const body = await renderToReadableStream(
            <RemixServer
                context={remixContext}
                url={request.url}
                abortDelay={ABORT_DELAY}
            />,
            {
                signal: controller.signal,
                onError(error: unknown) {
                    responseStatusCode = 500;
                    if (!controller.signal.aborted) {
                        console.error(JSON.stringify({
                            message: "SSR stream failed",
                            error: error instanceof Error ? error.message : String(error),
                        }));
                    }
                },
            }
        );

        void body.allReady.then(
            () => clearTimeout(timeoutId),
            () => clearTimeout(timeoutId)
        );

        if (isbot(request.headers.get("user-agent") || "")) {
            await body.allReady;
        }

        responseHeaders.set("Content-Type", "text/html; charset=utf-8");
        return new Response(body, {
            headers: responseHeaders,
            status: responseStatusCode,
        });
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}
