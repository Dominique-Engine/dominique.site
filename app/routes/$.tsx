import {LoaderFunctionArgs} from "@remix-run/router";
import {useRouteError} from "react-router";
import {ErrorResponseImpl} from "@remix-run/router/utils";
import styles from "~/styles/error.module.css";

export async function loader({request}: LoaderFunctionArgs) {
    throw new Response(`${new URL(request.url).pathname} not found`, {
        status: 404,
    });
}

// TODO: This is not working quite well
export default function CatchAllPage() {
    return <>asdasdasd</>;
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
