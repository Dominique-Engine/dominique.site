import {searchClient} from "@algolia/client-search";
import * as process from "node:process";
import {sdk} from "~/graphql/client";

const client = searchClient(
    process.env.ALGOLIA_APP_ID || "",
    process.env.ALGOLIA_API_KEY || ""
);

// Fetch and index objects in Algolia
const processRecords = async () => {
    const data = [];
    const blogPosts = await sdk.AlgoliaPosts();
    for (const post of blogPosts.data.pages) {
        data.push({
            slug: post.slug,
            title: post.title,
            content: post.content,
            type: post.type,
        });
    }

    await client.deleteIndex({indexName: "content_index"});

    await client.setSettings({
        indexName: "content_index",
        indexSettings: {
            searchableAttributes: ["title", "content"],
            customRanking: ["asc(title)"],
        },
    });

    await client.saveObjects({
        indexName: "content_index",
        objects: data,
    });
};

processRecords()
    .then(() => console.log("Successfully indexed objects!"))
    .catch(err => console.error(err));
