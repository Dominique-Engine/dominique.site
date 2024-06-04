import {GraphQLClient} from "graphql-request";
import {API_URL} from "~/constants/server";
import {getSdk} from "~/generated/graphql";

const client = new GraphQLClient(API_URL);
export const sdk = getSdk(client);
