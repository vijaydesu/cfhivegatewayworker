/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 * https://the-guild.dev/graphql/hive/docs/gateway/other-features/header-propagation
 * https://the-guild.dev/graphql/hive/docs/api-reference/gateway-config
 *
 */

/*export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;*/

import { createGatewayRuntime, DefaultLogger } from "@graphql-hive/gateway-runtime";
import http from "@graphql-mesh/transport-http";
//import Logger from "./CustomLogger";
// import { useOpenTelemetry } from "@graphql-hive/gateway";
import CloudflareKVCacheStorage from "@graphql-mesh/cache-cfw-kv";
import {LogLevel} from "@graphql-mesh/utils";
import {Logger} from "@graphql-mesh/types";

export default {
  async fetch(request: any, env: any, ctx: any) {
    //console.log("Global KV Namespace : "+globalThis.HiveGateway);
    //const logger = new Logger();
    const gateway = createGatewayRuntime({
      // All options available in `gateway.config.ts` configuration can also be passed here.
      supergraph: {
        // The CDN type.
        type: "hive",
        // The endpoint of CDN
        endpoint:
          "https://cdn.graphql-hive.com/artifacts/v1/e41e9e21-6705-4502-b0e4-1d04dbf6da43/supergraph",
        // The API key provided by Hive Registry
        key: "hv2ZGYyYmQxNGEtOTNlNS00ZjIwLTk3ZWYtZmU3OWVkMDdlNzFjOmM1Zjc5YjBjMjA4NGE4MzY5MDcyMTEzOWE4NjAxYjFiMzRkNjYyN2I=",
		
      },
	  pollingInterval: 3000,
      //supergraph,
      transports: {
        http, // http transport is required for subgraphs using standard GraphQL over HTTP.
      },
      landingPage: true,
      transportEntries: {
        "*": {
          headers: [
            ["client_id", "{context.header.client_id}"],
            ["client_secret", "{context.header.correalation-id}"],
          ],
        },
      },
      propagateHeaders: {
        fromClientToSubgraphs({ request, subgraphName }) {
          return {
            client_id: request.headers.get("client_id"),
            client_secret: request.headers.get("client_secret"),
          };
        },
      },
      healthCheckEndpoint: "/healthcheck",
      readinessCheckEndpoint: "/readiness",

      logging: LogLevel.debug,
      cache: new CloudflareKVCacheStorage({
       
        namespace: env.HiveGateway,
      }),
      
      responseCaching: {
        // global cache
        session: () => null,
      },

     
    });
    ctx.waitUntil(gateway[Symbol.asyncDispose]());
    return await gateway(request, env, ctx);
  },
};