// React 18 exposes this runtime entry; its installed type package describes it
// under the standard server entry only.
declare module "react-dom/server.browser" {
    export {renderToReadableStream} from "react-dom/server";
}
