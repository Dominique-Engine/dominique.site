import type {CodegenConfig} from "@graphql-codegen/cli";

import dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.API_URL,
    documents: "./app/graphql/**/*.graphql",
    generates: {
        "./app/generated/graphql.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request",
            ],
            config: {
                rawRequest: true,
            },
        },
    },
};

export default config;
