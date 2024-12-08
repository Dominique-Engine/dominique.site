type MetaParams = {
    title?: string;
    description?: string | null;
    image?: string;
    keywords?: string[];
    // url: string;
    // type: string;
};

export function generateRemixMeta({
    title,
    description,
    keywords,
    image,
}: MetaParams) {
    return [
        {
            title: title,
        },
        {
            property: "description",
            content: description,
        },
        {
            property: "keywords",
            content: keywords?.join(","),
        },
        {
            property: "image",
            content: image,
        },
        {
            property: "og:image",
            content: image,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "twitter:image",
            content: image,
        },
        {
            property: "twitter:title",
            content: title,
        },
        {
            property: "twitter:description",
            content: description,
        },
    ];
}
