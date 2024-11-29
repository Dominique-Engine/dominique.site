import {searchClient} from "@algolia/client-search";

export const getAlgoliaClient = (window: Window) =>
    searchClient(window.ENV.ALGOLIA_APP_ID, window.ENV.ALGOLIA_SEARCH_API_KEY);
